export interface ICoordinates {
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

export interface GeoCodeResponse {
  results: IGeoCodeResult[];
  status: string;
  error_message?: string;
}
