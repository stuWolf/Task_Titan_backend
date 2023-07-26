const Job = require('../models/job');

// Function to get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get all jobs with status "open"
const getStatusJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ jobStatus: 'open' });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get a job by ID
const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get all jobs for the logged-in customer
const getMyJob = async (req, res) => {
  try {
    const jobs = await Job.find({ customerId: req.user.id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to create a job
const createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to update a job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to delete a job
const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndRemove(req.params.id);
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to delete all jobs
const deleteAllJobs = async (req, res) => {
  try {
    await Job.deleteMany();
    res.json({ message: 'All jobs deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get all open jobs for a user, by user ID
const getAllJobsOpen = async (req, res) => {
  try {
    const jobs = await Job.find({ jobStatus: 'open', customerId: req.params.userId });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get all open jobs for a worker, by worker ID
const getAllJobsOpenWorker = async (req, res) => {
  try {
    const jobs = await Job.find({ jobStatus: 'open', workerId: req.params.workerId });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
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
};
