const mongoose = require('mongoose');
const Schema = mongoose.Schema;

LogsSchema = new mongoose.Schema({
  timestamp: {
    type: Date
  },
  level: {
    type: String
  },
  message: {
    type: String
  }
});

module.exports = Log = mongoose.model('log', LogsSchema);
