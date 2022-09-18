
export type OpeningHoursPeriodDetail = {
    day: number
    time: string
}

export type OpeningHoursPeriod = {
    open: OpeningHoursPeriodDetail
    close: OpeningHoursPeriodDetail
}

export type OpeningHours = {
    open_now: boolean
    periods: OpeningHoursPeriod[]
    weekday_text: string[]
}

export type LocationType = 'Landmark' | 'Restaurant' | 'POI' | 'Venue';

export interface Location{
    name: String
    type: LocationType
    description: String
    geometry: google.maps.LatLngAltitudeLiteral
    openingHours?: OpeningHours
    placeId?: String
    mapsUrl: String
    website?: String
}
