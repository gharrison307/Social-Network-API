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
          ? res.status(404).json({ message: "No thought with this ID" })
          : res.status(200).json(oneThought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
