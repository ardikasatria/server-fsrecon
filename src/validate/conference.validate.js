import Joi from "joi";

export const conferenceCreateSchema = Joi.object({
  title: Joi.string().required(),
  host: Joi.string().required(),
  cohosts: Joi.array().items(Joi.string()).default([]),
  status: Joi.string().default("active"),
  short_name: Joi.string().required(),
  website: Joi.string().default(""),
  venue: Joi.string().default(""),
  address: Joi.string().default(""),
  place: Joi.string().default(""),
  country: Joi.string().default(""),
  state: Joi.string().default(""),
  city: Joi.string().default(""),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  date_paper: Joi.date().required(),
  theme: Joi.string().default(""),
  description: Joi.string().default(""),
  logo: Joi.string().default(""),
  galery: Joi.array().items(Joi.string()).default([]),
  topic: Joi.array().items(Joi.string()).default([]),
});

export const conferenceUpdateSchema = Joi.object({
  title: Joi.string().allow(""),
  host: Joi.string().allow(""),
  cohosts: Joi.array().items(Joi.string().allow("")),
  status: Joi.string().allow(""),
  short_name: Joi.string().allow(""),
  website: Joi.string().allow(""),
  venue: Joi.string().allow(""),
  address: Joi.string().allow(""),
  place: Joi.string().allow(""),
  country: Joi.string().allow(""),
  state: Joi.string().allow(""),
  city: Joi.string().allow(""),
  start_date: Joi.date().allow(""),
  end_date: Joi.date().allow(""),
  date_paper: Joi.date().allow(""),
  theme: Joi.string().allow(""),
  description: Joi.string().allow(""),
  logo: Joi.string().allow(""),
  tags: Joi.array().items(Joi.string().allow("")),
  galery: Joi.array().items(Joi.string().allow("")),
  topic: Joi.array().items(Joi.string())
});

export const conferenceSearchSchema = Joi.object({
  q: Joi.string().allow(""),
  perPage: Joi.number().default(10),
  page: Joi.number().default(1),
});

export const conferenceIdSchema = Joi.object({
  id: Joi.string().required(),
});

export const conferenceDeleteSchema = Joi.object({
  id: Joi.string().required(),
});

export const conferenceAttendeeSchema = Joi.object({
  id: Joi.string().required(),
  attendee: Joi.string().required(),
});

export const conferenceAttendeeDeleteSchema = Joi.object({
  id: Joi.string().required(),
  attendee: Joi.string().required(),
});

export const conferenceAttendeeSearchSchema = Joi.object({
  id: Joi.string().required(),
  attendee: Joi.string(),
  limit: Joi.number().default(10),
  page: Joi.number().default(1),
});

export const conferenceAttendeeIdSchema = Joi.object({
  id: Joi.string().required(),
  attendee: Joi.string().required(),
});

export const conferencePaperSchema = Joi.object({
  id: Joi.string().required(),
  paper: Joi.string().required(),
});

export const conferencePaperDeleteSchema = Joi.object({
  id: Joi.string().required(),
  paper: Joi.string().required(),
});

export const conferencePaperSearchSchema = Joi.object({
  id: Joi.string().required(),
  paper: Joi.string(),
  limit: Joi.number().default(10),
  page: Joi.number().default(1),
});

export const conferencePaperIdSchema = Joi.object({
  id: Joi.string().required(),
  paper: Joi.string().required(),
});

export const conferenceTripConfirmationSchema = Joi.object({
  id: Joi.string().required(),
  tripConfirmation: Joi.string().required(),
});

export const conferenceTripConfirmationDeleteSchema = Joi.object({
  id: Joi.string().required(),
  tripConfirmation: Joi.string().required(),
});

export const conferenceTripConfirmationSearchSchema = Joi.object({
  id: Joi.string().required(),
  tripConfirmation: Joi.string(),
  limit: Joi.number().default(10),
  page: Joi.number().default(1),
});
