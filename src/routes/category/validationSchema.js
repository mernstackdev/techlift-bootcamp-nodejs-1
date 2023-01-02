const Joi = require("joi");

const createCategorySchema = (user) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).required(),
    image: Joi.string().optional()
  });

  return schema.validate(user);
};

module.exports = createCategorySchema;
