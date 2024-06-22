import { LatLngExpression } from "leaflet";

export type OpeningHoursPeriodDetail = {
  day: number;
  time: string;
};

export type OpeningHoursPeriod = {
  open: OpeningHoursPeriodDetail;
  close: OpeningHoursPeriodDetail;
};

export type OpeningHours = {
  open_now: boolean;
  periods: OpeningHoursPeriod[];
  weekday_text: string[];
};

export type TipKind =
  | "Landmark"
  | "Restaurant"
  | "Sightseeing"
  | "Nightlife"
  | "Snacks"
  | "Coffee"
  | "Market";

export type TipType = { [key: string]: string };

export interface Tip {
  _id: string;
  name: string;
  kind: TipKind;
  listId: string;
  description: string;
  tags: string[];
  geometry: { lat: number; lng: number };
  type?: TipType;
  openingHours?: OpeningHours;
  placeId?: string;
  mapsUrl: string;
  website?: string;
}
