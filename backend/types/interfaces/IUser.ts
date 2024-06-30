import { Types } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  image: string;
  places: Types.ObjectId[];
}
