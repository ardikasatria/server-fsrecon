import Joi from "joi";

export const createSubscriptionSchema = Joi.object({
  endpoint: Joi.string().required(),
  keys: Joi.object({
    p256dh: Joi.string().required(),
    auth: Joi.string().required(),
  }).required(),
  user: Joi.string().required(),
  expirationTime: Joi.string().allow(null),
});

export const updateSubscriptionSchema = Joi.object({
  endpoint: Joi.string(),
  keys: Joi.object({
    p256dh: Joi.string(),
    auth: Joi.string(),
  }),
  user: Joi.string(),
});

export const getSubscriptionSchema = Joi.object({
  subscriptionId: Joi.string().required(),
});
export const unsubscribeSchema = Joi.object({
  endpoint: Joi.string(),
  keys: Joi.object({
    p256dh: Joi.string(),
    auth: Joi.string(),
  }),
  expirationTime: Joi.string().allow(null), //string or null
});

export const getSubscriptionByUserSchema = Joi.object({
  userId: Joi.string().required(),
});

export const getSubscriptionByEndpointSchema = Joi.object({
  endpoint: Joi.string().required(),
});

export const getSubscriptionsSchema = Joi.object({
  page: Joi.number().min(1),
  perPage: Joi.number().min(1),
});

export const getSubscriptionsByUserSchema = Joi.object({
  userId: Joi.string().required(),
  page: Joi.number().min(1),
  perPage: Joi.number().min(1),
});
