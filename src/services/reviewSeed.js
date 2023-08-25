const Review = require('../models/review')





const reviewSeed  = [
    // {   
    //     _id:   "64c554a069a5213214551fd8",
    //     jobId: "60fe580f87a9d3a2204869ed",
    //     userId: "64c553cd69a5213214551fc7",
    //     workerId: "64c553df69a5213214551fc9",
    //     startDate: "2023-07-15T00:00:00Z",
    //     endDate: "2023-07-20T00:00:00.00Z",
    //     stars: 5,
    //     review: "The worker did an excellent job. Highly recommended!",
    // },

    // {
       
    //     jobId: "60fe580f87a9d3a2204869ee",
    //     userId: "64c553cd69a5213214551fc7",
    //     workerId: "64c553df69a5213214551fc9",
    //     startDate: "2023-07-22T00:00:00.00Z",
    //     endDate: "2023-07-27T00:00:00.00Z",
    //     stars: 4,
    //     review: "Good work, but could improve in communication.",
    // },

    //     {
            
    //         jobId: "60fe580f87a9d3a2204869ed",
    //         userId: "64c553cd69a5213214551fc7",
    //         workerId: "64c553df69a5213214551fc9",
    //         startDate: "2023-07-15T00:00:00.00Z",
    //         endDate: "2023-07-20T00:00:00.00Z",
    //         stars: 5,
    //         review: "The worker did an excellent job. Highly recommended!",
    //     },
    //     {   
            
    //         jobId: "60fe580f87a9d3a2204869ee",
    //         userId: "64c553cd69a5213214551fc7",
    //         workerId: "64c553df69a5213214551fc9",
    //         startDate: "2023-07-22T00:00:00.00Z",
    //         endDate: "2023-07-27T00:00:00.00Z",
    //         stars: 4,
    //         review: "Good work, but could improve in communication.",
    //     },
    //     // New reviews
    //     {   _id:   "64c554d669a5213214551fdd",
    //         jobId: "60fe580f87a9d3a2204869ef",
    //         userId: "64c5540169a5213214551fcd",
    //         workerId: "64c5540a69a5213214551fcf",
    //         startDate: "2023-08-01T00:00:00.00Z",
    //         endDate: "2023-08-06T00:00:00.00Z",
    //         stars: 4.5,
    //         review: "Great job. Will hire again for future projects.",
    //     },
    //     {
    //         _id:   "64c554fc69a5213214551fe1",
    //         jobId: "60fe580f87a9d3a2204869f0",
    //         userId: "64c5541869a5213214551fd1",
    //         workerId: "64c5542569a5213214551fd3",
    //         startDate: "2023-08-10T00:00:00.00Z",
    //         endDate: "2023-08-15T00:00:00.00Z",
    //         stars: 5,
    //         review: "Excellent work! Very professional and efficient.",
    //     },
    //     {
    //         _id:   "64c5552069a5213214551fe5",
    //         jobId: "60fe580f87a9d3a2204869f1",
    //         userId: "64c5540169a5213214551fcd",
    //         workerId: "64c5540a69a5213214551fcf",
    //         startDate: "2023-08-17T00:00:00.00Z",
    //         endDate: "2023-08-22T00:00:00.00Z",
    //         stars: 3.5,
    //         review: "Overall good job, but missed some details.",
    //     },
    //     {
            
    //         jobId: "60fe580f87a9d3a2204869f2",
    //         userId: "64c5541869a5213214551fd1",
    //         workerId: "64c5542569a5213214551fd3",
    //         startDate: "2023-08-25T00:00:00.00Z",
    //         endDate: "2023-08-30T00:00:00.00Z",
    //         stars: 4,
    //         review: "Solid work. Met all expectations.",
    //     },
    
    
];


const seedReview = () => {
    return Review.deleteMany({})
      .then(() => Review.insertMany(reviewSeed))
      .then(data => {
        return {
          message:"The Review collectiom was seeded"
        };
      })
      .catch(err => {
        console.error('Error importing Review data: ', err);
        process.exit(1);
      });
  }

module.exports = seedReview;