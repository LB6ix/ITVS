const express = require('express');
const router = express.Router();
const config = require('config');
const db = config.get('mongoURI');

const { authAdmin } = require('../../middleware/auth');

const Log = require('../../models/Logs');

router.get('/', [authAdmin], async (req, res) => {
  try {
    Log.aggregate([
      {
        $project: {
          timestamp: {
            $dateToString: {
              date: '$timestamp',
              timezone: 'Europe/Vilnius',
              format: '%Y-%m-%d %H:%M:%S'
            }
          },
          level: 1,
          message: 1
        }
      }
    ]).then((logs) => res.json(logs));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
