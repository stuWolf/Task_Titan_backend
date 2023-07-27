const express = require('express');
const {
  signup,
  login,
  
} = require('../controllers/login_controller');

const loginRouter = express.Router();


//  signup a new user, general
loginRouter.post("/signup", signup);

//  login a user
loginRouter.post("/", login);

//  register a Customer input: body: JSON.stringify(data)
// used in: Register customer. userState = customer
loginRouter.post("/registerCustomer", registerCustomer);

module.exports = loginRouter;
