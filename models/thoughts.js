// Import the necessary modules from Mongoose
const { Schema, model } = require("mongoose");

// Import the reaction schema
const reactionSchema = require("./reaction");

// Define the thought schema
const thoughtSchema = new Schema(
  {
    // thoughtText field represents the content of the thought
    thoughtText: {
      type: String,
      required: true,
      maxLength: 280,
      minLength: 1,
    },

    // createdAt field represents the timestamp when the thought was created
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

    // username field represents the username of the user who created the thought
    username: {
      type: String,
      required: true,
    },

    // reactions field is an array of reaction objects associated with the thought
    reactions: [reactionSchema],
  },
  {
    // Configure the toJSON option to include getters and virtuals
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

// Define a virtual property 'reactionCount' to retrieve the number of reactions for a thought
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Create the Thought model using the thought schema
const Thought = model("Thought", thoughtSchema);

// Export the Thought model
module.exports = Thought;
