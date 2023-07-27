const mongoose = require('mongoose');
// const User = require('../models/user');
const JobSchema = new mongoose.Schema({
  jobStatus: {
    type: String,
    enum: ['Draft', 'Quoting', 'Customer Approval', 'Worker Assignment', 'Job Implementation', 'Customer Review', 'Closed'],
    required: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming you have a User model
    required: true
  },
  addressOfInstallation: {
    type: String,
    required: true
  },
  scopeOfWork: {
    type: String,
    required: true
  },
  preferredJobCompletionDate: {
    type: Date,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateQuoted: {
    type: Date
  },
  amountQuoted: {
    type: Number
  },
  quoteAttachment: {
    type: String,
    default: 'link to quote.PDF'
  },
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // referencing the User model again
    required: true
  },
  maximumDemandInAmps: {
    type: Number
  },
  consumerMainsCapacity: {
    type: Number
  },
  electricalRetailer: {
    type: String
  },
  energyDistributor: {
    type: String
  },
  mainsPhases: {
    type: Number
  },
  
  reviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review', // assuming you have a Review model
  },
  
  invoiceLink: {
    type: String,
    default: 'link to invoice.PDF'
  }
});

module.exports = mongoose.model('Job', JobSchema);
