const express = require('express');
const {
  getAllJobs,
  getStatusJobs,
  getOpenJobs,
  getJob,
  getMyJob,
  createJob,
  updateJob,
  deleteJob,
  deleteAllJobs,
  getMyJobsOpen,
  getCountOfJobs,
  getAllJobsOpenWorker
} = require('../controllers/jobs_controller');

const jobsRouter = express.Router();


// count all jobs of optional user id, if no id provided, all jobs are counted
// configuration (user_id, userStatus, and jobStatus),
jobsRouter.get('/count/:user_id/:userStatus/:status', getCountOfJobs);


//  get all jobs with status "open" , OK
// used in: manager view
jobsRouter.get("/status/open", getOpenJobs);

//  get all jobs with given status, OK
// used in: search
jobsRouter.get('/:user_id/:userStatus/:status', getStatusJobs);
//This route will match URLs like:

//jobs/12345/Worker/Active
//jobs/12345/Customer/!Completed
//jobs/12345/Manager/Active

// Where 12345 is the user_id, Worker is the userStatus, and Active is the jobStatus. The ! in front of Completed means you want jobs that are NOT completed.

//  get all jobs started by logged-in customer,  OK
// used in: customer view
jobsRouter.get("/myjobLogin", getMyJob);


//  get all open jobs for logged in user
// used in: customer view
jobsRouter.get("/open", getMyJobsOpen);

//  get all open jobs for a logged in worker, by worker ID
// used in: worker view
jobsRouter.get("/open/worker", getAllJobsOpenWorker);

//  create a job
// used in: Manader and customer view
jobsRouter.post("/", createJob);

//  get all jobs
// used in: admin
jobsRouter.get("/", getAllJobs);

//  get a job by ID
// used in: display form
jobsRouter.get("/:id", getJob);

//  update a job
// used in: job form
jobsRouter.put("/:id", updateJob);

//  delete a job
// used in: admin
jobsRouter.delete("/:id", deleteJob);

//  delete all jobs
// used in: admin
jobsRouter.delete("/", deleteAllJobs);




module.exports = jobsRouter;
