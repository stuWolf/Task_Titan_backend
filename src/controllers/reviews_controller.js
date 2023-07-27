const Review = require('../models/review');
const User = require('../models/user');
const { printError } = require('../services/print_error');


//  get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    if (reviews.length === 0) {
      res.status(404).json({ message: "No reviews found" });
    } else {
      res.json(reviews);
    }
  } catch (error) {
    printError(error, res);
  }
};

//  get a review for a specific job ID
const getJobReview = async (req, res) => {
  try {
    const reviews = await Review.find({ jobId: req.params.jobId });
    if (reviews.length === 0) {
      res.status(404).json({ message: "No reviews found for this job" });
    } else {
      res.json(reviews);
    }
  } catch (error) {
    printError(error, res);
  }
};

//  get all reviews for a specific worker ID
const getWorkerReview = async (req, res) => {
  try {
    const reviews = await Review.find({ workerId: req.params.workerId });
    if (reviews.length === 0) {
      res.status(404).json({ message: "No reviews found for this worker" });
    } else {
      res.json(reviews);
    }
  } catch (error) {
    printError(error, res);
  }
};

//  get all reviews for a specific customer ID
const getCustomerReview = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.params.customerId });
    if (reviews.length === 0) {
      res.status(404).json({ message: "No reviews found for this customer" });
    } else {
      res.json(reviews);
    }
  } catch (error) {
    printError(error, res);
  }
};

//  create a review
const createReview = async (req, res) => {
  try {
    // Create a new review instance and set userID and endDate
    const review = new Review({
      ...req.body,
      userId: req.user.user_id, // Set userID from request user data
      endDate: new Date(), // Set endDate as today's date
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    printError(error, res);
  }
};


//  delete a review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndRemove(req.params.id);
    if (review) {
      res.json({ message: 'Review deleted' });
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    printError(error, res);
  }
};

//  delete all reviews
const deleteAllReviews = async (req, res) => {
  try {
    await Review.deleteMany();
    res.json({ message: 'All reviews deleted' });
  } catch (error) {
    printError(error, res);
  }
};

//  get a review by ID
const getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    printError(error, res);
  }
};

module.exports = {
  getAllReviews,
  getJobReview,
  getWorkerReview,
  getCustomerReview,
  createReview,
  deleteReview,
  deleteAllReviews,
  getReview
};
