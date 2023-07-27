const express = require('express');
const {

  getUsers,
  getAllUsers,
  registerWorker,
  registerCustomer,
  getUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
  getLoggedInUser
} = require('../controllers/users_controller');

const usersRouter = express.Router();

//  get loggged in user OK
usersRouter.get("/loggedIn", getLoggedInUser);

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
