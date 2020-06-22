function deleteCookie(request, response, next) {
  response.cookie('jwt', 'deleted', {
    domain: '',
    maxAge: -1,
  });
  next();
}

module.exports = deleteCookie;
