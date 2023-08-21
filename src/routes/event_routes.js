const express = require('express');
// const app = express();
const {
 
 
  getUserMessage ,
  getCountOfJobs,
  sendSSE
} = require('../controllers/event_controller');

const eventRouter = express.Router();



// I get the following error:  Cross-Origin Request Blocked: 
// The Same Origin Policy disallows reading the remote resource at 
// https://task-titan-render.onrender.com/login. (Reason: CORS request did not succeed). Status code: (null).





eventRouter.get('/message/:user_id/:userStatus', getUserMessage );

eventRouter.get('/count/:user_id/:userStatus/:status', getCountOfJobs);
eventRouter.get('/', sendSSE); // Add this line for the SSE route
module.exports = eventRouter;
