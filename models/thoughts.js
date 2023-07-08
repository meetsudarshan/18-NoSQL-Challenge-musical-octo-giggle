const { Schema, model } = require("mongoose");

const reactionSchema = require("./reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxLength: 280,
      minLength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (value) {
        const date = new Date(value);
        formattedDate =
          date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
        return formattedDate;
      },
    },
    username: {
      type: String,
      required: true,
    },
    
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);



const Thought = model("Thought", thoughtSchema);

module.exports = Thought;