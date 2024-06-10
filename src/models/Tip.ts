import mongoose, { model, Schema } from "mongoose";
import { Tip as _Tip } from "@/types";

interface ITip extends _Tip {}

const TipSchema = new Schema({
  _id: { type: String, required: false },
  name: { type: String, required: true },
  listId: { type: String, required: true },
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

export const Tip = mongoose.models.Tip || model<ITip>("Tip", TipSchema);
