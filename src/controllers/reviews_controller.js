const Review = require('../models/review');

// Function to get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get a review for a specific job ID
const getJobReview = async (req, res) => {
  try {
    const reviews = await Review.find({ jobId: req.params.jobId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get all reviews for a specific worker ID
const getWorkerReview = async (req, res) => {
  try {
    const reviews = await Review.find({ workerId: req.params.workerId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get all reviews for a specific customer ID
const getCustomerReview = async (req, res) => {
  try {
    const reviews = await Review.find({ customerId: req.params.customerId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to create a review
const createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to delete a review
const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndRemove(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to delete all reviews
const deleteAllReviews = async (req, res) => {
  try {
    await Review.deleteMany();
    res.json({ message: 'All reviews deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get a review by ID
const getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
