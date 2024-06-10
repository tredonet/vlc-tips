"use client";
import { useTip } from "@/providers";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { ComponentProps, use, useMemo } from "react";

type MapProps = ComponentProps<"div"> & {
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  options?: google.maps.MapOptions;
};

export const Map = ({ children, className, options }: MapProps) => {
  const { selectedTip } = useTip();
  const center = useMemo(
    () => selectedTip?.geometry || { lat: 39.468, lng: -0.359 },
    [selectedTip]
  );
  const zoom = useMemo(() => (selectedTip ? 16 : 14.9), [selectedTip]);
  const _options = {
    disableDefaultUI: true,
    clickableIcons: false,
    mapId: "a9f7b214210ee54c",
    ...options,
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) return <>No API key</>;
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <GoogleMap
      zoom={zoom}
      center={center}
      options={_options}
      mapContainerClassName={className}
    >
      {children}
    </GoogleMap>
  );
};
