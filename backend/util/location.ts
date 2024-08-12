import axios, { AxiosResponse } from 'axios';

import { GeoCodeResponse, ICoordinates } from '../types/interfaces/IUpload';

const API_KEY: string | undefined = process.env.GOOGLE_API_KEY;

const HttpError = require('../models/http-error');

async function getCoordsForAddress(address: string) {
  const response: AxiosResponse<GeoCodeResponse> = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data: GeoCodeResponse = response.data;

  if (!data || data.status === 'ZERO_RESULTS') {
    const error = new HttpError(
      'Could not location for the specified address.',
      422
    );
    throw error;
  }

  const coordinates: ICoordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordsForAddress;
