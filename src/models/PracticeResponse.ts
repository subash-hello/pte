import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPracticeResponse extends Document {
  userId?: string;
  userEmail?: string;
  branch?: string;
  questionId: string;
  questionType: string;
  section: string;
  userAnswerText: string;
  audioTranscript?: string;
  overallScore: number; // GSE 10-90
  enablingSkills: {
    fluency?: number;
    pronunciation?: number;
    grammar?: number;
    vocabulary?: number;
    spelling?: number;
    form?: number;
  };
  feedbackDetails: string[];
  explanation?: string;
  aiEvaluated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PracticeResponseSchema = new Schema<IPracticeResponse>(
  {
    userId: { type: String, default: "" },
    userEmail: { type: String, default: "" },
    branch: { type: String, default: "" },
    questionId: { type: String, required: true },
    questionType: { type: String, required: true },
    section: { type: String, required: true },
    userAnswerText: { type: String, default: "" },
    audioTranscript: { type: String, default: "" },
    overallScore: { type: Number, required: true, min: 10, max: 90 },
    enablingSkills: {
      fluency: { type: Number, default: 0 },
      pronunciation: { type: Number, default: 0 },
      grammar: { type: Number, default: 0 },
      vocabulary: { type: Number, default: 0 },
      spelling: { type: Number, default: 0 },
      form: { type: Number, default: 0 },
    },
    feedbackDetails: [{ type: String }],
    explanation: { type: String, default: "" },
    aiEvaluated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const PracticeResponse: Model<IPracticeResponse> =
  mongoose.models.PracticeResponse || mongoose.model<IPracticeResponse>("PracticeResponse", PracticeResponseSchema);

export default PracticeResponse;
