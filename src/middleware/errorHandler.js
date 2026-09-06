import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.log(err);

  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message || err.name });
  }

  const isProduction = process.env.PROD === 'production';
  res.status(500).json({
    message: isProduction
      ? 'Something went wrong. Please try again later.'
      : err.message || err.name,
  });
};
