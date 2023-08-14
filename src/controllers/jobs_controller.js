const Job = require('../models/job');
const { printError } = require('../services/print_error');

// get the count of all jobs
// configuration (user_id, userStatus, and jobStatus),
const getCountOfJobs = async (req, res) => {
  try {
    let query = {};
    const { user_id, userStatus, status: jobStatus } = req.params;

    // Handle jobStatus with "!" prefix
    if (jobStatus.startsWith('!')) {
      query.jobStatus = { $ne: jobStatus.slice(1) };
    } else {
      query.jobStatus = jobStatus;
    }

    // Handle userStatus conditions
    if (userStatus === 'worker') {
      query.workerId = user_id;
    } else if (userStatus === 'customer') {
      query.customerId = user_id;
    } // For Manager, we don't need to filter by user_id

    const count = await Job.countDocuments(query);

    if (count) {
      res.json({ totalJobs: count });
    } else {
      res.status(404).json({ message404: "No jobs found for this configuration", user_id, userStatus, jobStatus });
    }
  } catch (error) {
    printError(error, res);
  }
};




//  get all jobs
const getAllJobs = async (req, res) => {
  try {
    // console.log('request.params  ' + [{req}]) 
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    printError(error, res);
  }
};



//  get a job by ID
const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message404: "Job not found" });
    }
  } catch (error) {
    printError(error, res);
  }
};



//  create a job
const createJob = async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      customerId: req.user.user_id, // Set userID from request user data
  
    });
    // console.log('user  ' + req.user.user_id)
    await job.save();
    res.status(201).json({ message: "Job created", job });
  } catch (error) {
    printError(error, res);
  }
};

//  update a job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    // Add a condition to check if the job exists and if the user is allowed to update
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    // if (job.customerId.toString() !== req.user.user_id) {
    //   return res.status(403).json({ message: "You don't have permission to update this job" });
    // }
    
    // Delete customerId from req.body to prevent it from being updated
    delete req.body.customerId;

    // If the check is successful, proceed to update the job
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    res.json({ message: "Job updated", updatedJob });
  } catch (error) {
    printError(error, res);
  }
};

//  delete a job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndRemove(req.params.id);
    if (job) {
      res.json({ message: 'Job deleted' });
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    printError(error, res);
  }
};

//  delete all jobs
const deleteAllJobs = async (req, res) => {
  try {
    await Job.deleteMany();
    res.json({ message: 'All jobs deleted' });
  } catch (error) {
    printError(error, res);
  }
};


//  get all jobs with status not "Closed"
const getOpenJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ jobStatus: { $ne: 'Closed' } });
    res.json(jobs);
  } catch (error) {
    printError(error, res);
  }
};

//I would like to extent this route: input parameter user_id, userStatus, jobStatus. Job status can also be inverted !  
// Jobserch after following conditions: 
// if userStatus == Worker: return jobs where user_id = workerId && jobStatus
// if userStatus == Customer: return jobs where user_id = customerId && jobStatus
// if userStatus == Manager: return all jobs matching jobStatus (like current)
//  get all jobs with a certain status
const getStatusJobs = async (req, res) => {
  try {
    let query = {};
    const { user_id, userStatus, status: jobStatus } = req.params;

    // Handle jobStatus with "!" prefix
    if (jobStatus.startsWith('!')) {
      query.jobStatus = { $ne: jobStatus.slice(1) };
    } else {
      query.jobStatus = jobStatus;
    }

    // Handle userStatus conditions
    if (userStatus === 'worker') {
      query.workerId = user_id;
    } else if (userStatus === 'customer') {
      query.customerId = user_id;
    } // For Manager, we don't need to filter by user_id

    const jobs = await Job.find(query);
    if (jobs.length === 0) {
      return res.status(404).json({ message404: 'No Jobs found with this status' });
    }
    res.json(jobs);
  } catch (error) {
    printError(error, res);
  }
};



//  get all jobs for the logged-in customer
// console.log(request.user.user_id)

const getMyJob = async (req, res) => {
  //  console.log('request.params  ' + request.params) 
    try {
      // console.log('user  ' + req.user.user_id)
      const jobs = await Job.find({ customerId: req.user.user_id });
      // const jobs = await Job.find({ customerId: req.params.id });
      res.json(jobs);
    } catch (error) {404
      printError(error, res);
    }
  };
  
  //  get all jobs not closed for a logged in user, by user ID
  const getMyJobsOpen = async (req, res) => {
    try {
      const jobs = await Job.find({ jobStatus: { $ne: 'Closed' }, customerId: req.user.user_id });
      // console.log('customerId  ' + customerId)
      if (jobs.length === 0) {
        return res.status(404).json({ message404: 'you have no open jobs' });
      }
      res.json(jobs);
    } catch (error) {
      printError(error, res);
    }
  };
  
  //  get all jobs not closed for a logged in worker, by worker ID
  const getAllJobsOpenWorker = async (req, res) => {
    try {
      const jobs = await Job.find({ jobStatus: { $ne: 'Closed' }, workerId: req.user.user_id });
      if (jobs.length === 0) {
        return res.status(404).json({ message404: 'No Jobs found for this worker' });
      }
      res.json(jobs);
    } catch (error) {
      printError(error, res);
    }
  };








module.exports = {
  getAllJobs,
  getStatusJobs,
  getOpenJobs,
  getCountOfJobs,
  getJob,
  getMyJob,
  createJob,
  updateJob,
  deleteJob,
  deleteAllJobs,
  getMyJobsOpen,
  getAllJobsOpenWorker
};
