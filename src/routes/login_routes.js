const express = require('express');
const app = express();
const {
  signup,
  login,
  registerCustomer, 
} = require('../controllers/login_controller');

const loginRouter = express.Router();
const cors = require('cors')
let corsOptions = {
	// origin: ["http://localhost:3000", "https://task-titan.netlify.app"],
  origin: ["http://localhost:3000", "*" ],
	optionsSuccessStatus: 200    // hiroku
}

app.use(cors(corsOptions))


// I get the following error:  Cross-Origin Request Blocked: 
// The Same Origin Policy disallows reading the remote resource at 
// https://task-titan-render.onrender.com/login. (Reason: CORS request did not succeed). Status code: (null).


//  signup a new user, general
loginRouter.post("/signup", signup);

//  login a user
loginRouter.post("/", login);

//  register a Customer input: body: JSON.stringify(data)
// used in: Register customer. userState = customer
loginRouter.post("/registerCustomer", registerCustomer);


module.exports = loginRouter;
