class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.statusCode = status;
  }
}

module.exports = CustomError;

// Создал класс ошибок на основе класса Error,
// чтобы централизированно их обрабатывать
