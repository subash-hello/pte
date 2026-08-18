import { evaluatePTEWithGemini, generateTutorResponse, EvaluationResult } from "@/lib/gemini";

export type { EvaluationResult };

export const aiScoringService = {
  async evaluatePTEAnswer(
    questionType: string,
    instruction: string,
    promptPassage: string,
    userAnswer: string,
    answerKey?: any
  ): Promise<EvaluationResult> {
    return evaluatePTEWithGemini(questionType, instruction, promptPassage, userAnswer, answerKey);
  },

  async generateTutorAdvice(
    messages: { role: string; content: string }[],
    userMessage: string
  ): Promise<string> {
    return generateTutorResponse(messages, userMessage);
  }
};

export default aiScoringService;
