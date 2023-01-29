import { useLoadScript, Marker as _Marker, GoogleMap, InfoWindow as _InfoWindow } from "@react-google-maps/api";
import { useLocation } from "hooks";
import { useMemo } from "react";
import { Location } from "types";



export function Map() {
  const { locations, selectedLocation, setSelectedLocation, setSelectedCategory } = useLocation();
  const center = useMemo(() => selectedLocation?.geometry || { lat: 39.468, lng: -0.359 }, [selectedLocation]);
  const zoom = useMemo(() => (selectedLocation ? 16 : 14.9), [selectedLocation]);
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
    location: Location;
  };

  const onClickMarker = (location: Location) => {
    setSelectedLocation(location);
    setSelectedCategory(location.kind);
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
        onClick={() => onClickMarker(location)}
        animation={location.name === selectedLocation?.name ? google.maps.Animation.BOUNCE : undefined}
      />
    );
  };
  return (
    <GoogleMap zoom={zoom} center={center} options={options} mapContainerClassName="w-full h-screen hidden sm:block">
      {locations && locations.map((location: Location) => <Marker location={location} />)}
    </GoogleMap>
  );
}
