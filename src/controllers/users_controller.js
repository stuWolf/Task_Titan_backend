const User = require('../models/user')
const bcrypt = require("bcrypt")
const { createToken } = require('../services/auth_service')

const signup = async (request, response) => {
    
    let newUser = new User({
        username: request.body.username,
        password: bcrypt.hashSync(
            request.body.password,
            bcrypt.genSaltSync(10)
        ),
        notes: []
    })

    await newUser.save()
                .catch(error =>{
                    console.log(error.errors)
            })

    const token = createToken(newUser._id, newUser.username)
    response.json({
        username: newUser.username,
        token: token
    })
}

const login = async (request, response) => {
    
    const user = await User.findOne({username: request.body.username})

    if (user && bcrypt.compareSync(request.body.password, user.password)){
        const token = createToken(user._id, user.username)
        response.json({
            username: user.username,
            token: token
        })
    } else {
        response.json({
            error: "authentication failed"
        })
    }
}
const User = require('../models/user');
const bcrypt = require("bcrypt");
const { createToken } = require('../services/auth_service');


// Function to get users of a certain status
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ userStatus: req.query.userStatus });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Function to register a worker
const createWorker = async (req, res) => {
  try {
    req.body.userStatus = 'worker';
    signup(req, res); // Reuse existing signup function
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to register a user
const registerUser = async (req, res) => {
  try {
    req.body.userStatus = 'customer';
    signup(req, res); // Reuse existing signup function
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get a user by ID
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to update a user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to delete a user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to delete all users
const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany();
    res.json({ message: 'All users deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signup,
  login,
  getUsers,
  getAllUsers,
  createWorker,
  registerUser,
  getUser,
  updateUser,
  deleteUser,
  deleteAllUsers
};

