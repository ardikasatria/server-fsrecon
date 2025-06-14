import Joi from "joi";
// {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "users",
//     },

//     trip: {
//       type: String,
//       required: true,
//     },

//     isConfirmed: {
//       type: Boolean,
//       default: false,
//     },

//     allergies: {
//       type: [String],
//       default: [],
//     },

//     specialNeeds: {
//       type: [String],
//       default: [],
//     },
//     conference: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "conferences",

//   },

export const tripConfirmationSchema = Joi.object({
  user: Joi.string().required(),
  trip: Joi.string().required(),
  isConfirmed: Joi.boolean().default(true),
  allergies: Joi.array().items(Joi.string()).allow([]),
  specialNeeds: Joi.array().items(Joi.string()).allow([]),
  conference: Joi.string().required(),
});

export const tripConfirmationUpdateSchema = Joi.object({
  user: Joi.string().allow(""),
  trip: Joi.string().allow(""),
  isConfirmed: Joi.boolean(),
  allergies: Joi.array().items(Joi.string()).allow([]),
  specialNeeds: Joi.array().items(Joi.string()).allow([]),
});

export const tripConfirmationQuerySchema = Joi.object({
  user: Joi.string().allow(""),
  trip: Joi.string().allow(""),
  isConfirmed: Joi.boolean(),
  allergies: Joi.array().items(Joi.string()).allow([]),
  specialNeeds: Joi.array().items(Joi.string()).allow([]),
  conference: Joi.string().allow(""),
});
