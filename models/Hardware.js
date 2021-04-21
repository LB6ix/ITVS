const mongoose = require('mongoose');

const HardwareSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  serialNumber: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  status: {
    type: String
  },
  assignedTo: {
    type: String
  },
  location: {
    type: String
  },
  cost: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Hardware = mongoose.model('hardware', HardwareSchema);
