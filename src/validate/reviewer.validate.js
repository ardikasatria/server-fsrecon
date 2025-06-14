import Joi from "joi";

export const createReviewerSchema = Joi.object().keys({
  majorField: Joi.string().required(),
  minorFields: Joi.array().items(Joi.string()).required(),
  conference: Joi.string().required(),
  status: Joi.string().valid('pending', 'verified', 'rejected').default('pending'), // Include status
});

export const updateReviewerSchema = Joi.object().keys({
  majorField: Joi.string().required(),
  minorFields: Joi.array().items(Joi.string()).required(),
  verified: Joi.boolean().required(),
  conference: Joi.string().required(),
  status: Joi.string().valid('pending', 'verified', 'rejected').default('pending'), // Include status
});

export const BecomeReviewerSchema = Joi.object().keys({
  majorField: Joi.string().required(),
  minorFields: Joi.array().items(Joi.string()).required(),
});
