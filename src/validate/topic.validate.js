import Joi from "joi";

// Define the schema for a subtopic
const subtopicSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow("", null), // Allowing empty string or null for description
});

export const topicCreateSchema = Joi.object({
  name: Joi.string().required(),
  subtopics: Joi.array().items(subtopicSchema).default([]), // Ensure subtopics are validated correctly
  description: Joi.string().required(),
});

export const topicUpdateSchema = Joi.object({
  name: Joi.string(),
  subtopics: Joi.array().items(subtopicSchema).default([]), // Subtopics can be updated or added
  description: Joi.string(),
});

export const topicIdSchema = Joi.object({
  id: Joi.string().required(),
});

export const topicDeleteSchema = Joi.object({
  id: Joi.string().required(),
});

export const topicSearchSchema = Joi.object({
  name: Joi.string().default(""),
  description: Joi.string().default(""),
  page: Joi.number().default(1),
  perPage: Joi.number().default(10),
  sort: Joi.string().default("createdAt"),
  order: Joi.string().default("desc"),
});
