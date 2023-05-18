import { Marker as _Marker, GoogleMap, InfoWindow as _InfoWindow } from "@react-google-maps/api";
import { marker } from "assets";
import { useTips } from "hooks";
import { useMemo } from "react";
import { Tip } from "types";

export function Map() {
  const { tips, selectedTip, setSelectedTip, setSelectedCategory } = useTips();
  const center = useMemo(() => selectedTip?.geometry || { lat: 39.468, lng: -0.359 }, [selectedTip]);
  const zoom = useMemo(() => (selectedTip ? 16 : 14.9), [selectedTip]);
  

  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      mapId: "a9f7b214210ee54c"
    }),
    []
  );

  type MarkerProps = {
    tip: Tip;
  };

  const onClickMarker = (tip: Tip) => {
    setSelectedTip(tip);
    setSelectedCategory(tip.kind);
  };

  const Marker: React.FC<MarkerProps> = ({ tip }) => {

    const scaledSize = new google.maps.Size(48, 48);
    return (
      <_Marker
        position={tip.geometry}
        icon={{ url: marker[tip.kind], scaledSize }}
        onClick={() => onClickMarker(tip)}
        animation={tip.name === selectedTip?.name ? google.maps.Animation.BOUNCE : undefined}
      />
    );
  };
  return (
    <GoogleMap zoom={zoom} center={center} options={options} mapContainerClassName="w-full h-screen hidden sm:block">
      {tips && tips.map((tip: Tip) => <Marker tip={tip} key={tip.name} />)}
    </GoogleMap>
  );
}
