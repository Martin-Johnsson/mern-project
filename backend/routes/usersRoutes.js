const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const usersController = require('../controllers/users-controllers');
router.get('/', usersController.getUsers);

// router.get('/:userId', (req, res, next) => {
//   const userId = req.params.userId;

//   const user = DUMMY_USERS.find((user) => user.id === userId);

//   res.json({ user });
// });
router.post(
  '/signup',
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength(8),
  ],
  usersController.createUser
);

router.post('/login', usersController.loginUser);

module.exports = router;
