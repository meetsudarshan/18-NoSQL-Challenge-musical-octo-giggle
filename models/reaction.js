// Import the necessary modules from Mongoose
const { Schema, Types } = require("mongoose");

// Define the reaction schema
const reactionSchema = new Schema(
  {
    // reactionId field represents the unique identifier for a reaction
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    // reactionBody field represents the content of the reaction
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },

    // username field represents the username of the user who created the reaction
    username: {
      type: String,
      required: true,
    },

    // createdAt field represents the timestamp when the reaction was created
    createdAt: {
      type: Date,
      default: Date.now,

      // Define a custom getter function to format the date as MM/DD/YYYY
      get: function (value) {
        const date = new Date(value);
        formattedDate =
          date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
        return formattedDate;
      },
    },
  },
  {
    // Configure the toJSON option to include getters
    toJSON: {
      getters: true,
    },
  }
);

// Export the reaction schema
module.exports = reactionSchema;
