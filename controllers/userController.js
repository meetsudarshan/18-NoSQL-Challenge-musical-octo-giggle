const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models/index");

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      const userObj = {
        users,
      };
      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single user by ID
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select("-__v");

      if (!user) {
        return res.status(404).json({ message: "User not found with the provided ID" });
      }

      res.json({
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a user by ID
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found with the provided ID" });
      }

      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a user by ID
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndRemove({ _id: req.params.userId });

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found with the provided ID" });
      }

      res.json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a friend to a user
  async addFriend(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found with the provided ID" });
      }

      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a friend from a user
  async deleteFriend(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found with the provided ID" });
      }

      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
