import { Marker } from "@react-google-maps/api";
import { marker } from "assets";
import { useTips } from "hooks";
import { Tip } from "types";

type MarkerProps = {
  tip: Tip;
};

export const TipMarker: React.FC<MarkerProps> = ({ tip }) => {
  const { selectedTip, setSelectedTip, setSelectedCategory } = useTips();
  const onClickMarker = (tip: Tip) => {
    setSelectedTip(tip);
    setSelectedCategory(tip.kind);
  };

  const scaledSize = new google.maps.Size(48, 48);
  return (
    <Marker
      position={tip.geometry}
      icon={{ url: marker[tip.kind], scaledSize }}
      onClick={() => onClickMarker(tip)}
      animation={tip.name === selectedTip?.name ? google.maps.Animation.BOUNCE : undefined}
    />
  );
};
