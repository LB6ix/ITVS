const mongoose = require('mongoose');

const SoftwareSchema = new mongoose.Schema({
  license: {
    type: String,
    required: true,
    unique: true
  },
  key: {
    type: String,
    required: true
  },
  expDate: {
    type: Date
  },
  manufacturer: {
    type: String
  },
  totalAmount: {
    type: Number
  },
  //   availAmount: {
  //     type: Number,
  //   },
  assignedTo: {
    type: String
  },
  cost: {
    type: String
  },
  supplier: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Software = mongoose.model('software', SoftwareSchema);
