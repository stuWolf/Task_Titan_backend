const Job = require('../models/job');
const { printError } = require('../services/print_error');
const { ObjectId } = require('mongodb');

// create userMessage based on change stream in Jobs collection
// monitor the transition of jobStatus and return unermessages based on userStatus
// manager monitors transition of all jobs, customer and worker based on user and worker ID

const getUserMessage = async (req, res) => {
    try {
        const { user_id, userStatus } = req.params;
        let pipeline;

        // Define the message mapping
        const messageMap = {
            manager: {
                Quoting: "You have a new job for quoting",
                "Worker Assignment": "Please assign a worker",
                Closed: "Another job has been completed, time to write an invoice"
            },
            customer: {
                "Customer Approval": "Your quote just arrived, please approve if you wish to proceed",
                "Customer Review": "Your job has been completed, please write a review"
            },
            worker: {
                "Job Implementation": "You received a new job for processing"
            }
        };

        // Set up the pipeline based on userStatus
        switch (userStatus) {
            case 'manager':
                pipeline = [{ $match: { "updateDescription.updatedFields.jobStatus": { $exists: true } } }];
                break;
            case 'customer':
                pipeline = [{
                    $match: {
                        $and: [
                            { "fullDocument.customerId": new ObjectId(user_id) },
                            { "updateDescription.updatedFields.jobStatus": { $exists: true } }
                        ]
                    }
                }];
                break;
            case 'worker':
                pipeline = [{
                    $match: {
                        $and: [
                            { "fullDocument.workerId": new ObjectId(user_id) },
                            { "updateDescription.updatedFields.jobStatus": { $exists: true } }
                        ]
                    }
                }];
                break;
        }

        // Set headers for SSE
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const changeStream = Job.watch(pipeline, { fullDocument: 'updateLookup' });

        changeStream.on('change', (change) => {
          console.log('change detected', change);
            const newStatus = change.updateDescription.updatedFields.jobStatus;
            console.log('newStatus  ', newStatus);
            const message = messageMap[userStatus][newStatus];
            if (message) {
                res.write(`data: ${JSON.stringify({ message })}\n\n`);
            }
        });

        // Handle client disconnect
        req.on('close', () => {
            changeStream.close();
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};




// get the count  jobs based on user_id, userStatus,jobStatus 
// configuration (user_id, userStatus, and jobStatus),
const getCountOfJobs = async (req, res) => {
  try {
    const { user_id, userStatus, status: jobStatus } = req.params;

    let query = {
      jobStatus: jobStatus.startsWith('!') ? { $ne: jobStatus.slice(1) } : jobStatus
    };
    console.log('query.jobStatus  ', query.jobStatus);
    const buildPipeline = (userIdField) => ([
      {
        $match: {
          $and: [
            { [`fullDocument.${userIdField}`]: new ObjectId(user_id) },
            { "updateDescription.updatedFields.jobStatus": query.jobStatus }
          ]
        }
      }
    ]);

    let pipeline;
    switch (userStatus) {
      case 'worker':
        query.workerId = user_id;
        pipeline = buildPipeline('workerId');
        break;
      case 'customer':
        query.customerId = user_id;
        pipeline = buildPipeline('customerId');
        break;
      case 'manager':
        pipeline = [{ $match: { "updateDescription.updatedFields.jobStatus": query.jobStatus } }];
        break;
    }

    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const changeStream = Job.watch(pipeline, { fullDocument: 'updateLookup' });

    changeStream.on('error', (error) => {
      console.error('Error in changeStream:', error);
    });

    changeStream.on('change', async (change) => {
      console.log('change detected', change);
      // const count = await Job.countDocuments(query);

      // console.log('total jobs', change);
      res.write(`data: ${JSON.stringify(change)}\n\n`);
        // res.write(`data: ${JSON.stringify( { totalJobs: count })}\n\n`);
      
    });

    // Handle client disconnect
    req.on('close', () => {
      changeStream.close();
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};





// Send an event every second
// const sendSSE = (req, res) => {
//   res.setHeader('Content-Type', 'text/event-stream');
//   res.setHeader('Cache-Control', 'no-cache');
//   res.setHeader('Connection', 'keep-alive');
  
//   // Send an event every second
//   const interval = setInterval(() => {
//     res.write(`data: ${new Date().toISOString()}\n\n`);
//   }, 1000);

//   // Clear the interval when the client disconnects
//   req.on('close', () => {
//     clearInterval(interval);
//   });
// };
// When a change is detected, we send the change event as an SSE event to the client.
const sendSSE =  (req, res) => {
  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  // const query = {customerId:'64c5541869a5213214551fd1'};
  // Watch the entire Job collection for any changes
  // const changeStream = Job.watch([{ $match: query }]);
  const changeStream = Job.watch( );
  // console.log('query ' , query) 


  changeStream.on('error', (error) => {
    console.error('Error in changeStream:', error);
  });
  changeStream.on('change', async (change) => {
    // console.log('change detected ' , change)
      // Send the change event as an SSE event
      res.write(`data: ${JSON.stringify(change)}\n\n`);
      console.log('change detected ' , change) 
  });

  // Handle client disconnect
  req.on('close', () => {
      changeStream.close();
  });
};

module.exports = {
  sendSSE ,
  getCountOfJobs,
  getUserMessage 
  // registerCustomer
 
};

