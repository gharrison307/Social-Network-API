const { User, Thought } = require("../models/index");

module.exports = {
  // get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((error) => res.status(500).json(error));
  },
  // get one user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("thoughts", "friends")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID." })
          : res.json(user)
      )
      .catch((error) => res.status(500).json(error));
  },
  // add user
  addUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((error) => res.status(500).json(error));
  },
  // update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID." })
          : res.json({ message: "User has been updated." })
      )
      .catch((error) => res.status(500).json(error));
  },
  // delete user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID." })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({ message: "User and user thoughts have been deleted." })
      )

      .catch((error) => res.status(500).json(error));
  },
  // add friend to user
  // delete friend
};
