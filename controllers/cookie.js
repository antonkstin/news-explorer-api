function deleteCookie(request, response, next) {
  response.cookie('jwt', 'deleted', {
    domain: '',
    maxAge: -1,
  });
  response.send({ message: 'Куки удалены' })
    .catch(next);
}

module.exports = deleteCookie;
