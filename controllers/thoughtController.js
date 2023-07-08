const { Thought, User } = require("../models/index");

module.exports = {
  async getThoughts(req, res) {
    try {
      const gThought = await Thought.find();
      res.json(gThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const gsThought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!gsThought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(gsThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const cThought = await Thought.create(req.body);
      res.json(cThought);

      const uThought = await User.findOneAndUpdate(
        { username: cThought.username },
        { $push: { thoughts: cThought._id } },
        { runValidators: true, new: true }
      );
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const upThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!upThought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(upThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const delThought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!delThought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json({ message: "Thought successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {
      const crThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!crThought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(crThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const delReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!delReaction) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(delReaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};