import { useLoadScript, Marker as _Marker, GoogleMap, InfoWindow as _InfoWindow } from "@react-google-maps/api";
import { useLocation } from "hooks";
import { useMemo } from "react";
import { Location } from "types";

export function Map() {
    const { locations, setSelectedLocation } = useLocation();
    const center = useMemo(() => ({ lat: 39.468, lng: -0.359 }), []);
    const styles = useMemo(() => ([
        {
            featureType: "poi",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
        },
        {
            featureType: "transit",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
        },
        {
            featureType: "road",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
        }
    ]
    ), []);

    const options = useMemo(() => ({
        disableDefaultUI: true,
        clickableIcons: false,
        styles
    }), []);

    type MarkerProps = {
        location: Location
    }
    const Marker: React.FC<MarkerProps> = ({ location }) => {
        const iconMap = {
            "Venue": 'icons/bar.png',
            "Restaurant": 'icons/restaurant.png',
            "POI": 'icons/studio.png',
            "Landmark": 'icons/bar.png'
        }
        const scaledSize = new google.maps.Size(48, 48);
        return <_Marker position={location.geometry} icon={{ url: iconMap[location.kind], scaledSize }} onClick={() => setSelectedLocation(location)} />

    }
    return (
        <GoogleMap zoom={14.9} center={center} options={options} mapContainerClassName="w-full h-screen">
            {locations && locations.map((location: Location) => <Marker location={location} />)}
            <InfoWindow />
        </GoogleMap>
    );
}

const InfoWindow = () => {
    const {selectedLocation, setSelectedLocation} = useLocation();
    if (!selectedLocation) return <></>    
    return <_InfoWindow position={selectedLocation.geometry} onCloseClick={()=>setSelectedLocation(undefined)}>
        <div>
            <h1>{selectedLocation.name}</h1>
            {selectedLocation.description}
        </div>
    </_InfoWindow>
}
