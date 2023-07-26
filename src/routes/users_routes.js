const express = require('express');
const {
  signup,
  login,
  getUsers,
  getAllUsers,
  registerUser,
  getUser,
  updateUser,
  deleteUser,
  deleteAllUsers
} = require('../controllers/users_controller');

const usersRouter = express.Router();

// Route to signup a new user
usersRouter.post("/signup", signup);

// Route to login a user
usersRouter.post("/login", login);

// Route to get users of a certain status
usersRouter.get("/users", getUsers);

// Route to get all users
usersRouter.get("/all", getAllUsers);


// Route to register a user
usersRouter.post("/registerUser", registerUser);

// Route to get a user by ID
usersRouter.get("/user/:id", getUser);

// Route to update a user
usersRouter.put("/user/:id", updateUser);

// Route to delete a user
usersRouter.delete("/user/:id", deleteUser);

// Route to delete all users
usersRouter.delete("/all", deleteAllUsers);

module.exports = usersRouter;
