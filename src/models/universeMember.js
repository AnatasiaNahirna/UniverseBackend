import { Schema, model } from 'mongoose';

const universeMemberSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  universeId: {
    type: Schema.Types.ObjectId,
    ref: 'Universe',
    required: true,
  },
  role: {
    type: String,
    enum: ['reader', 'admin', 'writer'],
    default: 'reader',
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

export const UniverseMember = model('UniverseMember', universeMemberSchema);
