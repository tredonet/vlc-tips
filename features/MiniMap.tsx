import { useLoadScript, Marker as _Marker, GoogleMap, InfoWindow as _InfoWindow } from "@react-google-maps/api";
import React, { useEffect, useMemo, useState } from "react";
import { Tip } from "types";

type MiniMapProps = {
  tip: Tip;
};

export function MiniMap({ tip }: MiniMapProps) {
  const [setMarker, setSetMarker] = useState(false);
  const center = useMemo(() => tip.geometry, []);
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
    tip: Tip;
  };

  const Marker: React.FC<MarkerProps> = ({ tip }) => {
    const iconMap = {
      Nightlife: "icons/bar.svg",
      Restaurant: "icons/restaurant.svg",
      POI: "icons/camera.svg",
      Landmark: "icons/bar.png",
      Coffee: "icons/camera.svg",
      Snacks: "icons/camera.svg",
      Market: "icons/camera.svg"
    };
    const scaledSize = new google.maps.Size(48, 48);
    return (
      <_Marker
        position={tip.geometry}
        icon={{ url: iconMap[tip.kind], scaledSize }}
      />
    );
  };
  return (
    <GoogleMap zoom={zoom} center={center} options={options} mapContainerClassName="w-full h-60 block sm:hidden">
      {setMarker && <Marker tip={tip} />}
    </GoogleMap>
  );
}
