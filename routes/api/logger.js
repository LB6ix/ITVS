const express = require('express');
const router = express.Router();
const config = require('config');
const db = config.get('mongoURI');
const Log = require('../../models/Logs');
require('winston-mongodb');
const { createLogger, transports, format } = require('winston');
const { authAdmin } = require('../../middleware/auth');

const Logs = require('../../models/Logs');

// const logFormat = format.printf(({level, message, timestamp}) => {
//     return `${timestamp}` ${level}
// })

const logLevel = 'info';

const customLevels = {
  levels: {
    NaudotojoIštrynimas: 1,
    NaudotojoSukūrimas: 2,
    TurtoPriskyrimas: 3,
    TurtoAtsiėmimas: 4,
    info: 5
  }
};
const logger = createLogger({
  level: logLevel,
  levels: customLevels.levels,

  transports: [
    new transports.MongoDB({
      db: db,
      options: { useUnifiedTopology: true },
      collection: 'logs',
      level: logLevel,
      levels: customLevels.levels,

      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.json()
      )
    })
  ]
});

router.get('/', [authAdmin], async (req, res) => {
  try {
    const logs = await Logs.find().sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = logger;
