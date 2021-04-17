const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const formatDate = require('../../utils/formatDate');

const Software = require('../../models/Software');
let currentDate = new Date().toISOString();

//@route  POST api/software/add-software
//@desc   Test route
//@access priv
router.post(
  '/add-software',
  [
    auth,
    [
      check('license', 'Įrašykite licencijos pavadinimą').not().isEmpty(),
      check('key', 'Įrašykite produkto raktą').not().isEmpty(),
      check('expDate', 'Įrašykite tinkamą galiojimo datą')
        .not()
        .isEmpty()
        .isAfter(currentDate),
      check('totalAmount', 'Įveskite tinkamą bendrą kiekį')
        .not()
        .isEmpty()
        .isInt({ min: 1, max: 100 }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      license,
      key,
      expDate,
      manufacturer,
      totalAmount,
      //   availAmount,
      checkedOut,
      cost,
    } = req.body;

    try {
      let software = await Software.findOne({ license });

      if (software) {
        return res.status(400).json({
          errors: [{ msg: 'Licencija su tokiu pavadinimu jau egzistuoja' }],
        });
      }

      software = new Software({
        license,
        key,
        expDate,
        manufacturer,
        totalAmount,
        // availAmount,
        checkedOut,
        cost,
      });

      await software.save();
      res.json(software);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//@route  GET api/software
//@desc   Get all software assets
//@access Private

router.get('/', auth, async (req, res) => {
  try {
    const softwarelist = await Software.find().sort({ expDate: 1 });
    res.json(softwarelist);
  } catch (err) {
    console.error(err.message);
    res.status(500).status('Server Error');
  }
});

//@route  DELETE api/software/:id
//@desc   Delete software entry
//@access Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const software = await Software.findById(req.params.id);

    if (!software) {
      return res.status(404).json({ msg: 'Programinė įranga nerasta' });
    }
    await software.remove();

    res.json({ msg: 'Programinės įrangos įrašas ištrintas' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Programinė įranga nerasta' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
