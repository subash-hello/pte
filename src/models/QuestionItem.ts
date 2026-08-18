import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IQuestionItem extends Document {
  code: string;
  section: 'speaking' | 'writing' | 'reading' | 'listening';
  type: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  promptText: string;
  audioUrl?: string;
  referenceAnswer?: string;
  keywords?: string[];
  testedCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const questionItemSchema = new Schema<IQuestionItem>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    section: {
      type: String,
      enum: ['speaking', 'writing', 'reading', 'listening'],
      required: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    promptText: {
      type: String,
      required: true,
    },
    audioUrl: {
      type: String,
      default: '',
    },
    referenceAnswer: {
      type: String,
      default: '',
    },
    keywords: [{ type: String }],
    testedCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const QuestionItem: Model<IQuestionItem> = mongoose.models.QuestionItem || mongoose.model<IQuestionItem>('QuestionItem', questionItemSchema);

export default QuestionItem;
