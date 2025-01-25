"use client";

import { Tip } from "@/models";
import { Marker as _Marker } from "react-leaflet";
import { Icon, PointExpression } from "leaflet";

type MarkerProps = {
  tip: Tip;
  onClick?: () => void;
  selected?: boolean;
};

export const Marker = ({ tip, onClick, selected }: MarkerProps) => {
  const iconSize: PointExpression = selected ? [48, 48] : [32, 32];
  return (
    <_Marker
      position={[tip.geometry.lat, tip.geometry.lng]}
      icon={
        new Icon({
          iconUrl: `../../../${tip.kind.toLowerCase()}Marker.svg`,
          iconSize,
          iconAnchor: [16, 32],
        })
      }
      eventHandlers={{ click: onClick }}
    />
  );
};
