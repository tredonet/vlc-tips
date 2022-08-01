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
  return (
    <GoogleMap zoom={14.9} center={center} mapContainerClassName="w-full h-screen">
      <Marker position={center} />
    </GoogleMap>
  );
}
export default Home;
