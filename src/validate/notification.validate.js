import Joi from "joi";

export const createNotificationSchema = Joi.object({
  title: Joi.string().required(),
  message: Joi.string().required(),
  types: Joi.string().required(),
  recipient: Joi.string().required(),
});

export const updateNotificationSchema = Joi.object({
  title: Joi.string(),
  message: Joi.string(),
  types: Joi.string(),
  recipient: Joi.string(),
});

export const getNotificationSchema = Joi.object({
  notificationId: Joi.string().required(),
});

export const deleteNotificationSchema = Joi.object({
  notificationId: Joi.string().required(),
});

export const getNotificationsByTypeSchema = Joi.object({
  types: Joi.string().required(),
});

export const markAsReadSchema = Joi.object({
  notificationId: Joi.string().required(),
});

export const markAllAsReadSchema = Joi.object({
  recipientId: Joi.string().required(),
});

export const markAllAsUnreadSchema = Joi.object({
  recipientId: Joi.string().required(),
});

// send notification schema
export const sendNotificationToUserSchema = Joi.object({
  notification: Joi.object({
    title: Joi.string().required(),
    message: Joi.string().required(),
    types: Joi.string().required(),
  }),
  user: Joi.string().required(),
  config: Joi.object({
    topic: Joi.string().default(null),
    urgency: Joi.string().default("normal"),
  }),
});

// send notification schema
export const sendNotificationToTopicSchema = Joi.object({
  notification: Joi.object({
    title: Joi.string().required(),
    message: Joi.string().required(),
    types: Joi.string().required(),
  }),
  topic: Joi.string().required(),
  config: Joi.object({
    urgency: Joi.string().default("normal"),
  }),
});

export const BoardcastNotificationSchema = Joi.object({
  notification: Joi.object({
    title: Joi.string().required(),
    message: Joi.string().required(),
    types: Joi.string().required(),
  }),
  config: Joi.object({
    topic: Joi.string().default(null),
    urgency: Joi.string().default("normal"),
  }),
});

export const getNotificationsSchema = Joi.object({
  page: Joi.number().min(1),
  perPage: Joi.number().min(10),
  recipient: Joi.string(),
});


