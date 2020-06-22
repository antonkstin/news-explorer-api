function deleteCookie(request, response, next) {
  new Promise((resolve, reject) => {
    response.cookie('jwt', '', {
      domain: '',
      maxAge: -1,
    });
    reject(next);
  })
    .then(() => { response.send({ message: 'Куки удалены' }); })
    .catch(next);
}

module.exports = deleteCookie;
