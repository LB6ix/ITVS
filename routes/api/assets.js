const express = require('express');
const router = express.Router();

//@route  GET api/assets
//@desc   Test route
//@access Public
router.get('/', (req, res) => res.send('Asset route'));

module.exports = router;
