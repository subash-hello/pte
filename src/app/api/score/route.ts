import { NextResponse } from "next/server";
import { evaluatePTEWithGemini } from "@/lib/gemini";
import { connectToDatabase } from "@/lib/mongodb";
import PracticeResponseModel from "@/models/PracticeResponse";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const questionId = body.questionId || `q_${Date.now()}`;
    const questionType = body.questionType || body.taskType || "General";
    const section = body.section || "General";
    const instruction = body.instruction || "Evaluate candidate response accurately.";
    const promptPassage = body.promptPassage || body.promptText || "";
    
    let userAnswer = body.userAnswer !== undefined ? body.userAnswer : body.userResponse;
    if (typeof userAnswer === "object") {
      userAnswer = JSON.stringify(userAnswer);
    }
    const userAnswerStr = String(userAnswer || "").trim();
    const answerKey = body.answerKey || body.referenceKeywords;

    // Fast AI evaluation call
    const evaluation = await evaluatePTEWithGemini(
      questionType,
      instruction,
      promptPassage,
      userAnswerStr,
      answerKey
    );

    // Non-blocking background MongoDB logging (Fire & forget promise)
    connectToDatabase()
      .then(async () => {
        await PracticeResponseModel.create({
          questionId,
          questionType,
          section,
          userAnswerText: userAnswerStr,
          overallScore: evaluation.overallScore,
          enablingSkills: evaluation.enablingSkills,
          feedbackDetails: evaluation.feedbackDetails,
          explanation: evaluation.explanation,
          aiEvaluated: evaluation.aiEvaluated,
        });
      })
      .catch((dbErr) => {
        console.warn("Background DB Save Warning:", dbErr);
      });

    // Send HTTP response INSTANTLY to client
    return NextResponse.json({
      success: true,
      evaluation,
      score: {
        overall: evaluation.overallScore,
        content: Math.round((evaluation.overallScore / 90) * 5),
        fluency: Math.round(((evaluation.enablingSkills?.fluency || evaluation.overallScore) / 90) * 5),
        pronunciation: Math.round(((evaluation.enablingSkills?.pronunciation || evaluation.overallScore) / 90) * 5),
        enablingSkills: evaluation.enablingSkills,
        feedback: evaluation.feedbackDetails,
        explanation: evaluation.explanation,
      },
    });
  } catch (error: any) {
    console.error("API Score Route Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
