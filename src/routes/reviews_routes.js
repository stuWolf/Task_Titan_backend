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

// Route to get all reviews
reviewsRouter.get("/", getAllReviews);

// Route to get a review for a specific job ID
reviewsRouter.get("/job/:jobId", getJobReview);

// Route to get all reviews for a specific worker ID
reviewsRouter.get("/worker/:workerId", getWorkerReview);

// Route to get all reviews for a specific customer ID
reviewsRouter.get("/customer/:customerId", getCustomerReview);

// Route to create a review
reviewsRouter.post("/", createReview);

// Route to delete a review
reviewsRouter.delete("/:id", deleteReview);

// Route to delete all reviews
reviewsRouter.delete("/", deleteAllReviews);

// Route to get a review by ID
reviewsRouter.get("/:id", getReview);

module.exports = reviewsRouter;
