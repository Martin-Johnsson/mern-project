const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Martin Johnsson',
    email: 'test@live.se',
    password: 'supersecretpassword',
    image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
    places: 3,
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json({ users: DUMMY_USERS });
};

const createUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((user) => user.email === email);

  if (hasUser) {
    throw new HttpError('Could not create user, email already exists.', 422);
  }

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
    image: '',
    places: 0,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(
    (user) => user.email === email && user.password === password
  );

  if (!identifiedUser) {
    throw new Error(
      'Could not identiy user, credentials seem to be wrong.',
      401
    );
  }

  res.status(200).json({ User: identifiedUser });
};

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.loginUser = loginUser;
