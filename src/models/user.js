import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    avatar: {
      type: String,
      default:
        'https://i.pinimg.com/736x/77/87/4a/77874a89b486826b091f95a152c87e4e.jpg',
    },
    bio: {
      type: String,
      trim: true,
      default: '',
    },
    universes: [
      {
        universeName: {
          type: String,
          required: true,
        },
      },
    ],
    role: {
      type: String,
      enum: ['user', 'admin', 'superadmin'],
      default: 'user',
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
