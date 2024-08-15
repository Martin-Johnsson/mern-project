import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

import { v4 as uuid } from 'uuid';

const MIME_TYPE_MAP: { [key: string]: string } = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const fileUpload = multer({
  limits: { fileSize: 500000 },
  storage: multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void
    ) => {
      cb(null, 'uploads/images');
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void
    ) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid() + '.' + ext);
    },
  }),
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const isValid: boolean = !!MIME_TYPE_MAP[file.mimetype];

    let error: Error | null = isValid ? null : new Error('Invalid mime type!');

    cb(error as null, isValid);
  },
});

module.exports = fileUpload;
