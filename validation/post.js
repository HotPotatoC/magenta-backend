const Joi = require('@hapi/joi');

function validatePost(payload) {
  const schema = Joi.object().keys({
    body: Joi.string().max(500).required(),
  });

  return schema.validate(payload);
}

module.exports = {
  validatePost,
};
