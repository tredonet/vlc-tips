import { TipService, UserService } from "@/database";
import { Tip } from "@/models";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/features/Map"), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-neutral-900"></div>,
});
const Markers = dynamic(() => import("@/features/Markers"), { ssr: false });
const Tour = dynamic(() => import("@/features/Tour"), { ssr: false });
const Tips = dynamic(() => import("@/features/TipsList"), { ssr: false });
const WelcomeDialog = dynamic(() => import("@/features/WelcomeDialog"), {
  ssr: false,
});

export default async function Home() {
  const tipService = new TipService();
  const tips = await tipService.find({}, { _id: 0 });
  return (
    <div className="flex">
      <WelcomeDialog />
      <div className="container max-w-sm bg-neutral-700 overflow-scroll p-4 flex flex-col gap-4 h-screen text-xl">
        <Tips tips={tips} />
        <Tour />
      </div>
      <Map className="w-full h-screen hidden sm:block z-0">
        <Markers tips={tips} />
      </Map>
    </div>
  );
}
