const User = require('../models/user')
const {signup} = require('./login_controller')
const { printError } = require('../services/print_error');
// const {createToken } = require('../services/auth_service')
const bcrypt = require("bcrypt")
 
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

    // if email was updated
    if (req.body.email && req.body.email !== user.email) {
      // check if new email already exists
      const emailExists = await User.findOne({ email: req.body.email });

      if (emailExists) {
        throw new Error("Email already exists");
      }

      // update email
      user.email = req.body.email;
    }

    // if password was updated
    if (req.body.password) {
      // hash new password
      user.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync(10)
      );
    }

    // update other values
    if (req.body.firstName) user.firstName = req.body.firstName;
    if (req.body.lastName) user.lastName = req.body.lastName;
    if (req.body.address) user.address = req.body.address;
    if (req.body.contactNumber) user.contactNumber = req.body.contactNumber;
    if (req.body.dob) user.dob = req.body.dob;
    if (req.body.license) user.license = req.body.license;
    if (req.body.licenseNo) user.licenseNo = req.body.licenseNo;
    if (req.body.employedSince) user.employedSince = req.body.employedSince;

    // save updated user
    const updatedUser = await user.save();

    res.json({ message: 'User updated', updatedUser });
  } catch (error) {
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

