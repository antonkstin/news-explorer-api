// eslint-disable-next-line no-unused-vars
function centralizedError(error, request, response, next) {
  const { statusCode = 500, message = 'Ошибка на стороне сервера' } = error;
  const doubleEmailMessage = { message: 'Данный email уже зарегистрирован' };
  const validationErrorMessage = { message: 'Ошибка валидации' };

  if (error.code === 11000) {
    return response.status(409).send(doubleEmailMessage);
  }
  if (error.name === 'ValidationError' || error.joi) {
    return response.status(400).send(validationErrorMessage);
  }
  return response.status(statusCode).send({ message });
}

module.exports = centralizedError;
