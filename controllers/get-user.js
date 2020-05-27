const User = require('../models/user');

function getUser(request, response, next) {
  User.findById(request.user._id)
    .then((user) => response.send(user))
    .catch(next);
}

module.exports = getUser;
