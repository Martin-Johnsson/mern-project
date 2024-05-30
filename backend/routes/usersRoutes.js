const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users-controllers');
router.get('/', usersController.getUsers);

// router.get('/:userId', (req, res, next) => {
//   const userId = req.params.userId;

//   const user = DUMMY_USERS.find((user) => user.id === userId);

//   res.json({ user });
// });
router.post('/signup', usersController.createUser);

router.post('/login', usersController.loginUser);

module.exports = router;
