import { User } from '../models/user.js';

import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

import { createSession, setSessionCookies } from '../services/auth.js';
import { Session } from '../models/session.js';

// User Management
export const getAllUsers = async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
    throw new createHttpError(403, 'Access denied');
  }

  const users = await User.find();
  res.status(200).json(users);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json(user);
};

export const currentUser = async (req, res) => {
  res.status(200).json(req.user);
};

export const updateUsersRole = async (req, res) => {
  if (req.user.role !== 'superadmin') {
    throw new createHttpError(403, 'Access denied');
  }

  const { id } = req.params;
  const { role } = req.body;

  const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });

  if (!updatedUser) {
    throw new createHttpError(404, 'User not found');
  }

  res.status(200).json(updatedUser);
};

export const deleteUser = async (req, res) => {
  if (
    req.user._id.toString() !== req.params.id &&
    req.user.role !== 'admin' &&
    req.user.role !== 'superadmin'
  ) {
    throw new createHttpError(403, 'Access denied');
  }

  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    throw new createHttpError(404, 'User not found');
  }

  res.status(200).json(deletedUser);
};

// User Authentication
export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(createHttpError(409, 'Email already in use'));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const newSession = await createSession(newUser._id);
  setSessionCookies(res, newSession);

  res.status(201).json(newUser);
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(createHttpError(401, 'Invalid email or password'));
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return next(createHttpError(401, 'Invalid email or password'));
  }

  await Session.deleteOne({ userId: user._id });

  const newSession = await createSession(user._id);
  setSessionCookies(res, newSession);

  res.status(200).json(user);
};

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).json({ message: 'Logged out successfully' });
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { username } = req.body;

  if (req.user._id.toString() !== id && req.user.role !== 'superadmin') {
    return next(createHttpError(403, 'Access denied'));
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { username },
    { new: true },
  );

  if (!updatedUser) {
    return next(createHttpError(404, 'User not found'));
  }

  res.status(200).json(updatedUser);
};

// Session
export const refreshUserSession = async (req, res, next) => {
  const session = await Session.findOne({
    _id: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    return next(createHttpError(401, 'Session token expired'));
  }

  await Session.deleteOne({
    _id: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  const newSession = await createSession(session.userId);
  setSessionCookies(res, newSession);

  res.status(200).json({ message: 'Session refreshed successfully' });
};
