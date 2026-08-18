import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBranch extends Document {
  name: string;
  location: string;
  adminName: string;
  adminEmail: string;
  adminPhone: string;
  status: 'active' | 'inactive';
  studentCapacity: number;
  createdAt: Date;
  updatedAt: Date;
}

const branchSchema = new Schema<IBranch>(
  {
    name: {
      type: String,
      required: [true, 'Branch name is required'],
      trim: true,
      unique: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    adminName: {
      type: String,
      required: [true, 'Admin name is required'],
      trim: true,
    },
    adminEmail: {
      type: String,
      required: [true, 'Admin email is required'],
      trim: true,
      lowercase: true,
    },
    adminPhone: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    studentCapacity: {
      type: Number,
      default: 100,
    },
  },
  {
    timestamps: true,
  }
);

const Branch: Model<IBranch> = mongoose.models.Branch || mongoose.model<IBranch>('Branch', branchSchema);

export default Branch;
