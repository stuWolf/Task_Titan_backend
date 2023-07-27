const express = require('express');
const {

  getUsers,
  getAllUsers,
  registerWorker,
  getUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
  getLoggedInUser
} = require('../controllers/users_controller');

const usersRouter = express.Router();

//  get loggged in user, OK                            
// used in: create new job, profile (id)
usersRouter.get("/loggedIn", getLoggedInUser);

//  get users of a certain status
// used in: search function, admin, manage workers
usersRouter.get("/users", getUsers);

//  get all users 
// used in: admin
usersRouter.get("/all", getAllUsers);


//  register a Worker  input: body: JSON.stringify(data)
// used in: Manage Workers
usersRouter.post("/registerWorker", registerWorker);



//  get a user by ID input: ID
// used in: display work form, copy from profile
usersRouter.get("/user/:id", getUser);

//  update a user input: ID, body: JSON.stringify(data)
// used in: Profile window
usersRouter.put("/user/:id", updateUser);

//  delete a user input: ID
// used in: deregister (TODO)
usersRouter.delete("/user/:id", deleteUser);

//  delete all users        
// used in: development     
usersRouter.delete("/all", deleteAllUsers);

module.exports = usersRouter;
