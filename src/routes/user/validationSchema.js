const Joi = require("joi");

const createUserSchema = (user) => {
  const schema = Joi.object().keys({
    username: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    isStudent: Joi.boolean().optional(),
  });

  return schema.validate(user);
};

module.exports = createUserSchema;
