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
	origin: ["http://localhost:3000", "https://task-titan.netlify.app"],
	optionsSuccessStatus: 200    // hiroku
}

app.use(cors(corsOptions))

//  signup a new user, general
loginRouter.post("/signup", signup);

//  login a user
loginRouter.post("/", login);

//  register a Customer input: body: JSON.stringify(data)
// used in: Register customer. userState = customer
loginRouter.post("/registerCustomer", registerCustomer);


module.exports = loginRouter;
