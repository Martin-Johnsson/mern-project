import { Schema, model } from 'mongoose';

import { IPlace } from '../types/interfaces/IPlace';

const placeSchema = new Schema<IPlace>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  creator: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
});

module.exports = model('Place', placeSchema);
