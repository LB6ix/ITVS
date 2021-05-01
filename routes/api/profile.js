const express = require('express');
const router = express.Router();
const { authUser, authAdmin } = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Posts = require('../../models/Posts');

//@route  GET api/profile/me
//@desc   Get current user profile
//@access Private
router.get('/me', authUser, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['firstname', 'lastname', 'email', 'title', 'avatar']);

    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'Nėra sukurto profilio šiam naudotojui' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  POST api/profile
//@desc   Create/Update user profile
//@access Private

router.post(
  '/',
  [
    authUser,
    [
      check('location', 'Darbo vietą privaloma nurodyti').not().isEmpty(),
      check('phoneNumber', 'Nurodykite darbinį telefoną').isMobilePhone(
        'lt-LT'
      ),
      check('title', 'Nurodykite savo dabartines pareigas').not().isEmpty(),
      check('department', 'Nurodykite savo dabartinį skyrių')
        .not()
        .isEmpty() /*{
        options: { locale: 'lt-LT' },
        errorMessage: 'Privalote nurodyti tinkamą, lietuvišką telefono numerį.',
      }),*/
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { phoneNumber, company, location, title, department } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (phoneNumber) profileFields.phoneNumber = phoneNumber;
    if (title) profileFields.title = title;
    if (department) profileFields.department = department;
    if (company) profileFields.company = company;
    if (location) profileFields.location = location;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//@route  GET api/profile
//@desc   Get all prof
//@access Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', [
      'firstname',
      'lastname',
      'email',
      'title',
      'avatar'
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).status('Server Error');
  }
});

//@route  GET api/profile/:user_id //
//@desc   Get prof by user id
//@access Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['firstname', 'lastname', 'email', 'title', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profilis nerastas' });
    }
    res.status(500).status('Server Error');
  }
});

// router.get('/user/:user_id', async (req, res) => {
//   try {
//     const profile = await Profile.findOne({
//       user: req.params.user_id
//     }).populate('user', ['firstname', 'lastname', 'email', 'title', 'avatar']);

//     if (!profile) return res.status(400).json({ msg: 'Profilis nerastas' });
//     res.json(profile);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind == 'ObjectId') {
//       return res.status(400).json({ msg: 'Profilis nerastas' });
//     }
//     res.status(500).status('Server Error');
//   }
// });

//@route  DELETE api/profile/id
//@desc   Delete profile, user, posts
//@access Private

router.delete('/:id', [authUser, authAdmin], async (req, res) => {
  try {
    await Post.deleteMany({ user: req.params.id });
    await Profile.findOneAndRemove({ user: req.params.id });
    await User.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Naudotojas pašalintas' });
  } catch (err) {
    console.error(err.message);
    res.status(500).status('Server Error');
  }
});

module.exports = router;
