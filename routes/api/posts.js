const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { authUser, authAdmin } = require('../../middleware/auth');

const User = require('../../models/User');
const Post = require('../../models/Posts');
const Profile = require('../../models/Profile');

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

router.get('/:id', [authUser], async (req, res) => {
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

//@route  GET api/posts/userposts/:id
//@desc   Get all users posts by user ID
//@access Authenticated (user/admin)

router.get('/userposts/:id', [authUser], async (req, res) => {
  try {
    //const user = await User.findById(req.user.id).select('-password');
    const posts = await Post.find({ user: req.user.id })
      .sort({
        date: -1
      })
      .lean();

    if (!posts) {
      return res.status(404).json({ msg: 'Prašymų nerasta' });
    }
    res.json(posts);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Prašymų nerasta' });
    }
    res.status(500).send('Server Error');
  }
});

//@routas  DELETE api/posts/:id
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

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Authenticated(user/admin)

router.post(
  '/comment/:id',
  authUser,
  check('text', 'Įrašykite prašymo pastabą').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        firstname: user.firstname,
        lastname: user.lastname,
        title: user.title,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment); //komentarai nuo viršau į apačią makes sense

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Authenticated (admin only)
router.delete('/comment/:id/:comment_id', authAdmin, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id //search komentaro pagal id iš url
    );
    if (!comment) {
      return res.status(404).json({ msg: 'Pastabos nėra' });
    }

    if (req.user.role === 'admin') {
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Neautorizuotas veiksmas' });
      }
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
