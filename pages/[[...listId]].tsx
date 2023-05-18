import type { NextPage } from "next";
import { Map, Tips, Tour } from "features";
import { useLoadScript } from "@react-google-maps/api";
import { WelcomeDialog } from "features";
import { useRouter } from "next/router";
import { useTips } from "hooks";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const { listId } = router.query;
  const { loadTips } = useTips();
  useEffect(() => {
    loadTips(listId?.toString() || "Tonino");
  }, [listId]);
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) return <>No API key</>;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className="flex">
      <WelcomeDialog />
      <div className="container mx-auto sm:mx-0 sm:max-w-sm bg-neutral-700 h-screen overflow-scroll content-center">
        {/* <Heading className="my-auto py-4 text-center">VLC TIPS</Heading> */}
        <Tips />
        <Tour />
        
      </div>
      <Map />
    </div>
  );
};

export default Home;
