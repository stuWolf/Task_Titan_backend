const dotenv = require('dotenv')
dotenv.config();

const express = require('express');
const mongoose = require('mongoose')
const app = express();

const PORT = process.env.PORT || 3001    // connection port, must be set in frontend REACT_APP_BACKEND_URL package.json and .env
// const HOST = process.env.HOST || '127.0.0.1'
const HOST = process.env.HOST || '0.0.0.0'

const seedJobs = require('./services/jobSeed');
const seedUser = require('./services/userSeed'); // Or wherever your seedUser function is
const seedReview = require('./services/reviewSeed'); // Or whe




const helmet = require('helmet')
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.contentSecurityPolicy({
	directives:{
		defaultSrc:["self"]
	}
}))

const cors = require('cors')
let corsOptions = {
	
	origin: ["http://localhost:3000", "https://task-titan.netlify.app","https://tasktitan.onrender.com"],
	// origin: ["*"],
	optionsSuccessStatus: 200    // hiroku
}

app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({extended: true}))

let databaseURL = "";
switch(process.env.NODE_ENV.toLowerCase()){
	case "production":
		databaseURL = process.env.DATABASE_URL;
		break;
	case "development":
		databaseURL = 'mongodb://localhost:27017/task_titan_db';
		break;
	case "test":
		databaseURL = 'mongodb://localhost:27017/task_titan_db_test';
		break;
	default:
		console.error("Wrong environment mode, database cannot connect");
}

// create a connection
const {databaseConnector} = require("./database")
databaseConnector(databaseURL).then(() =>{
	console.log("connected to the db!")
}).catch(error => {
	console.log("could not connect to the db!")
	console.log(error)
})

app.get("/databaseHealth", (request, response) => {
    let databaseState = mongoose.connection.readyState;
    let databaseName = mongoose.connection.name;
    let databaseModels = mongoose.connection.modelNames();
    let databaseHost = mongoose.connection.host;

    response.json({
        readyState: databaseState,
        dbName: databaseName,
        dbModels: databaseModels,
        dbHost: databaseHost
    })
});




app.get("/", (request, response) => {
	response.json({
		message:"Welcome to the TASK TITAN backend"
	});
});

const loginRouter = require('./routes/login_routes')
app.use("/login", loginRouter)

// when login Router is performed that doesn't need a token no validate request
// add a middleware that validates user authentication for all notes routes
const validateRequest = require('./middlewares/auth_middleware');
app.use(validateRequest)

// const loginRouter = require('./routes/login_routes')
// app.use("/login", loginRouter)

const usersRouter = require('./routes/users_routes')
app.use("/users", usersRouter)


const jobsRouter = require('./routes/jobs_routes');
app.use("/jobs", jobsRouter)

const reviewsRouter = require('./routes/reviews_routes');
app.use("/reviews", reviewsRouter)

app.get("/seedDatabase",  async (request, response)=> {

	try {
		const jobs = await seedJobs();
		const users = await seedUser();
		const reviews = await seedReview();
		
		response.json({
		  jobs: jobs.message,
		  users: users.message,
		  reviews: reviews.message
		});
	  } catch (err) {
		console.error('Error in seeding data: ', err);
		response.status(500).send('Error in seeding data');
	  }
	
	
	
});


app.get('*', (request, response) =>{
	response.status(404)
	response.json({
		message: "Route not found",
		path: request.path
	})
})

module.exports = {
	app, HOST, PORT
}
