import type { NextPage } from "next";
import { Map, Tips } from "features";
import { Heading } from "components";
import { useLoadScript } from "@react-google-maps/api";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) return <></>;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className="flex">
      <div className="container mx-auto sm:mx-0 sm:max-w-sm bg-neutral-700 h-screen overflow-scroll content-center">
        {/* <Heading className="my-auto py-4 text-center">VLC TIPS</Heading> */}
        <Tips />
      </div>
      <Map />
    </div>
  );
};

export default Home;
