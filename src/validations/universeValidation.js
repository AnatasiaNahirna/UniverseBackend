import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const universeIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createUniverseSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(1).max(200).required().messages({
      'string.min': 'Name must be at least 1 character long',
      'string.max': 'Name must be at most 200 characters long',
      'any.required': 'Name is required',
    }),
    description: Joi.string().max(1000).allow('').messages({
      'string.max': 'Description must be at most 1000 characters long',
    }),
  }),
};

export const updateUniverseSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(1).max(200),
    description: Joi.string().max(1000).allow(''),
  }).min(1),
};
