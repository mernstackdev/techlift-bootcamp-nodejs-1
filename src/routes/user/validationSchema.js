const Joi = require("joi");

const createUserSchema = (user) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().min(11).max(11).required(),
  });

  return schema.validate(user);
};

module.exports = createUserSchema;
