const router = require("express").Router();

// Import userRoutes and thoughtRoutes
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

// Set up routes for "/users"
router.use("/users", userRoutes);

// Set up routes for "/thoughts"
router.use("/thoughts", thoughtRoutes);

// Export the router
module.exports = router;
