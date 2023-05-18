import { Marker as _Marker, GoogleMap, InfoWindow as _InfoWindow } from "@react-google-maps/api";
import React, { useEffect, useMemo, useState } from "react";
import { Tip } from "types";
import { marker } from "assets";

type MiniMapProps = {
  tip: Tip;
};

export function MiniMap({ tip }: MiniMapProps) {
  const [setMarker, setSetMarker] = useState(false);
  const center = useMemo(() => tip.geometry, []);
  const zoom = useMemo(() => 13, []);

  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      gestureHandling: "none",
      mapId: "a9f7b214210ee54c",
    }),
    []
  );

  useEffect(() => {
    setTimeout(() => setSetMarker(true), 200);
  });

  type MarkerProps = {
    tip: Tip;
  };

  const Marker: React.FC<MarkerProps> = ({ tip }) => {
    const scaledSize = new google.maps.Size(48, 48);
    return <_Marker position={tip.geometry} icon={{ url: marker[tip.kind], scaledSize }} />;
  };
  return (
    <GoogleMap zoom={zoom} center={center} options={options} mapContainerClassName="w-full h-60 block sm:hidden">
      {setMarker && <Marker tip={tip} />}
    </GoogleMap>
  );
}
