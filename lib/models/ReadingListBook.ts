import mongoose, { Schema, Document } from 'mongoose';

export interface IReadingListBook extends Document {
  olId: string;
  title: string;
  author: string;
  year: number;
  coverImage: string | null;
  addedAt: Date;
}

const ReadingListBookSchema = new Schema<IReadingListBook>({
  olId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  coverImage: {
    type: String,
    default: null,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

export const ReadingListBook =
  mongoose.models.ReadingListBook ||
  mongoose.model('ReadingListBook', ReadingListBookSchema);
