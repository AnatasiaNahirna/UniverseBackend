import { Schema, model } from 'mongoose';

const documentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
    },
    universe: {
      type: Schema.Types.ObjectId,
      ref: 'Universe',
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'UniverseMember',
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'pending', 'published'],
      default: 'draft',
      required: true,
    },
    type: {
      type: String,
      enum: ['character', 'location', 'event', 'description', 'ownType'],
      required: true,
    },
  },
  { timestamps: true },
);

export const Document = model('Document', documentSchema);
