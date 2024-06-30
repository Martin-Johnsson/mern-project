/// <reference path="../types/.d.ts" />

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
const HttpError = require('../models/http-error');

module.exports = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, 'supersecret_dont_share');

    if (typeof decodedToken === 'object' && 'userId' in decodedToken) {
    req.userData = { userId: decodedToken.userId };
    next();
  } } catch (err) {
    const error = new HttpError('Authentication failed', 403);
    return next(error);
      }
}



