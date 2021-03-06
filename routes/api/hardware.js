const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { authUser, authAdmin } = require('../../middleware/auth');
const logger = require('../api/logger');
const sendEmail = require('../../utility/sendEmail');

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
      check('category', 'Įrašykite katogeriją').not().isEmpty(),
      check('status', 'Įrašykite katogeriją').not().isEmpty()
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
      leaseExpDate,
      checkOutDate,
      expectedCheckInDate,
      checkInDate
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
        leaseExpDate,
        checkOutDate,
        expectedCheckInDate,
        checkInDate
      });

      await hardware.save();
      res.json(hardware);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//@route  PUT api/hardware/edit/:id
//@desc   hardware
//@access Authenticated(admin only)

router.put(
  '/edit/:id',
  [
    authAdmin,
    [
      check('name', 'Įrašykite pavadinimą').not().isEmpty(),
      check('serialNumber', 'Įrašykite serijinį numerį').not().isEmpty(),
      check('model', 'Įrašykite modelį').not().isEmpty(),
      check('category', 'Įrašykite katogeriją').not().isEmpty(),
      check('status', 'Nurodykite statusą').not().isEmpty()
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
        {
          delete hardwareFields.assignedTo;
        }
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
      hardwareFields.assignedTo = assignedTo;
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
    await Hardware.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'assignedTo',
          foreignField: '_id',
          as: 'hardwares'
        }
      },
      { $unwind: { path: '$hardwares', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          name: 1,
          serialNumber: 1,
          model: 1,
          manufacturer: 1,
          category: 1,
          status: 1,
          assigned: 1,
          assignedTo: '$hardwares.email',
          cost: 1,
          supplier: 1,
          date: 1,
          expectedCheckInDate: 1,
          checkOutDate: 1,
          checkInDate: 1,
          comments: 1
        }
      }
    ]).then((hardwares) => res.json(hardwares));
    // const hardwarelist = await Hardware.find();
    //console.log(hardwares);
  } catch (err) {
    console.error(err.message);
    res.status(500).status('Server Error');
  }
});

//@route  GET api/hardware/single/:id
//@desc   Get hardware by id
//@access Authenticated(admin only)

//$match: { _id: ObjectId('560c24b853b558856ef193a3') }

router.get('/single/:id', authAdmin, async (req, res) => {
  try {
    const hardware = await Hardware.findById(req.params.id);
    var ObjectID = require('mongodb').ObjectID;
    await Hardware.aggregate([
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
          as: 'hardwares'
        }
      },
      { $unwind: { path: '$hardwares', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          name: 1,
          serialNumber: 1,
          model: 1,
          manufacturer: 1,
          category: 1,
          status: 1,
          assigned: 1,
          assignedTo: '$hardwares.email',
          cost: 1,
          supplier: 1,
          date: 1,
          location: 1,
          expectedCheckInDate: 1,
          checkOutDate: 1,
          checkInDate: 1,
          comments: 1
        }
      }
    ]).then((hardware) => res.json(hardware));
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Įranga nerasta' });
    }
    res.status(500).send('Server XD Error');
  }
});

//@route  DELETE api/hardware/:id
//@desc   Delete hardware entry
//@access admin only

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

//@route  POST api/hardware/comment/:id
//@desc   Add hardware note
//@access admin only

router.post(
  '/comment/:id',
  authAdmin,
  check('text', 'Įrašykite įrangos pastabą').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const hardware = await Hardware.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        firstname: user.firstname,
        lastname: user.lastname,
        title: user.title,
        avatar: user.avatar,
        user: req.user.id
      };

      hardware.comments.unshift(newComment); //komentarai nuo viršau į apačią makes sense

      await hardware.save();

      res.json(hardware.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/hardware/comment/:id/:comment_id
// @desc     Delete comment
// @access   Authenticated (admin only)
router.delete('/comment/:id/:comment_id', authAdmin, async (req, res) => {
  try {
    const hardware = await Hardware.findById(req.params.id);

    const comment = hardware.comments.find(
      (comment) => comment.id === req.params.comment_id //search komentaro pagal id iš url
    );
    if (!comment) {
      return res.status(404).json({ msg: 'Pastabos nėra' });
    }

    hardware.comments = hardware.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await hardware.save();

    return res.json(hardware.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route    GET api/hardware/:id
// @desc     Get hardware assigned to user by id
// @access   Authenticated (user/admin)

router.get('/:id', authUser, async (req, res) => {
  try {
    //const user = await User.findById(req.user.id).select('-password');
    const hardwares = await Hardware.find({ assignedTo: req.user.id })
      .sort({
        date: -1
      })
      .lean();

    if (!hardwares) {
      return res.status(404).json({ msg: 'Priskirtos įrangos nerasta' });
    }
    res.json(hardwares);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Priskirtos įrangos nerasta' });
    }
    res.status(500).send('Server Error');
  }
});

//checkout route'as
// @route    PUT api/hardware/:id/checkout/
// @desc     Checkout
// @access   Authenticated (admin only)
router.put(
  '/:id/checkout/',
  [
    authAdmin,
    [
      (check('assignedTo', 'Privaloma nurodyti').not().isEmpty(),
      check('checkOutDate', 'Nurodykite datą').not().isEmpty())
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        status,
        assigned,
        assignedTo,
        checkOutDate,
        expectedCheckInDate
      } = req.body;

      const hardwareFields = {};
      hardwareFields.status = 'Priskirtas';
      hardwareFields.assigned = true;
      hardwareFields.assignedTo = assignedTo;
      hardwareFields.checkOutDate = checkOutDate;
      hardwareFields.expectedCheckInDate = expectedCheckInDate;

      const usercheck = await User.findById(assignedTo);

      let hardware = await Hardware.findOne({
        _id: req.params.id
      });
      if (hardware) {
        const notification = `
    <h1>ITVS administratorius jums priskyrė IT turtą</h1>
    <p> Jums yra priskirtas: ${hardware.name} pavadinimas, ${hardware.manufacturer} ${hardware.model} modelio aparatinė įranga </p>
    <p> Prašome jūsų, sistemoje, pranešimų skiltyje, suderinti su administratoriumi įrangos atsiėmimo laiką</p>
    `;

        hardware = await Hardware.findByIdAndUpdate(
          { _id: req.params.id },
          { $set: hardwareFields },
          { new: true }
        );
        try {
          await sendEmail({
            to: usercheck.email,
            subject: 'ITVS jums priskirtas turtas',
            text: notification
          });

          res.status(200).json;
        } catch (error) {
          console.error(err.message);
          res.status(500).send('Siuntimo klaida');
        }
        logger.TurtoPriskyrimas(
          `Priskirtas turtas ${hardware.name} naudotojui: ${usercheck.email}`
        );
        return res.json(hardware);
      }

      hardware = new Hardware(hardwareFields);
      await hardware.save();

      res.json(hardware);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//checkin route
// @route    PUT api/hardware/:id/checkin/
// @desc     Checkin
// @access   Authenticated (admin only)

router.put(
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
      const {
        status,
        assigned,
        assignedTo,
        checkInDate,
        expectedCheckInDate,
        checkOutDate
      } = req.body;
      const hardwareFields = {};
      hardwareFields.status = req.body.status;
      hardwareFields.assigned = false;
      hardwareFields.assignedTo = null;
      hardwareFields.checkInDate = currentDate;
      hardwareFields.expectedCheckInDate = '';
      hardwareFields.checkOutDate = '';

      let hardware = await Hardware.findOne({
        _id: req.params.id
      });
      if (hardware) {
        const notification = `
        <h1>ITVS administratorius iš jūsų atsiėmė IT turtą</h1>
        <p> Jums buvo priskirtas: ${hardware.name} pavadinimo, ${hardware.manufacturer} ${hardware.model} modelio aparatinė įranga. IT administratorius šią įrangą nuo jūsų atsiėmė. </p>
        <p> Prašome jūsų, sistemoje, pranešimų skiltyje, suderinti su administratoriumi įrangos grąžinimą</p>
        `;
        usercheck = await User.findById(hardware.assignedTo);
        hardware = await Hardware.findByIdAndUpdate(
          { _id: req.params.id },
          { $set: hardwareFields },
          { new: true }
        );
        try {
          await sendEmail({
            to: usercheck.email,
            subject: 'ITVS iš jūsų atsiimtas turtas',
            text: notification
          });

          res.status(200).json;
        } catch (error) {
          console.error(err.message);
          res.status(500).send('Siuntimo klaida');
        }
        logger.TurtoAtsiėmimas(
          `Turtas ${hardware.name} atsiimtas iš naudotojo: ${usercheck.email}`
        );
        return res.json(hardware);
      }

      hardware = new Hardware(hardwareFields);

      await hardware.save();
      logger.log('info', `Atsiimtas turtas naudotojui: asd`);
      res.json(hardware);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
