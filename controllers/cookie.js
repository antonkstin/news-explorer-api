function deleteCookie(request, response) {
  response.cookie('jwt', 'deleted', {
    domain: '',
    maxAge: -1,
  });
}

module.exports = deleteCookie;
