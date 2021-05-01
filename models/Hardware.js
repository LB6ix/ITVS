const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  assigned: {
    type: Boolean,
    default: false
  },
  assignedTo: {
    type: String,
    default: 'Nepriskirtas'
  },
  location: {
    type: String
  },
  expectedCheckInDate: {
    type: Date
  },
  checkInDate: {
    type: Date
  },
  cost: {
    type: String
  },
  leaseExpDate: {
    type: Date
  },

  //add more data?
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      text: {
        type: String,
        required: true
      },
      firstname: {
        type: String
      },
      lastname: {
        type: String
      },
      department: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Hardware = mongoose.model('hardware', HardwareSchema);
