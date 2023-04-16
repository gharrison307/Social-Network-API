const { findOneAndUpdate } = require("../models/User");
const { Thought, User, Reaction } = require("../models/index");

module.exports = {
  // get all thoughts
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
  //   get one thought
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
  //   create thought
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
  //   update thoughts
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
  //   delete a thought
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
  //   add a reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID." })
          : res.json({ message: "A reaction has been added." })
      )
      .catch((error) => res.status(500).json(error));
  },
  // delete a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID." })
          : res.json({ message: "The reaction has been deleted." })
      )
      .catch((error) => res.status(500).json(error));
  },
};
