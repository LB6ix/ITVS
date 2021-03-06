const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const logger = require('../api/logger');
const sendEmail = require('../../utility/sendEmail');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const { authAdmin } = require('../../middleware/auth');

//@route  POST api/users
//@desc   User registracija
//@access Admin only

router.post(
  '/',
  [
    authAdmin,
    [
      check('firstname', 'Įrašykite vardą').not().isEmpty(),
      check('lastname', 'Įrašykite pavardę').not().isEmpty(),
      check('email', 'Įrašykite tinkamą elektroninį paštą').isEmail(),
      check('role', 'Nurodykite rolę').not().isEmpty(),
      check(
        'password',
        'Įrašykite vienkartinį slaptažodį, ne trumpesnį nei 6 simbolių'
      ).isLength({ min: 6 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, role, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Naudotojas jau egzistuoja' }] });
      }

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      user = new User({
        firstname,
        lastname,
        email,
        role,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      const loginNuoroda = `http://localhost:3000/user-login`;

      const notification = `
      <h1>ITVS administratorius jums sukūrė paskyrą</h1>
      <p> ITVS administratorius jums sukūrė paskyrą IT turto valdymo sistemoje. </p>
      <p> Prašome jūsų, prisijungus prie sistemos, kuo greičiau susikurti profilį</p>
      <p> Prisijungimo nuoroda: ${loginNuoroda} </p>
      `;

      try {
        await sendEmail({
          to: user.email,
          subject: 'ITVS jums sukurta paskyra',
          text: notification
        });

        res.status(200).send('Message sent');
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Siuntimo klaida');
      }

      await user.save();
      logger.NaudotojoSukūrimas(
        `Sukurtas naujas naudotojas: ${req.body.email}`
      );
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/', authAdmin, async (req, res) => {
  try {
    const users = await User.find().populate('user', ['email']);
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).status('Server Error');
  }
});

module.exports = router;
