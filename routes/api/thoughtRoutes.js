const router = require("express").Router();

// Import the necessary thoughtController functions
const {
  getOneThought,
  getThoughts,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// Set up routes for "/thoughts"
router.route("/")
  .get(getThoughts) // GET route to get all thoughts
  .post(createThought); // POST route to create a new thought

// Set up routes for "/thoughts/:thoughtId"
router.route("/:thoughtId")
  .get(getOneThought) // GET route to get a single thought by ID
  .delete(deleteThought) // DELETE route to delete a thought by ID
  .put(updateThought); // PUT route to update a thought by ID

// Set up routes for "/thoughts/:thoughtId/reactions"
router.route("/:thoughtId/reactions")
  .post(createReaction); // POST route to create a reaction for a thought

// Set up routes for "/thoughts/:thoughtId/reactions/:reactionId"
router.route("/:thoughtId/reactions/:reactionId")
  .delete(deleteReaction); // DELETE route to delete a reaction from a thought

// Export the router
module.exports = router;
