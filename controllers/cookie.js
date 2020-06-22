function deleteCookie(request, response, next) {
  response.cookie('jwt', 'deleted', {
    domain: '',
    maxAge: '1980-08-01T06:59:58.744Z',
  });
  next();
}

module.exports = deleteCookie;
