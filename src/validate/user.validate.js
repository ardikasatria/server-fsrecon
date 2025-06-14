import Joi from "joi";

export const userRegisterSchema = Joi.object({
  fullname: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  password2: Joi.ref("password"),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const userForgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const userResetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  password2: Joi.ref("password"),
  token: Joi.string().required(),
});
export const userUpdateSchema = Joi.object({
  username: Joi.string().allow(""),

  newPassword: Joi.string().allow(""),
  confirmPassword: Joi.string().allow(""),
  currentPassword: Joi.string().allow(""),

  bio: Joi.string().allow(""),
  profile_img: Joi.string().allow(""),
  social_links: Joi.object({
    youtube: Joi.string().allow(""),
    instagram: Joi.string().allow(""),
    facebook: Joi.string().allow(""),
    linkedin: Joi.string().allow(""),
    twitter: Joi.string().allow(""),
    github: Joi.string().allow(""),
    website: Joi.string().allow(""),
  }),
  personal_info: Joi.object({
    googleShId: Joi.string().allow(""),
    orcidId: Joi.string().allow(""),
    country: Joi.string().allow(""),
    state: Joi.string().allow(""),
    city: Joi.string().allow(""),
    organization: Joi.string().allow(""),
    position: Joi.string().allow(""),
    degree: Joi.string().allow(""),
    phone: Joi.string().allow(""),
    bio: Joi.string().allow(""),
  }),
});

export const userUpdateAdminSchema = Joi.object({
  // for admin
  fullname: Joi.string().allow(""),
  email: Joi.string().allow(""),
  password: Joi.string().allow(""),
  role: Joi.string().allow(""),
  majorField: Joi.string().allow(""),
  minorFields: Joi.array().items(Joi.string().allow("")),
  isVerified: Joi.boolean().allow(""),
});

export const userUpdatePasswordSchema = Joi.object({
  password: Joi.string().required(),
  password2: Joi.ref("password"),
});

// search user schema for admin
export const searchUserSchema = Joi.object({
  q: Joi.string().allow(""),
  page: Joi.number().min(1),
  perPage: Joi.number().min(1),
});

// create user schema for admin
export const UserCreateByAdminSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  // role is enum
  role: Joi.string().valid("editor", "reviewer", "member").required(),

  // if role is editor or reviewer then majorField
  majorField: Joi.string().allow(""),
  minorFields: Joi.array().items(Joi.string().allow("")),
});
