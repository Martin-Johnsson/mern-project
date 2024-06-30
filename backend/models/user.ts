import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { IUser } from '../types/interfaces/IUser';

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 8 },
  image: { type: String, required: true },
  places: [{ type: Schema.Types.ObjectId, required: true, ref: 'Place' }],
});

userSchema.plugin(uniqueValidator);

module.exports = model('User', userSchema);
