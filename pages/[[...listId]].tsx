import type { NextPage } from "next";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { Map, Tips, Tour, WelcomeDialog } from "features";
import { TipMarker } from "components";
import { useTips } from "hooks";
import { Tip } from "types";

const Home: NextPage = () => {
  const router = useRouter();
  const { listId } = router.query;
  const { loadTips, tips, selectedTip } = useTips();
  const center = useMemo(() => selectedTip?.geometry || { lat: 39.468, lng: -0.359 }, [selectedTip]);
  const zoom = useMemo(() => (selectedTip ? 16 : 14.9), [selectedTip]);

  useEffect(() => {
    loadTips(listId?.toString() || "Tonino");
  }, [listId]);

  return (
    <div className="flex">
      <WelcomeDialog />
      <div className="container mx-auto sm:mx-0 sm:max-w-sm bg-neutral-700 h-screen overflow-scroll content-center">
        <Tips />
        <Tour />
      </div>
      <Map zoom={zoom} center={center} className="w-full h-screen hidden sm:block">
        {tips && tips.map((tip: Tip) => <TipMarker tip={tip} key={tip.name} />)}
      </Map>
    </div>
  );
};

export default Home;
