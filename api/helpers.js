function joiErrorResponseMaker(res, error) {
  if (error.isJoi) {
    const response = {
      status: 422,
      message: error.details[0].message,
      context: error.details[0].context,
    };

    return res.status(422).json(response);
  }
  return null;
}

function validationErrorResponseMaker(res, error) {
  if (error.name === 'ValidationError') {
    const label = Object.keys(error.errors)[0];

    const response = {
      status: 422,
      message: `${label} ${error.errors[label].message}`,
      context: {
        label,
        value: error.errors[label].value,
        key: error.errors[label].path,
      },
    };

    return res.status(422).json(response);
  }
  return null;
}

function getBearerToken(authorization) {
  const token = authorization.split(' ')[1];

  return token;
}

module.exports = {
  joiErrorResponseMaker,
  validationErrorResponseMaker,
  getBearerToken,
};
