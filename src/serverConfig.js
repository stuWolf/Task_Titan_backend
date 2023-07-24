// Import the ExpressJS package
const express = require('express');
// Create an instance of Express
const app = express();
// Set up any data needed to give to the server later
const port = 3000;

// Configure settings to allow data to be sent into the server
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Keep code D.R.Y when possible. 
// Different routes can use the same function!
function messageWithVerb(request, response) {
    response.send(`Received a request with the ${request.method} HTTP verb!`);
}
app.get('/', (request, response) => messageWithVerb(request, response));
app.post('/', (request, response) => messageWithVerb(request, response));
app.put('/', (request, response) => messageWithVerb(request, response));
app.patch('/', (request, response) => messageWithVerb(request, response));
app.delete('/', (request, response) => messageWithVerb(request, response));

module.exports = {app, port};
