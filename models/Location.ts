import { Document, Model, model, Schema } from "mongoose";

type OpeningHoursPeriodDetail = {
    day: number
    time: string
}

type OpeningHoursPeriod = {
    open: OpeningHoursPeriodDetail
    close: OpeningHoursPeriodDetail
}

type OpeningHours = {
    open_now: boolean
    periods: OpeningHoursPeriod[]
    weekday_text: string[]
}

type LocationType = 'Landmark' | 'Restaurant' | 'POI' | 'Venue'

interface ILocation extends Document {
    name: String
    type: LocationType
    description: String
    geometry: google.maps.LatLngAltitudeLiteral
    openingHours: OpeningHours
    placeId: String
    mapsUrl: String
    website: String
}

const LocationSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, requires: true },
    description: { type: String, required: true },
    geometry: { type: Object, required: true },
    openingHours: { type: Object, required: false },
    placeId: { type: String, required: false },
    mapsUrl: { type: String, required: true },
    website: { type: String, required: false }
});

//@ts-ignore
const Location: Model<ILocation> = model("Location", LocationSchema);
export default Location;
