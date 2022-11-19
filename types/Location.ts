
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

export type LocationKind = 'Landmark' | 'Restaurant' | 'POI' | 'Venue';

export type LocationType = {
    typeName: string
    typeValue: string
}

export interface Location {
    name: string
    kind: LocationKind
    description: string
    geometry: google.maps.LatLngAltitudeLiteral
    type?: LocationType
    openingHours?: OpeningHours
    placeId?: string
    mapsUrl: string
    website?: string
}
