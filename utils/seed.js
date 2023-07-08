// Import the connection module
const connection = require("../config/connection");

// Import the Thought and User models
const { Thought } = require("../models");
const { User } = require("../models");

// Import the getRandomName and getRandomThought functions from the data module
const { getRandomName, getRandomThought } = require("./data");

// Event handler for connection error
connection.on("error", (err) => err);

// Event handler for successful connection
connection.once("open", async () => {
  console.log("connected");

  // Delete all existing thoughts
  await Thought.deleteMany({});

  // Delete all existing users
  await User.deleteMany({});

  const users = [];

  // Generate 20 users with random names and thoughts
  for (let i = 0; i < 20; i++) {
    // Generate a random username
    const username = getRandomName();

    // Generate a random email based on the username
    const createEmail = username.replace(" ", "");
    const email = createEmail.toLowerCase() + "@email.com";

    // Create a new thought for the user
    const userThought = await Thought.create({
      thoughtText: getRandomThought(),
      username,
    });

    // Create a user object with username, email, and thoughts
    users.push({
      username,
      email,
      thoughts: [userThought._id],
    });
  }

  // Insert the generated users into the User collection
  await User.collection.insertMany(users);

  console.table(users);
  console.info("Seeding complete");
  process.exit(0);
});
