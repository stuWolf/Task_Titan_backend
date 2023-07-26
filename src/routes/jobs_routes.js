const express = require('express');
const {
  getAllJobs,
  getStatusJobs,
  getJob,
  getMyJob,
  createJob,
  updateJob,
  deleteJob,
  deleteAllJobs,
  getAllJobsOpen,
  getAllJobsOpenWorker
} = require('../controllers/jobs_controller');

const jobsRouter = express.Router();

// Route to get all jobs
jobsRouter.get("/", getAllJobs);

// Route to get all jobs with status "open"
jobsRouter.get("/status/open", getStatusJobs);

// Route to get a job by ID
jobsRouter.get("/:id", getJob);

// Route to get all jobs for the logged-in customer
jobsRouter.get("/myjobs", getMyJob);

// Route to create a job
jobsRouter.post("/", createJob);

// Route to update a job
jobsRouter.put("/:id", updateJob);

// Route to delete a job
jobsRouter.delete("/:id", deleteJob);

// Route to delete all jobs
jobsRouter.delete("/", deleteAllJobs);

// Route to get all open jobs for a user, by user ID
jobsRouter.get("/open/:userId", getAllJobsOpen);

// Route to get all open jobs for a worker, by worker ID
jobsRouter.get("/open/worker/:workerId", getAllJobsOpenWorker);

module.exports = jobsRouter;
