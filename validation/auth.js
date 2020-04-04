const Joi = require('joi');

function validateLogin(payload) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return Joi.validate(payload, schema);
}

/* eslint-disable no-useless-escape */
function validateRegister(payload) {
  const schema = Joi.object().keys({
    username: Joi.string().min(6).max(24).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(1024).required(),
    img_url: Joi.string().regex(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    ),
  });

  return Joi.validate(payload, schema);
}

module.exports = {
  validateLogin,
  validateRegister,
};
