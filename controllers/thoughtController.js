const { findOneAndUpdate } = require("../models/User");
const { Thought, User, Reaction } = require("../models/index");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => {
        return res.status(200).json(thoughts);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getOneThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate("reactions")
      .then((oneThought) =>
        !oneThought
          ? res.status(404).json({ message: "No thought with this ID." })
          : res.status(200).json(oneThought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "No User with that ID. Thought was still created.",
            })
          : res.status(200).json({ message: "Thought has been created." })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { thoughtText: req.body.thoughtText },
      {
        new: true,
      }
    )
      .then((updatedThought) => {
        !updatedThought
          ? res.status(404).json({ message: "No thought with that ID." })
          : res.status(200).json(updatedThought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((response) => {
        !response
          ? res.status(404).json({ message: "No thought with that ID." })
          : User.findOneAndUpdate(
              { username: req.body.username },
              { $pull: { thoughts: { _id: req.params.thoughtId } } }
            );
      })
      .then(() =>
        res.status(200).json({ message: "Thought deleted from User" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
