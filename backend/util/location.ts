import axios, { AxiosResponse } from 'axios';

const API_KEY: string | undefined = process.env.GOOGLE_API_KEY;

const HttpError = require('../models/http-error');

interface ICoordinates {
  lat: number;
  lng: number;
}

interface IGeoCodeResult {
  adress_components: IAddressComponent[];
  formatted_address: string;
  geometry: IGeometry;
  place_id: string;
  plus_code: IPlusCode;
  types: string[];
}

interface IAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface IGeometry {
  location: ICoordinates;
  location_type: string;
  viewport: {
    northeast: ICoordinates;
    southwest: ICoordinates;
  };
}

interface IPlusCode {
  compound_code?: string;
  global_code: string;
}

interface GeoCodeResponse {
  results: IGeoCodeResult[];
  status: string;
  error_message?: string;
}

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
