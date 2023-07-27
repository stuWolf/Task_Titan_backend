const User = require('../models/user')
const bcrypt = require("bcrypt")
const { createToken } = require('../services/auth_service')
const { printError } = require('../services/print_error');


const signup = async (request, response) => {
  try { 
    let newUser = new User({
      userStatus: request.body.userStatus,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: bcrypt.hashSync(
          request.body.password,
          bcrypt.genSaltSync(10)
      ),
      address: request.body.address,
      contactNumber: request.body.contactNumber,
      dob: request.body.dob,
      license: request.body.license,
      licenseNo: request.body.licenseNo,
      employedSince: request.body.employedSince,

    })

    await newUser.save()
    const token = createToken(newUser._id, newUser.email)
  response.json({
    user_id: newUser._id,
    email: newUser.email,
    token: token
  })
  } catch (error) {
    printError(error, response);
  }

  
}

const login = async (request, response) => {
    
    const user = await User.findOne({email: request.body.email})
    try { 
    if (user && bcrypt.compareSync(request.body.password, user.password)){
        const token = createToken(user._id, user.email)
        response.json({
          user_ID: user._id,
            email: user.email,
            token: token
        })
    } else {
        response.json({
            error: "authentication failed"
        })
    }
  } catch (error) {
    printError(error, response);
  }
}
 


// Function to get users of a certain status
const getUsers = async (req, res) => {

  try {
    const users = await User.find({ userStatus: req.body.userStatus });
    
    res.json(users);
 
  } catch (error) {
    console.log(userStatus);
    printError(error, res);
  }
  
};

// Function to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    printError(error, res);
  }
};


// Function to register a worker
const registerWorker = async (req, res) => {
  try {
    req.body.userStatus = 'worker';
    signup(req, res); // Reuse existing signup function
  } catch (error) {
    printError(error, res);
  }
};

// Function to register a customer
const registerCustomer = async (req, res) => {
  try {
    req.body.userStatus = 'customer';
    signup(req, res); // Reuse existing signup function
  } catch (error) {
    printError(error, res);
  }
};

// Function to get a user by ID
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    printError(error, res);
  }
};

// Function to update a user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    printError(error, res);
  }
};

// Function to delete a user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    printError(error, res);
  }
};

// Function to delete all users
const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany();
    res.json({ message: 'All users deleted' });
  } catch (error) {
    printError(error, res);
  }
};

module.exports = {
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
};

