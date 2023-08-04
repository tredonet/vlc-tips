import { Marker as _Marker } from "@react-google-maps/api";
import { marker } from "assets";
import { Tip } from "types";

type MarkerProps = {
  tip: Tip;
};

export const Marker: React.FC<MarkerProps> = ({ tip }) => {
  const scaledSize = new google.maps.Size(48, 48);
  return <_Marker position={tip.geometry} icon={{ url: marker[tip.kind], scaledSize }} />;
};
