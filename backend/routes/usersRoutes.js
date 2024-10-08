const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const usersController = require('../controllers/users-controllers');
const fileUpload = require('../middleware/file-upload');

router.get('/', usersController.getUsers);

router.post(
  '/signup',
  fileUpload.single('image'),
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength(8),
  ],
  usersController.createUser
);

router.post('/login', usersController.loginUser);

module.exports = router;
