import { NextResponse } from "next/server";
import { generateTutorResponse } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { messages, userMessage } = await req.json();

    if (!userMessage || typeof userMessage !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid user message" },
        { status: 400 }
      );
    }

    const reply = await generateTutorResponse(messages || [], userMessage);

    return NextResponse.json({
      success: true,
      reply,
      aiEvaluated: true,
    });
  } catch (error: any) {
    console.error("API Tutor Route Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process tutor query" },
      { status: 500 }
    );
  }
}
