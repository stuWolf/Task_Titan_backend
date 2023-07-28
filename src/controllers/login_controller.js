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
    console.log('login error'  + error)
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
       userStatus: user.userStatus,
            email: user.email,
            token: token
        })
    } else {
        response.status(404).json({
            error: "authentication failed"
        })
    }
  } catch (error) {
    printError(error, response);
  }
}
 
//  register a customer
const registerCustomer = async (req, res) => {
  try {
    req.body.userStatus = 'customer';
    signup(req, res); // Reuse existing signup function
  } catch (error) {
    printError(error, res);
  }
};


module.exports = {
  signup,
  login,
  registerCustomer
 
};

