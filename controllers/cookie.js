function deleteCookie(request, response, next) {
  response.cookie('jwt', '', {
    domain: '',
    maxAge: -1,
  });
  next();
}

module.exports = deleteCookie;
