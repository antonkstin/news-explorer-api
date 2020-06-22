function deleteCookie(request, response) {
  response.cookie('jwt', '', {
    domain: '',
    maxAge: -1,
  });
}

module.exports = deleteCookie;
