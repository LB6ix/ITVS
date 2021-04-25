const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { authUser, authAdmin } = require('../../middleware/auth');

const User = require('../../models/User');
const Post = require('../../models/Posts');
const Profile = require('../../models/Profile');
const { route } = require('./users');

//@route  POSTT api/postst
//@desc   Create a post
//@access Private
router.post(
  '/',
  [
    authUser,
    [
      (check('text', 'Aprašymas privalomas').not().isEmpty(),
      check('category', 'Nurodykite kategoriją').not().isEmpty())
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        category: req.body.category,
        firstname: user.firstname,
        lastname: user.lastname,
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  GET api/posts
//@desc   Get all posts
//@access Private

router.get('/', [authUser, authAdmin], async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  GET api/posts/:id
//@desc   post by ID
//@access Private

router.get('/:id', [authUser, authAdmin], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Prašymas nerastas' });
    }
    res.json(post);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Prašymas nerastas' });
    }
    res.status(500).send('Server Error');
  }
});

//@route  DELETE api/posts/:id
//@desc   Delete a post
//@access Private

router.delete('/:id', [authUser, authAdmin], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Prašymas nerastas' });
    }

    //check user
    // todo - admin delete
    if (req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    //} else if (req.user.role === 'admin') {
    await post.remove();
    //}
    res.json({ msg: 'Prašymas ištrintas' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Prašymas nerastas' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
