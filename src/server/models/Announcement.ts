import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAnnouncement extends Document {
  title: string;
  body: string;
  target: string;
  senderName: string;
  senderRole: string;
  isImportant: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const announcementSchema = new Schema<IAnnouncement>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      default: 'all',
    },
    senderName: {
      type: String,
      default: 'Super Admin',
    },
    senderRole: {
      type: String,
      default: 'super_admin',
    },
    isImportant: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Announcement: Model<IAnnouncement> = mongoose.models.Announcement || mongoose.model<IAnnouncement>('Announcement', announcementSchema);

export default Announcement;
