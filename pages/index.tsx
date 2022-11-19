import type { NextPage } from 'next';
import { Map, TipsList } from 'features';
import { Heading } from 'components';
import { useLoadScript } from '@react-google-maps/api';
import { useLocation } from 'hooks';

const Home: NextPage = () => {
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) return <></>;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <>
    <div className='w-1/6 float-left h-screen overflow-scroll bg-slate-600'>
      <Heading>
        VLC TIPS
      </Heading>
      <TipsList />
    </div>
    <div className='w-5/6 h-screen float-right'>
      <Map />
    </div>
  </>
}

export default Home;
