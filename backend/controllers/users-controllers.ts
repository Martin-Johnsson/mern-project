import { NextFunction, Request, Response } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';
import { Document } from 'mongoose';

import HttpError from '../models/http-error';
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

interface IUser extends Document {
  name: string;
  email: string;
  image: string;
  password: string;
  places: [];
}

interface IToken {
  userId: string;
  email: string;
}

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let users: [] | IUser[];

  try {
    users = await User.find({}, '-password');
  } catch (err: unknown) {
    const error: Error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }

  res.json({
    users: users.map((user: any) => user.toObject({ getters: true })),
  });
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { name, email, password } = req.body;

  let existingUser: null | IUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err: unknown) {
    const error: Error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error: Error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }

  let hashedPassword: null | string;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err: unknown) {
    const error: Error = new HttpError(
      'Could not create user, please try again.',
      500
    );
    return next(error);
  }
  const createdUser: IUser = new User({
    name,
    email,
    image: req.file?.path,
    password: hashedPassword,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Creating user failed, please try again.', 500);
    return next(error);
  }

  let token: null | IToken;

  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err: unknown) {
    const error: Error = new HttpError(
      'Creating user failed, please try again.',
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err: unknown) {
    const error: Error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error: Error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  let isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err: unknown) {
    const error: Error = new HttpError(
      'Could not log you in, please check your credentials and try again.',
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error: Error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  let token: string | null;

  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err: unknown) {
    const error: Error = new HttpError(
      'Logging in failed, please try again.',
      500
    );
    return next(error);
  }

  // res.status(200).json({
  //   message: 'Logged in!',
  //   user: existingUser.toObject({ getters: true }),
  // });

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};
