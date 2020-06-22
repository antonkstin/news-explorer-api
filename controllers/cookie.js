function deleteCookie(request, response, next) {
  response.cookie('jwt', '', {
    domain: '',
    maxAge: -1,
  })
    .catch(next);
}

module.exports = deleteCookie;
