const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  status: {
    type: String
  },
  //   availAmount: {
  //     type: Number,
  //   },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  assigned: {
    type: Boolean,
    default: false
  },
  cost: {
    type: String
  },
  supplier: {
    type: String
  },
  checkOutDate: {
    type: Date
  },
  checkInDate: {
    type: Date
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Software = mongoose.model('software', SoftwareSchema);
