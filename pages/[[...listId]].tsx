import type { NextPage } from "next";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { Map, Tips, Tour, WelcomeDialog } from "features";
import { Marker } from "components";
import { useTips } from "hooks";
import { Tip } from "types";

const Home: NextPage = () => {
  const router = useRouter();
  const { listId } = router.query;
  const { setListId, tips, selectedTip, setSelectedTip, setSelectedCategory } = useTips();
  const center = useMemo(() => selectedTip?.geometry || { lat: 39.468, lng: -0.359 }, [selectedTip]);
  const zoom = useMemo(() => (selectedTip ? 16 : 14.9), [selectedTip]);

  useEffect(() => {
    if(listId){
      setListId(listId as string);
    }
  }, [listId]);

  const onClickMarker = (tip: Tip) => {
    setSelectedTip(tip);
    setSelectedCategory(tip.kind);
  };

  return (
    <div className="flex">
      <WelcomeDialog />
      <div className="container mx-auto sm:mx-0 sm:max-w-sm bg-neutral-700 h-screen overflow-scroll content-center">
        <Tips />
        <Tour />
      </div>
      <Map zoom={zoom} center={center} className="w-full h-screen hidden sm:block">
        {tips && tips.map((tip: Tip) => <Marker tip={tip} key={tip.name} onClick={() => onClickMarker(tip)} />)}
      </Map>
    </div>
  );
};

export default Home;
