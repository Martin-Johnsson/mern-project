import { Types } from 'mongoose';

export interface IPlace {
  title: string;
  description: string;
  image: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  creator: Types.ObjectId;
}
