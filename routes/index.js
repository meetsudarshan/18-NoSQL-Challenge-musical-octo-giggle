const router = require("express").Router();

// Import the API routes
const apiRoutes = require("./api");

// Set up the route for "/api"
router.use("/api", apiRoutes);

// Default route handler for any other routes
router.use((req, res) => res.send("Sorry, Wrong route!"));

// Export the router
module.exports = router;
