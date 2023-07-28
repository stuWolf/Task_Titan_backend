const User = require('../models/user')
const {signup} = require('./login_controller')
const { printError } = require('../services/print_error');
// const {createToken } = require('../services/auth_service')
const bcrypt = require("bcrypt");
const { getConsoleOutput } = require('@jest/console');
 
// Function to get the currently logged-in user
const getLoggedInUser = async (request, res) => {
  try {
    // let user = await User.findById(request.user.user_id)
    let user = await User.findById(request.user.user_id);
    // console.log()
    console.log( 'userid from logged in user ' + request.user.user_id);
    if (!user) {
      
      return res.status(404).json({ message: 'User not found' });
      
    }
    res.json(user);
  } catch (error) {
    printError(error, res);
  }
};



//  get users of a certain status
const getUsers = async (req, res) => {

  try {
    const users = await User.find({ userStatus: req.body.userStatus });
    
    if (users.length === 0) {
      res.status(404).jason({ message: "No users found" });
    } else {
      res.json(users);
    }
 
  } catch (error) {
    console.log(userStatus);
    printError(error, res);
  }
  
};


//  get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      res.status(404).json({ message: "No users found" });
    } else {
      res.json(users);
    }
  } catch (error) {
    printError(error, res);
  }
};


//  register a worker
const registerWorker = async (req, res) => {
  try {
    req.body.userStatus = 'worker';
    signup(req, res); // Reuse existing signup function
  } catch (error) {
    printError(error, res);
  }
};



//  get a user by ID
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    printError(error, res);
  }
};

//  update a user
const updateUser = async (req, res) => {
  try {
    // find user by id
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // if email was updated and is not the email of current user
    if (req.body.email && req.body.email !== user.email) {
      // check if new email already exists
      const emailExists = await User.findOne({ email: req.body.email });

      if (emailExists) {

        console.log('error thrown E11000: Email already exists"')
        throw new Error("E11000: Email already exists");

        
      }

      // update email
      user.email = req.body.email;
    } //endif

    // if password was updated
    // if (req.body.password) {
      // hash new password
      user.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync(10)
      );
    // }

    // update other values
 user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
     user.address = req.body.address;
   user.contactNumber = req.body.contactNumber;
     user.dob = req.body.dob;
     user.license = req.body.license;
     user.licenseNo = req.body.licenseNo;
     user.employedSince = req.body.employedSince;


    console.log('user firstname  ' + user.firstName + ' us email: '+ user.email + '  user.address:   ' + user.address )
    // save updated user
    const updatedUser = await user.save();

    res.status(200).json({user_id: updatedUser._id,
    email: updatedUser.email });
  } catch (error) {
    console.log('update error'  + error)
    printError(error, res);
  }
};


//  delete a user

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (user) {
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    printError(error, res);
  }
};

//  delete all users
const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany();
    res.json({ message: 'All users deleted' });
  } catch (error) {
    printError(error, res);
  }
};

module.exports = {
  getLoggedInUser,
  getUsers,
  getAllUsers,
  registerWorker,
  getUser,
  updateUser,
  deleteUser,
  deleteAllUsers
};

