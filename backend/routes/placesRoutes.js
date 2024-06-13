const express = require('express');
const router = express.Router();
const fileUpload = require('../middleware/file-upload');
const { check } = require('express-validator');
const placesControllers = require('../controllers/places-controllers');

router.get('/:placeId', placesControllers.getPlaceById);

router.get('/user/:userId', placesControllers.getPlacesByUserId);

router.post(
  '/',
  fileUpload.single('image'),
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').not().isEmpty(),
  ],
  placesControllers.createPlace
);

router.patch(
  '/:placeId',
  [check('title').not().isEmpty(), check('description').isLength({ min: 5 })],
  placesControllers.updatePlaceById
);

router.delete('/:placeId', placesControllers.deletePlaceById);

module.exports = router;
