const express = require('express');
const {
  signup,
  login,
  getUsers,
  getAllUsers,
  registerWorker,
  registerCustomer,
  getUser,
  updateUser,
  deleteUser,
  deleteAllUsers
} = require('../controllers/users_controller');

const usersRouter = express.Router();


//  signup a new user
usersRouter.post("/signup", signup);

//  login a user
usersRouter.post("/login", login);

//  get users of a certain status
usersRouter.get("/users", getUsers);

//  get all users
usersRouter.get("/all", getAllUsers);


//  register a Worker
usersRouter.post("/registerWorker", registerWorker);

//  register a Customer
usersRouter.post("/registerCustomer", registerCustomer);

//  get a user by ID
usersRouter.get("/user/:id", getUser);

//  update a user
usersRouter.put("/user/:id", updateUser);

//  delete a user
usersRouter.delete("/user/:id", deleteUser);

//  delete all users
usersRouter.delete("/all", deleteAllUsers);

module.exports = usersRouter;
