"use client";
import { Marker as _Marker } from "@react-google-maps/api";
import { marker } from "@/assets";
import { Tip } from "@/types";

type MarkerProps = {
  tip: Tip;
  onClick?: () => void;
  selected?: boolean;
};

export const Marker: React.FC<MarkerProps> = ({ tip, onClick, selected = false }) => {
  const scaledSize = new google.maps.Size(48, 48);
  return (
    <_Marker
      position={tip.geometry}
      icon={{ url: marker[tip.kind], scaledSize }}
      onClick={onClick}
      animation={!!onClick && selected ? google.maps.Animation.BOUNCE : undefined}
    />
  );
};
