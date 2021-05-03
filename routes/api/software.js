const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { authUser, authAdmin } = require('../../middleware/auth');

const Software = require('../../models/Software');
let currentDate = new Date().toISOString();

//@route  POST api/software/add-software
//@desc   Test route
//@access priv
router.post(
  '/add-software',
  [
    authAdmin,
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
        .isInt({ min: 1, max: 100 })
    ]
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
      assignedTo,
      cost,
      supplier
    } = req.body;

    try {
      let software = await Software.findOne({ license });

      if (software) {
        return res.status(400).json({
          errors: [{ msg: 'Licencija su tokiu pavadinimu jau egzistuoja' }]
        });
      }

      software = new Software({
        license,
        key,
        expDate,
        manufacturer,
        totalAmount,
        // availAmount,
        assignedTo,
        cost,
        supplier
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

router.get('/', authAdmin, async (req, res) => {
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

router.delete('/:id', authAdmin, async (req, res) => {
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

router.post(
  '/edit/:id',
  [
    authAdmin,
    [
      check('name', 'Įrašykite pavadinimą').not().isEmpty(),
      check('serialNumber', 'Įrašykite serijinį numerį').not().isEmpty(),
      check('model', 'Įrašykite modelį').not().isEmpty(),
      check('category', 'Įrašykite katogeriją').not().isEmpty()
    ]
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
      assignedTo,
      cost,
      supplier
    } = req.body;

    const softwareFields = {};
    softwareFields.license = license;
    softwareFields.key = key;
    softwareFields.expDate = expDate;
    softwareFields.manufacturer = manufacturer;
    softwareFields.totalAmount = totalAmount;
    softwareFields.assignedTo = assignedTo;
    softwareFields.cost = cost;
    softwareFields.supplier = supplier;

    try {
      let software = await Software.findOne({
        _id: req.params.id
      });
      if (software) {
        software = await Software.findByIdAndUpdate(
          { _id: req.params.id },
          { $set: softwareFields },
          { new: true }
        );
        return res.json(software);
      }
      // }
      // software = software.updateOne({ _id: req.params.id }, softwareFields);
      software = new Software(softwareFields);

      await software.save();
      res.json(software);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//checkin route

//checkout route

//software by assinged user route

//software by id route

module.exports = router;
