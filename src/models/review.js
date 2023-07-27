const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({

  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job', // assuming you have a Job model
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming you have a User model
    required: true
  },
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // referencing the User model again
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  stars: {
    type: Number,
    required: true
  },
  review: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Review', ReviewSchema);
