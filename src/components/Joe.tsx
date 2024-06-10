"use client";

import { useTip } from "@/providers";
import { Map } from "@/features";
import { Marker } from "@/components";
import { Tip as ITip } from "@/types";

export const Markers = ({ tips }: { tips: ITip[] }) => {
  const { selectedTip, selectTip } = useTip();
  return (
    <Map className="w-full h-screen hidden sm:block">
      {tips.map((tip) => (
        <Marker
          key={tip.name}
          tip={tip}
          selected={selectedTip?.name === tip.name}
          onClick={() => selectTip(tip)}
        />
      ))}
    </Map>
  );
};
