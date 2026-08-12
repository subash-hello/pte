import mongoose, { Schema, Document } from "mongoose";

export interface IScorecard extends Document {
  mockTestId: string;
  testTitle: string;
  overallScore: number; // GSE 10-90
  communicativeSkills: {
    speaking: number;
    writing: number;
    reading: number;
    listening: number;
  };
  enablingSkills: {
    fluency: number;
    pronunciation: number;
    grammar: number;
    vocabulary: number;
    spelling: number;
    writtenDiscourse: number;
  };
  createdAt: Date;
}

const ScorecardSchema: Schema = new Schema(
  {
    mockTestId: { type: String, required: true },
    testTitle: { type: String, required: true },
    overallScore: { type: Number, required: true, min: 10, max: 90 },
    communicativeSkills: {
      speaking: { type: Number, required: true },
      writing: { type: Number, required: true },
      reading: { type: Number, required: true },
      listening: { type: Number, required: true },
    },
    enablingSkills: {
      fluency: Number,
      pronunciation: Number,
      grammar: Number,
      vocabulary: Number,
      spelling: Number,
      writtenDiscourse: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Scorecard ||
  mongoose.model<IScorecard>("Scorecard", ScorecardSchema);
