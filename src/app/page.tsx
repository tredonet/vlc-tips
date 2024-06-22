import { connect } from "@/db";
import { Tip } from "@/models";
import { Tip as ITip } from "@/types";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/features/Map"), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-neutral-900"></div>,
});
const Markers = dynamic(() => import("@/features/Markers"), { ssr: false });
const Tour = dynamic(() => import("@/features/Tour"), { ssr: false });
const Tips = dynamic(() => import("@/features/TipsList"), { ssr: false });

export default async function Home() {
  await connect();
  const _tips = await Tip.find({ listId: "Tonino" }, { _id: 0 });
  const tips = JSON.parse(JSON.stringify(_tips)) as ITip[];
  return (
    <div className="flex">
      {/* <WelcomeDialog /> */}
      <div className="container max-w-sm bg-neutral-700 overflow-scroll p-4 flex flex-col gap-4 h-screen text-xl">
        <Tips tips={tips} />
        <Tour />
      </div>
      <Map className="w-full h-screen hidden sm:block">
        <Markers tips={tips} />
      </Map>
    </div>
  );
}
