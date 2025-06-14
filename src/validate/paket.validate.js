import Joi from "joi";
// {
//     name: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     earlyprice: {
//       type: Number,
//       required: true,
//     },
//     regularprice: {
//       type: Number,
//       required: true,
//     },
//     duration: {
//       type: Number,
//       required: true,
//     },
//     features: [
//       {
//         type: String,
//         required: true,
//       },
//     ],
//   },

export const paketSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  earlyprice: Joi.number().required(),
  regularprice: Joi.number().required(),
  duration: Joi.number().required(),
  features: Joi.array().items(Joi.string()).required(),
  conference: Joi.string().required(),
});

export const paketUpdateSchema = Joi.object({
  name: Joi.string().allow(""),
  description: Joi.string().allow(""),
  earlyprice: Joi.number().allow(""),
  regularprice: Joi.number().allow(""),
  duration: Joi.number().allow(""),
  features: Joi.array().items(Joi.string()).allow(""),
});

export const paketIdSchema = Joi.object({
  id: Joi.string().required(),
});

export const deletePaketSchema = Joi.object({
  id: Joi.string().required(),
});

export const paketQuerySchema = Joi.object({
  conference: Joi.string().allow(""),
});
