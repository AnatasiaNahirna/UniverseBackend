import { HttpError } from 'http-errors';
import { CastError } from 'mongoose';

export const errorHandler = (err, req, res, next) => {
  console.log(err);

  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message || err.name });
  }

  if (err instanceof CastError && err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  const isProduction = process.env.PROD === 'production';
  res.status(500).json({
    message: isProduction
      ? 'Something went wrong. Please try again later.'
      : err.message || err.name,
  });
};
