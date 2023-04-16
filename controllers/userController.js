const { User, Thought } = require("../models/index");

module.exports = {
  // get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((error) => res.status(500).json(error));
  },
  // get one user
  // add user
  // update user
  // delete user
  // add friend to user
  // delete friend
};
