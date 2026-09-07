import { User } from '../models/user.js';
import createHttpError from 'http-errors';

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    throw new createHttpError(404, 'User not found');
  }

  res.status(200).json(user);
};

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new createHttpError(409, 'Email already in use');
  }

  const newUser = await User.create({ username, email, password });

  res.status(201).json(newUser);
};
