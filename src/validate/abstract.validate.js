import Joi from "joi";

export const abstractCreateSchema = Joi.object({
  title: Joi.string().required(),
  abstract: Joi.string().required(),
  keywords: Joi.array().items(Joi.string()),
  presenter_information: Joi.object({
    presenter_name: Joi.string().required(),
    presenter_email: Joi.string().required(),
  }),
  paket: Joi.string(),
  author: Joi.string(),
  co_authors: Joi.array().items(Joi.string()),
  conference: Joi.string(),
  file: Joi.string().required(),
  user: Joi.string().allow(""),
  topic: Joi.string(),
  subtopics: Joi.array().items(Joi.string()),
});

export const abstractUpdateSchema = Joi.object({
  title: Joi.string().allow(""),
  abstract: Joi.string().allow(""),
  keywords: Joi.array().items(Joi.string()),
  presenter_information: Joi.object({
    presenter_name: Joi.string().allow(""),
    presenter_email: Joi.string().allow(""),
  }),
  user: Joi.string().allow(""),
  paket: Joi.string().allow(""),
  author: Joi.string().allow(""),
  co_authors: Joi.array().items(Joi.string().allow("")),
  conference: Joi.string().allow(""),
  file: Joi.string().allow(""),
  file_presentation: Joi.string().allow(""),
  user: Joi.string().allow(""),
  topic: Joi.string(),
  subtopics: Joi.array().items(Joi.string()),
});

export const abstractIdSchema = Joi.object({
  abstractId: Joi.string().required(),
});

export const abstractDeleteSchema = Joi.object({
  abstractId: Joi.string().required(),
});

export const abstractSearchSchema = Joi.object({
  page: Joi.number().default(1),
  perPage: Joi.number().default(10),
  sort: Joi.string().default("createdAt"),
  order: Joi.string().default("desc"),
  conference: Joi.string().allow(""),
  topic: Joi.string().allow(""),
});

export const MyabstractSearchSchema = Joi.object({
  page: Joi.number().default(1),
  perPage: Joi.number().default(10),
  sort: Joi.string().default("createdAt"),
  order: Joi.string().default("desc"),
  user: Joi.string().required(),
  conference: Joi.string().allow(""),
  topic: Joi.string().allow(""),
});
