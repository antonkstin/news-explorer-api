function centralizedError(error, request, response, next) {
  const { statusCode = 500, message = "Ошибка на стороне сервера" } = error;
  if (error.code === 11000) {
    return response.status(409).send({ "message": "Данный email уже зарегистрирован" });
  }
  if (error.name === 'ValidationError' || error.joi) {
    return response.status(400).send({ "message": "Ошибка валидации" });
  }
  response.status(statusCode).send({ "message": message });
}

module.exports = centralizedError;
