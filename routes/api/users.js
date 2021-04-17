const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

const User = require('../../models/User');
const auth = require('../../middleware/auth');

//@route  POST api/users
//@desc   User registracija
//@access rivate

router.post(
  '/',
  [
    // auth,
    // [
    check('firstname', 'Įrašykite vardą').not().isEmpty(),
    check('lastname', 'Įrašykite pavardę').not().isEmpty(),
    check('email', 'Įrašykite tinkamą elektroninį paštą').isEmail(),
    check('role', 'Nurodykite rolę').not().isEmpty(),
    check(
      'password',
      'Įrašykite vienkartinį slaptažodį, ne trumpesnį nei 6 simbolių'
    ).isLength({ min: 6 }),
    // ],
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
        d: 'mm',
      });

      user = new User({
        firstname,
        lastname,
        email,
        role,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res.json(user);

      // const payload = {
      //   user: {
      //     id: user.id,
      //   },
      // };

      // jwt.sign(
      //   payload,
      //   config.get('jwtSecret'),
      //   { expiresIn: 360000 },
      //   (err, token) => {
      //     if (err) throw err;
      //     res.json({ token });
      //   }
      // );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
