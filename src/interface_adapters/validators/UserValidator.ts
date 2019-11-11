import * as Joi from "joi";

export const createUser = Joi.object().keys({
  email: Joi.string().email().trim().required(),
  name: Joi.string().required(),
  password: Joi.string().trim().required()
});
