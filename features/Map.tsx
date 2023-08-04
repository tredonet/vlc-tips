import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { ComponentProps } from "react";

type MapProps = ComponentProps<"div"> & {
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  options?: google.maps.MapOptions;
};

export const Map: React.FC<MapProps> = ({
  center = { lat: 39.468, lng: -0.359 },
  zoom = 14.9,
  children,
  className,
  options,
}) => {
  const _options = {
    disableDefaultUI: true,
    clickableIcons: false,
    mapId: "a9f7b214210ee54c",
    ...options,
  };
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) return <>No API key</>;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <GoogleMap zoom={zoom} center={center} options={_options} mapContainerClassName={className}>
      {children}
    </GoogleMap>
  );
};
