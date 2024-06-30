import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const placesRoutes = require('./routes/placesRoutes');
const usersRoutes = require('./routes/usersRoutes');
const HttpError = require('./models/http-error');
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api/places', placesRoutes);

app.use('/api/users', usersRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error: typeof HttpError = new HttpError(
    'Could not find this route.',
    404
  );
  throw error;
});

app.use(
  (
    error: typeof HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (req.file) {
      fs.unlink(req.file.path, (err: typeof HttpError) => {
        console.log(err);
      });
    }
    if (res.headersSent) {
      return next(error);
    }

    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred.' });
  }
);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.idy5j0i.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(3000);
  })
  .catch((err: typeof HttpError) => {
    console.error(err);
  });
