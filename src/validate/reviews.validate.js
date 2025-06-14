import Joi from "joi";

export const reviewCreateSchema = Joi.object({
  reviewer: Joi.string().required(),
  abstract: Joi.string().required(),
});

export const reviewUpdateSchema = Joi.object({
  review_date: Joi.date(),
  acceptance: Joi.string(),
  total_score: Joi.number(),
  qus_ans: Joi.array().items(
    Joi.object({
      qus: Joi.string(),
      ans: Joi.string(),
    })
  ),
  gradding: Joi.array().items(
    Joi.object({
      max_grade: Joi.string(),
      score: Joi.number(),
      min_grade: Joi.string(),
    })
  ),
  status: Joi.string().valid("pending", "accepted", "rejected"),
  comments: Joi.string(),
  additional_information: Joi.string(),
});

export const reviewQuerySchema = Joi.object({
  reviewer: Joi.string().allow(""), // reviewer id
  page: Joi.number().default(1),
  perPage: Joi.number().default(10),
  status: Joi.string().valid("pending", "accepted", "rejected", "").default(""),
  conference: Joi.string().default(""),
});
