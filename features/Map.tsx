import { useLoadScript, Marker as _Marker, GoogleMap, InfoWindow as _InfoWindow } from "@react-google-maps/api";
import { useTips } from "hooks";
import { useMemo } from "react";
import { Tip } from "types";



export function Map() {
  const { tips, selectedTip, setSelectedTip, setSelectedCategory } = useTips();
  const center = useMemo(() => selectedTip?.geometry || { lat: 39.468, lng: -0.359 }, [selectedTip]);
  const zoom = useMemo(() => (selectedTip ? 16 : 14.9), [selectedTip]);
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
      styles,
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
    const markerMap = {
      Nightlife: "icons/nightlifeMarker.svg",
      Restaurant: "icons/restaurantMarker.svg",
      Sightseeing: "icons/sightseeingMarker.svg",
      Landmark: "icons/landmarkMarker.png",
      Coffee: "icons/restaurantMarker.svg",
      Snacks: "icons/restaurantMarker.svg",
      Market: "icons/restaurantMarker.svg"
    };
    const scaledSize = new google.maps.Size(32, 32);
    return (
      <_Marker
        position={tip.geometry}
        icon={{ url: markerMap[tip.kind], scaledSize }}
        onClick={() => onClickMarker(tip)}
        animation={tip.name === selectedTip?.name ? google.maps.Animation.BOUNCE : undefined}
      />
    );
  };
  return (
    <GoogleMap zoom={zoom} center={center} options={options} mapContainerClassName="w-full h-screen hidden sm:block">
      {tips && tips.map((tip: Tip) => <Marker tip={tip} />)}
    </GoogleMap>
  );
}
