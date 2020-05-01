function joiResponseMaker(error) {
  if (error.isJoi) {
    const response = {
      status: 422,
      message: error.details[0].message,
      context: error.details[0].context,
    };

    return response;
  }
  return null;
}

function validationErrorResponseMaker(error) {
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

    return response;
  }
  return null;
}
module.exports = {
  joiResponseMaker,
  validationErrorResponseMaker,
};
