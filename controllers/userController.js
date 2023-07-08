const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models/index");

module.exports = {
  async getUsers(req, res) {
    try {
      const gUser = await User.find();
      const userObj = {
        gUser,
      };
      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const gsUser = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!gsUser) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json({
        gsUser,
      });
    } catch (err) {
      console.log(err);
      return res.json(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const cUser = await User.create(req.body);
      res.json(cUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const upUser = await User.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!upUser) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(upUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const delUser = await User.findOneAndRemove({ _id: req.params.userId });

      if (!delUser) {
        return res.status(404).json({ message: "No user found with that ID" });
      }

      res.json({ message: "User successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const aFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!aFriend) {
        return res.status(404).json({ message: "No user found with that ID" });
      }

      res.json(aFriend);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteFriend(req, res) {
    try {
      const delFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!delFriend) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(delFriend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};