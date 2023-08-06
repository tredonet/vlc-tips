import { Marker as _Marker } from "@react-google-maps/api";
import { marker } from "assets";
import { useTips } from "hooks";
import { Tip } from "types";

type MarkerProps = {
  tip: Tip;
  onClick?: () => void;
};

export const Marker: React.FC<MarkerProps> = ({ tip, onClick }) => {
  const { selectedTip } = useTips();
  const scaledSize = new google.maps.Size(48, 48);
  return (
    <_Marker
      position={tip.geometry}
      icon={{ url: marker[tip.kind], scaledSize }}
      onClick={onClick}
      animation={!!onClick && tip.name === selectedTip?.name ? google.maps.Animation.BOUNCE : undefined}
    />
  );
};
