const express = require('express');
const {
  signup,
  login,
  
} = require('../controllers/login_controller');

const loginRouter = express.Router();


//  signup a new user
loginRouter.post("/signup", signup);

//  login a user
loginRouter.post("/", login);



module.exports = loginRouter;
