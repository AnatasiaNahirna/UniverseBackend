import { Schema } from 'mongoose';
import { model } from 'mongoose';

const universeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

export const Universe = model('Universe', universeSchema);
