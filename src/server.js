const dotenv = require('dotenv')
dotenv.config();

const express = require('express');
const mongoose = require('mongoose')
const app = express();

const PORT = process.env.PORT || 3001
const HOST = process.env.HOST || '127.0.0.1'
// const User = require('./models/user')
const Job = require('./models/job')
// const Review = require('./models/review')
// const reviewSeed= require('./services/reviewSeed')
// const userSeed= require('./services/userSeed')
const jobSeed= require('./services/jobSeed')




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
	origin: ["http://localhost:3000", "https://bespoke-klepon-bc5d33.netlify.app"],
	optionsSuccessStatus: 200
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


app.post("/seedDatabase", (request, response)=> {


	
	Job.deleteMany({})
	.then(() => Job.insertMany(jobSeed))
	.then(data => {
	  console.log('Data imported! ', data);
	response.json({
		message:"The Jobs database was  seeded"
	});
	  process.exit(0);
	})
	.catch(err => {
	  console.error('Error  importing  Jobs data:  ', err);
	  process.exit(1);
	});

	// User.deleteMany({})
	// .then(() => User.insertMany(userSeed))
	// .then(data => {
	// //   console.log('Data imported! ', data);
	// response.json({
	// 	message:"The User database was seeded"
	// });
	//   process.exit(0);
	// })
	// .catch(err => {
	//   console.error('Error importing User data: ', err);
	//   process.exit(1);
	// });

	// Review.deleteMany({})
	// .then(() =>  Review.insertMany(reviewSeed))
	// .then(data => {
	// //   console.log('Data imported! ', data);
	// response.json({
	// 	message:"The   Review database was seeded"
	// });
	//   process.exit (0);
	// })
	// .catch(err => {
	//   console.error('Error importing Review data: ', err);
	//   process.exit(1);
	// });
	
})

app.get("/", (request, response) => {
	response.json({
		message:"Welcome to the note taking backend"
	});
});

const loginRouter = require('./routes/login_routes')
app.use("/login", loginRouter)

// when login Router is performed that doesn't need a token no validate request
// add a middleware that validates user authentication for all notes routes
const validateRequest = require('./middlewares/auth_middleware');
app.use(validateRequest)

const usersRouter = require('./routes/users_routes')
app.use("/users", usersRouter)


const jobsRouter = require('./routes/jobs_routes');
app.use("/jobs", jobsRouter)

const reviewsRouter = require('./routes/reviews_routes');
app.use("/reviews", reviewsRouter)


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
