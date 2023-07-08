// Import the necessary modules from Mongoose
const { Schema, model, Types } = require("mongoose");

// Define the user schema
const userSchema = new Schema(
  {
    // username field represents the username of the user
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    // email field represents the email address of the user
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        "Please include a valid email address",
      ],
    },

    // thoughts field is an array of thought IDs associated with the user
    thoughts: [
      {
        type: Types.ObjectId,
        ref: "Thought",
      },
    ],

    // friends field is an array of user IDs representing the user's friends
    friends: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // Configure the toJSON option to include virtual properties
    toJSON: {
      virtuals: true,
    },
  }
);

// Define a virtual property 'friendCount' to retrieve the number of friends for a user
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create the User model using the user schema
const User = model("User", userSchema);

// Export the User model
module.exports = User;
