// Import the required modules
const express = require("express"); // Express framework
const dbase = require("./config/connection"); // Database connection module
const routes = require("./routes"); // Routes module

// Set the port number for the server
const PORT = process.env.PORT || 3001;

// Create an instance of the Express application
const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies
app.use(routes); // Use the defined routes

// Event handler for successful database connection
dbase.once("open", () => {
  // Start the server and listen on the specified port
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
