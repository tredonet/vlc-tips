import { connect } from "@/db";
import { Tip } from "@/models";
import { Tip as ITip } from "@/types";
import { Map, Tips, WelcomeDialog, Tour, Markers } from "@/features";

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
