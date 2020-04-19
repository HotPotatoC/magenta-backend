const Joi = require('@hapi/joi');

function validateLogin(payload) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(payload);
}

function validateRegister(payload) {
  const schema = Joi.object().keys({
    username: Joi.string().min(6).max(24).trim().strict().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(1024).required(),
    img_url: Joi.string().uri(),
    bio: Joi.string().max(300),
  });

  return schema.validate(payload);
}

module.exports = {
  validateLogin,
  validateRegister,
};
