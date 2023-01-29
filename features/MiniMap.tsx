import { useLoadScript, Marker as _Marker, GoogleMap, InfoWindow as _InfoWindow } from "@react-google-maps/api";
import React, { useEffect, useMemo, useState } from "react";
import { Location } from "types";

type MiniMapProps = {
  location: Location;
};

export function MiniMap({ location }: MiniMapProps) {
  const [setMarker, setSetMarker] = useState(false);
  const center = useMemo(() => location.geometry, []);
  const zoom = useMemo(() => 13, []);
  const styles = useMemo(
    () => [
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
      },
    ],
    []
  );

  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      gestureHandling: 'none',
      styles,
    }),
    []
  );
 
  useEffect(() => {
    setTimeout(()=> setSetMarker(true), 200)
  }, [])
  

  type MarkerProps = {
    location: Location;
  };

  const Marker: React.FC<MarkerProps> = ({ location }) => {
    const iconMap = {
      Venue: "icons/bar.svg",
      Restaurant: "icons/restaurant.svg",
      POI: "icons/studio.png",
      Landmark: "icons/bar.png",
    };
    const scaledSize = new google.maps.Size(48, 48);
    return (
      <_Marker
        position={location.geometry}
        icon={{ url: iconMap[location.kind], scaledSize }}
      />
    );
  };
  return (
    <GoogleMap zoom={zoom} center={center} options={options} mapContainerClassName="w-full h-60 block sm:hidden">
      {setMarker && <Marker location={location} />}
    </GoogleMap>
  );
}
