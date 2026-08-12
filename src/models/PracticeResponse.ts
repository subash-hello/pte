import mongoose, { Schema, Document } from "mongoose";

export interface IPracticeResponse extends Document {
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
}

const PracticeResponseSchema: Schema = new Schema(
  {
    questionId: { type: String, required: true },
    questionType: { type: String, required: true },
    section: { type: String, required: true },
    userAnswerText: { type: String, default: "" },
    audioTranscript: { type: String, default: "" },
    overallScore: { type: Number, required: true, min: 10, max: 90 },
    enablingSkills: {
      fluency: Number,
      pronunciation: Number,
      grammar: Number,
      vocabulary: Number,
      spelling: Number,
      form: Number,
    },
    feedbackDetails: [{ type: String }],
    explanation: String,
    aiEvaluated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.PracticeResponse ||
  mongoose.model<IPracticeResponse>("PracticeResponse", PracticeResponseSchema);
