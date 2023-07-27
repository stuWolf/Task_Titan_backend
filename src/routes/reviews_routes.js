const express = require('express');
const {
  getAllReviews,
  getJobReview,
  getWorkerReview,
  getCustomerReview,
  createReview,
  deleteReview,
  deleteAllReviews,
  getReview
} = require('../controllers/reviews_controller');

const reviewsRouter = express.Router();


//   create a review
reviewsRouter.post("/", createReview);
//   get a review by ID
reviewsRouter.get("/:id", getReview);

//   get all reviews
reviewsRouter.get("/", getAllReviews);

//   get a review for a specific job ID
reviewsRouter.get("/job/:jobId", getJobReview);

//   get all reviews for a specific worker ID
reviewsRouter.get("/worker/:workerId", getWorkerReview);

//   get all reviews for a specific customer ID
reviewsRouter.get("/customer/:customerId", getCustomerReview);

//   delete a review
reviewsRouter.delete("/:id", deleteReview);

//   delete all reviews
reviewsRouter.delete("/", deleteAllReviews);

//   get a review by ID
reviewsRouter.get("/:id", getReview);

module.exports = reviewsRouter;
