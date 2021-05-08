const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { authUser, authAdmin } = require('../../middleware/auth');
const logger = require('../api/logger');

const Software = require('../../models/Software');
let currentDate = new Date();
const offset = currentDate.getTimezoneOffset();
currentDate = new Date(currentDate.getTime() - offset * 60 * 1000);
currentDate.setDate(currentDate.getDate() - 1);
//currentDate.toISOString().split('T')[0];

//@route  POST api/software/add-software
//@desc   Test route
//@access priv
router.post(
  '/add-software',
  [
    authAdmin,
    [
      check('license', 'Įrašykite licencijos pavadinimą').not().isEmpty(),
      check('key', 'Įrašykite licencijos raktą').not().isEmpty(),
      check(
        'expDate',
        'Įrašykite tinkamą galiojimo datą, kuri būtų vėlesnė nei šiandienos'
      )
        .not()
        .isEmpty()
        .isAfter(currentDate.toISOString().split('T')[0]),
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
      status,
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
        status,
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
    await Software.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'assignedTo',
          foreignField: '_id',
          as: 'softwares'
        }
      },
      { $unwind: { path: '$softwares', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          license: 1,
          key: 1,
          expDate: 1,
          manufacturer: 1,
          totalAmount: 1,
          status: 1,
          assigned: 1,
          assignedTo: '$softwares.email',
          cost: 1,
          supplier: 1,
          date: 1,
          checkOutDate: 1,
          checkInDate: 1
        }
      }
    ]).then((softwares) => res.json(softwares));
    // const softwarelist = await software.find();
    //console.log(softwares);
  } catch (err) {
    console.error(err.message);
    res.status(500).status('Server Error');
  }
});

//@route  GET api/software/single/:id
//@desc   Get software by id
//@access Authenticated(admin only)

router.get('/single/:id', authAdmin, async (req, res) => {
  try {
    const software = await Software.findById(req.params.id);
    var ObjectID = require('mongodb').ObjectID;
    await Software.aggregate([
      {
        $match: {
          _id: ObjectID(req.params.id)
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'assignedTo',
          foreignField: '_id',
          as: 'software'
        }
      },
      { $unwind: { path: '$software', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          license: 1,
          key: 1,
          expDate: 1,
          manufacturer: 1,
          totalAmount: 1,
          status: 1,
          assigned: 1,
          assignedTo: '$software.email',
          cost: 1,
          supplier: 1,
          date: 1,
          checkOutDate: 1,
          checkInDate: 1
        }
      }
    ]).then((software) => res.json(software));
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Programinė įranga nerasta' });
    }
    res.status(500).send('Server Error');
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
      check('license', 'Įrašykite licencijos pavadinimą').not().isEmpty(),
      check('key', 'Įrašykite licencijos raktą').not().isEmpty(),
      check(
        'expDate',
        'Įrašykite tinkamą galiojimo datą, kuri būtų vėlesnė nei šiandienos'
      )
        .not()
        .isEmpty()
        .isAfter(currentDate.toISOString().split('T')[0]),
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
      status,
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
    softwareFields.status = status;
    softwareFields.totalAmount = totalAmount;
    softwareFields.assignedTo = assignedTo;
    softwareFields.cost = cost;
    softwareFields.supplier = supplier;

    try {
      let software = await Software.findOne({
        _id: req.params.id
      });
      if (software) {
        {
          delete softwareFields.assignedTo;
        }
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
      softwareFields.assignedTo = assignedTo;
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//checkin route

router.post(
  '/:id/checkin/',
  authAdmin,
  check('status', 'Privaloma nurodyti statusą').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let currentDate = new Date();
    try {
      const { status, assigned, assignedTo, checkOutDate } = req.body;

      const softwareFields = {};
      softwareFields.status = req.body.status;
      softwareFields.assigned = false;
      softwareFields.assignedTo = null;
      softwareFields.checkInDate = currentDate;
      softwareFields.checkOutDate = '';

      let software = await Software.findOne({
        _id: req.params.id
      });
      if (software) {
        usercheck = await User.findById(software.assignedTo);
        software = await Software.findByIdAndUpdate(
          { _id: req.params.id },
          { $set: softwareFields },
          { new: true }
        );
        logger.TurtoAtsiėmimas(
          `Programa ${software.name} atsiimta iš naudotojo: ${usercheck.email}`
        );
        return res.json(software);
      }

      software = new Software(softwareFields);

      await software.save();
      res.json(software);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//checkout route

router.post(
  '/:id/checkout/',
  [
    authAdmin,
    [
      check('assignedTo', 'Privaloma nurodyti').not().isEmpty(),
      check(
        'checkOutDate',
        'Įrašykite tinkamą galiojimo datą, kuri būtų vėlesnė nei šiandienos'
      )
        .not()
        .isEmpty()
        .isAfter(currentDate.toISOString().split('T')[0])
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { status, assigned, assignedTo, checkOutDate } = req.body;

      const softwareFields = {};
      softwareFields.status = 'Neaktyvi';
      softwareFields.assigned = true;
      softwareFields.assignedTo = assignedTo;
      softwareFields.checkOutDate = checkOutDate;

      const usercheck = await User.findById(assignedTo);

      let software = await Software.findOne({
        _id: req.params.id
      });
      if (software) {
        software = await Software.findByIdAndUpdate(
          { _id: req.params.id },
          { $set: softwareFields },
          { new: true }
        );
        logger.TurtoPriskyrimas(
          `Programa ${software.name} priskirta naudotojui: ${usercheck.email}`
        );
        return res.json(software);
      }

      software = new Software(softwareFields);

      await software.save();
      res.json(software);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//software by assigned user route
router.get('/:id', authUser, async (req, res) => {
  try {
    //const user = await User.findById(req.user.id).select('-password');
    const softwares = await Software.find({ assignedTo: req.user.id })
      .sort({
        date: -1
      })
      .lean();

    if (!softwares) {
      return res.status(404).json({ msg: 'Priskirtos įrangos nerasta' });
    }
    res.json(softwares);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Priskirtos įrangos nerasta' });
    }
    res.status(500).send('Server Error');
  }
});

//software by id route

module.exports = router;
