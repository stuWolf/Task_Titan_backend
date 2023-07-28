const User = require('../models/user')

const { printError } = require('../services/print_error');
const {createToken } = require('../services/auth_service')
 
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
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
    // if email was updated
    //    if email exists throw error, "email already exists"
    //     else :  update email 
    // else: do not update email

    // if password was updated
      // password: bcrypt.hashSync(
      //request.body.password,
      //bcrypt.genSaltSync(10)),
      // else:  do not update password
      // await updatedUser.save()
    res.json(user);
    if (user) {
    res.json({message: 'User updated',user });
  } else {
    res.status(404).json({ message: "User not found" });
  }
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

