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
  manufacturer: {
    type: String
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
    type: String, //get enum going
    enum: [
      'Paruoštas',
      'Neparuoštas',
      'Priskirtas',
      'Remontas',
      'Išpirktas',
      'Archyvuotas',
      'Dingęs',
      'Kita'
    ],
    default: 'Nepriskirtas'
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  assigned: {
    type: Boolean,
    default: false
  },
  location: {
    type: String
  },
  expectedCheckInDate: {
    type: Date,
    default: null
  },
  checkOutDate: {
    type: Date,
    default: null
  },
  checkInDate: {
    type: Date,
    default: null
  },
  cost: {
    type: String
  },
  supplier: {
    type: String
  },
  warranty: {
    type: String
  },
  leaseExpDate: {
    type: Date
  },
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
