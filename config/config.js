module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'сaesars-cipher',
  DB_PORT: process.env.DB_PORT || 'mongodb://localhost:27017/newsdb',
  PORT: process.env.PORT || 3000,
};
