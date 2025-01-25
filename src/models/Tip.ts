import { ObjectId } from "mongodb";

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

export type TipKind = "Landmark" | "Restaurant" | "Sightseeing" | "Nightlife" | "Snacks" | "Coffee" | "Market";

export type TipType = { [key: string]: string };

export interface Tip {
  _id?: ObjectId;
  name: string;
  kind: TipKind;
  description: string;
  tags: string[];
  geometry: { lat: number; lng: number };
  type?: TipType;
  openingHours?: OpeningHours;
  placeId?: string;
  mapsUrl: string;
  website?: string;
}
