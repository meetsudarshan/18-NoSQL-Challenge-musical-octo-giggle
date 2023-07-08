const { Thought, User } = require("../models/index");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single thought by ID
  async getOneThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought found with the provided ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);

      // Update the user's thoughts array with the newly created thought's ID
      const user = await User.findOneAndUpdate(
        { username: thought.username },
        { $push: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a thought by ID
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: "No thought found with the provided ID" });
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a thought by ID
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!deletedThought) {
        return res.status(404).json({ message: "No thought found with the provided ID" });
      }

      res.json({ message: "Thought deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a reaction for a thought
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought found with the provided ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a reaction from a thought
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought found with the provided ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
