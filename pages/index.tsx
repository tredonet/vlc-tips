import type { NextPage } from 'next';
import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const Home: NextPage = () => {
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
    return <></>;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 39.468, lng: -0.359 }), []);
  const styles = useMemo(() => ([
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
      }
    ]
  ), [])
  const options = useMemo(() => ({
    disableDefaultUI: true,
    clickableIcons: false,
    styles
  }), []);

  return (
    <GoogleMap zoom={14.9} center={center} options={options} mapContainerClassName="w-full h-screen">
      <Marker position={center} />
    </GoogleMap>
  );
}
export default Home;
