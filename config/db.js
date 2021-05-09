const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const dbtest = config.get('mongoTest');

function connectDB() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      })
      .then((res, err) => {
        if (err) return reject(err);
        resolve();
      });
  });
}

function closeDB() {
  return mongoose.disconnect();
}

module.exports = { connectDB, closeDB };
