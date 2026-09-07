import { joi, Segments } from 'celebrate';

export const registerUserSchema = {
  [Segments.BODY]: joi.object({
    username: joi.string().trim().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }),
};
