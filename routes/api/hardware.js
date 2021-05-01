const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { authUser, authAdmin } = require('../../middleware/auth');

const Hardware = require('../../models/Hardware');

//@route  POST api/hardware
//@desc   hardware
//@access Public

router.post(
  '/add-hardware',
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
      name,
      serialNumber,
      manufacturer,
      model,
      category,
      status,
      assigned,
      assignedTo,
      location,
      supplier,
      cost,
      warranty,
      leaseExpDate
    } = req.body;
    try {
      let hardware = await Hardware.findOne({ name });

      if (hardware) {
        return res.status(400).json({
          errors: [{ msg: 'Įrangu su tokiu pavadinimu jau egzistuoja' }]
        });
      }
      hardware = new Hardware({
        name,
        serialNumber,
        manufacturer,
        model,
        category,
        status,
        assigned,
        assignedTo,
        location,
        supplier,
        cost,
        warranty,
        leaseExpDate
      });

      await hardware.save();
      res.json(hardware);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//@route  POST api/hardware/edit/:id
//@desc   hardware
//@access Authenticated(admin only)

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
      name,
      serialNumber,
      manufacturer,
      model,
      category,
      status,
      assigned,
      assignedTo,
      location,
      supplier,
      cost,
      warranty,
      leaseExpDate
    } = req.body;

    const hardwareFields = {};
    hardwareFields.name = name;
    hardwareFields.serialNumber = serialNumber;
    hardwareFields.manufacturer = manufacturer;
    hardwareFields.model = model;
    hardwareFields.category = category;
    hardwareFields.status = status;
    hardwareFields.assignedTo = assignedTo;
    hardwareFields.location = location;
    hardwareFields.supplier = supplier;
    hardwareFields.cost = cost;
    hardwareFields.warranty = warranty;
    hardwareFields.leaseExpDate = leaseExpDate;

    try {
      let hardware = await Hardware.findOne({
        _id: req.params.id
      });
      if (hardware) {
        hardware = await Hardware.findByIdAndUpdate(
          { _id: req.params.id },
          { $set: hardwareFields },
          { new: true }
        );
        return res.json(hardware);
      }
      // }
      // hardware = Hardware.updateOne({ _id: req.params.id }, hardwareFields);
      hardware = new Hardware(hardwareFields);

      await hardware.save();
      res.json(hardware);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//@route  GET api/hardware
//@desc   Get all hwardware assets
//@access Authenticated(admin only)

router.get('/', authAdmin, async (req, res) => {
  try {
    const hardwarelist = await Hardware.find();
    res.json(hardwarelist);
  } catch (err) {
    console.error(err.message);
    res.status(500).status('Server Error');
  }
});

//@route  GET api/hardware/:id
//@desc   Get hardware by id
//@access Authenticated(admin only)

router.get('/:id', authAdmin, async (req, res) => {
  try {
    const hardware = await Hardware.findById(req.params.id);

    if (!hardware) {
      return res.status(404).json({ msg: 'Įranga nerasta' });
    }
    res.json(hardware);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Įranga nerasta' });
    }
    res.status(500).send('Server Error');
  }
});

//@route  DELETE api/hardware/:id
//@desc   Delete hardware entry
//@access Private

router.delete('/:id', authAdmin, async (req, res) => {
  try {
    const hardware = await Hardware.findById(req.params.id);

    if (!hardware) {
      return res.status(404).json({ msg: 'Apratinė įranga nerasta' });
    }
    await hardware.remove();

    res.json({ msg: 'Apratinės įrangos įrašas ištrintas' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Apratinė įranga nerasta' });
    }
    res.status(500).send('Server Error');
  }
});

//checkin route

//checkout route

//add comment route

//hardware by assinged user route

//update hardware data

module.exports = router;
