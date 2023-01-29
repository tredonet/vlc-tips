import mongoose, { Document, model, Schema } from "mongoose";
import { Location as _Location } from "types";

interface ILocation extends _Location, Document {}

const LocationSchema = new Schema({
  name: { type: String, required: true },
  kind: { type: String, requires: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  geometry: {
    type: { altitude: Number, lat: Number, lng: Number },
    required: true,
  },
  type: { type: Object, required: false },
  openingHours: { type: Object, required: false },
  placeId: { type: String, required: false },
  mapsUrl: { type: String, required: true },
  website: { type: String, required: false },
});

const Location = mongoose.models.Location || model<ILocation>("Location", LocationSchema);
export default Location;
