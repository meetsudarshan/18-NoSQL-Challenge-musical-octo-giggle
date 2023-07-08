const router = require("express").Router();

// Import the necessary userController functions
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// Set up routes for "/users"
router.route("/")
  .get(getUsers) // GET route to get all users
  .post(createUser); // POST route to create a new user

// Set up routes for "/users/:userId"
router.route("/:userId")
  .get(getSingleUser) // GET route to get a single user by ID
  .delete(deleteUser) // DELETE route to delete a user by ID
  .put(updateUser); // PUT route to update a user by ID

// Set up routes for "/users/:userId/friends/:friendId"
router.route("/:userId/friends/:friendId")
  .post(addFriend) // POST route to add a friend to a user
  .delete(deleteFriend); // DELETE route to remove a friend from a user

// Export the router
module.exports = router;
