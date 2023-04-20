export enum TraverseDirection {
  Forward,
  Reverse,
}

export enum ModeOfTransport {
  Driving = "driving",
  Bicycle = "bicycling",
  Walk = "walking",
  Transit = "transit",
}
export enum TransitMode {
  Bus = "bus",
  Subway = "subway",
  Train = "train",
  Tram = "tram",
  Rail = "rail",
}

export enum DestinationSearchStateKeys {
  FROM_DESTINATION_PREDICTION = "fromDestinationPrediction",
  TO_DESTINATION_PREDICTION = "toDestinationPrediction",
}

export interface DestinationSearchState {
  [DestinationSearchStateKeys.FROM_DESTINATION_PREDICTION]: Prediction | null;
  [DestinationSearchStateKeys.TO_DESTINATION_PREDICTION]: Prediction | null;
}

export enum PredictionStatus {
  OK = "OK",
  ZERO_RESULTS = "ZERO_RESULTS",
  OVER_QUERY_LIMIT = "OVER_QUERY_LIMIT",
  REQUEST_DENIED = "REQUEST_DENIED",
  INVALID_REQUEST = "INVALID_REQUEST",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

export interface Prediction {
  description: string;
  matched_substrings: { length: number; offset: number }[];
  place_id?: string;
  reference?: string;
  distance_metres?: number;
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: { length: number; offset: number }[];
    secondary_text?: string;
    secondary_text_matched_substrings?: { length: number; offset: number }[];
  };
  terms: { offset: number; value: string }[];
  types?: string[];
}

export interface LocationSearchResponse {
  predictions: Prediction[];
  status: PredictionStatus;
  error_message?: string;
  info_messages?: string[];
}

// DirectionsResponse

type TRAVEL_MODE = "DRIVING" | "WALKING" | "BICYCLING" | "TRANSIT";

export type VEHICLE_TYPE = "BUS" | "TRAM" | "HEAVY_RAIL";

type Coordinate = {
  lat: number;
  lng: number;
};

type Time = {
  text: string;
  time_zone: string;
  value: number;
};

type DistanceDuration = {
  text: string;
  value: number;
};

type Stop = {
  location: Coordinate;
  name: string;
};

interface TransitDetails {
  arrival_stop: Stop;
  arrival_time: Time;
  departure_stop: Stop;
  departure_time: Time;
  headsign: string;
  line: {
    agencies: {
      name: string;
      phone?: string;
      url: string;
    }[];
    color: string;
    name?: string;
    short_name?: string;
    text_color?: string;
    vehicle: {
      icon: string;
      name: string;
      type: VEHICLE_TYPE;
    };
  };
  num_stops: number;
}

interface Polyline {
  points: string;
}
interface BaseStep {
  distance: DistanceDuration;
  duration: DistanceDuration;
  end_location: Coordinate;
  html_instructions?: string;
  polyline?: Polyline;
  start_location: Coordinate;
  maneuver?: string;
  steps?: BaseStep[];
  travel_mode: TRAVEL_MODE;
}

export interface TransitStep extends BaseStep {
  travel_mode: "TRANSIT";
  transit_details: TransitDetails;
}

interface OtherStep extends BaseStep {
  travel_mode: Exclude<TRAVEL_MODE, "TRANSIT">;
}

export type Step = TransitStep | OtherStep;

export interface Leg {
  arrival_time?: Time;
  departure_time?: Time;
  distance: DistanceDuration;
  duration: DistanceDuration;
  end_address: string;
  end_location: Coordinate;
  start_address: string;
  start_location: Coordinate;
  steps: Step[];
  traffic_speed_entry: Coordinate[];
  via_waypoint: Coordinate[];
}

export interface DirectionsResponse {
  bounds: {
    northeast: Coordinate;
    southwest: Coordinate;
  };
  copyrights: string;
  legs: Leg[];
  overview_polyline: Polyline;
  summary: string;
  warnings: string[];
  waypoint_order: number[];
}
