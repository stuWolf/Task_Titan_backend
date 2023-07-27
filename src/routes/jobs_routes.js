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
  getLoggedInUser,
  getMyJobsOpen,
  getAllJobsOpenWorker
} = require('../controllers/jobs_controller');

const jobsRouter = express.Router();

//  get loggged in user OK
jobsRouter.get("/loggedIn", getLoggedInUser);

//  get all jobs with status "open"  OK
jobsRouter.get("/status/open", getOpenJobs);

//  get all jobs with given status OK
jobsRouter.get("/status/:status", getStatusJobs);

//  get all jobs for the logged-in customer  OK
jobsRouter.get("/myjobLogin", getMyJob);
// jobsRouter.get("/myjobs/:id", getMyJob);

//  get all open jobs for logged in user, by user ID
jobsRouter.get("/open", getMyJobsOpen);

//  get all open jobs for a logged in worker, by worker ID
jobsRouter.get("/open/worker", getAllJobsOpenWorker);

//  create a job
jobsRouter.post("/", createJob);

//  get all jobs
jobsRouter.get("/", getAllJobs);

//  get a job by ID
jobsRouter.get("/:id", getJob);

//  update a job
jobsRouter.put("/:id", updateJob);

//  delete a job
jobsRouter.delete("/:id", deleteJob);

//  delete all jobs
jobsRouter.delete("/", deleteAllJobs);




module.exports = jobsRouter;
