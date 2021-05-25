const express = require('express');
const router = express.Router();
const config = require('config');

const exportLogsToExcel = require('../../utility/exportService');

const { authAdmin } = require('../../middleware/auth');

const Log = require('../../models/Logs');
const workSheetColumnNames = ['Įvykio Laikas', 'Tipas', 'Įvykio aprašymas'];

const workSheetNames = 'Logs';
const filePath = './outputFiles/ITVS_ivykiu_zurnalas.xlsx';

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

router.get('/excel', [authAdmin], async (req, res) => {
  try {
    const logs = await Log.find().sort({ date: -1 });
    exportLogsToExcel(logs, workSheetColumnNames, workSheetNames, filePath);
    res.status(200).send('Successful Export');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
