import type { NextPage } from 'next';
import { useEffect, useMemo, useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Location } from 'types';
import Location from './api/location';

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
  const [locations, setLocations] = useState<Location[]>();
  const [location, setLocation] = useState<Location>();
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
  ), []);
  const options = useMemo(() => ({
    disableDefaultUI: true,
    clickableIcons: false,
    styles
  }), []);

  useEffect(() => {
    fetch('/api/location').then(res => res.json()).then(res => setLocations(res.filter((location: Location) => location.type !== "Landmark"))).catch(console.log);
  }, []);



  type Props = {
    location: Location
  }
  const Mrkr: React.FC<Props> = ({ location }) => {
    const iconMap = {
      "Venue": 'icons/bar.png',
      "Restaurant": 'icons/restaurant.png',
      "POI": 'icons/studio.png',
      "Landmark": 'icons/bar.png'
    }
    const scaledSize = new google.maps.Size(48, 48);
    return <Marker position={location.geometry} icon={{ url: iconMap[location.type], scaledSize }} onClick={() => setLocation(location)} />

  }
  return (
    <GoogleMap zoom={14.9} center={center} options={options} mapContainerClassName="w-full h-screen">
      {locations && locations.map((location: Location) => <Mrkr location={location} />)}
      {location && <InfoWindoww location={location} />}
    </GoogleMap>
  );
}

const InfoWindoww = ({ location }: any) => {
  return <InfoWindow position={location.geometry}>
    <div>
      <h1>{location.name}</h1>
      {location.description}
    </div>
  </InfoWindow>
}

export default Home;
