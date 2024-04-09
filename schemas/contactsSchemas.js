import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
  blacklist: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
  blacklist: Joi.boolean(),
});

export const updateContactStatusSchema = Joi.object({
  favorite: Joi.boolean(),
  blacklist: Joi.boolean(),
});
