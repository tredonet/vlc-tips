"use client";
import { Marker } from "@/components/Marker";
import { useTip } from "@/providers";
import { Tip } from "@/models";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function Markers({ tips }: { tips: Tip[] }) {
  const { selectTip, selectedTip } = useTip();
  const map = useMap();

  useEffect(() => {
    if (selectedTip) map.flyTo([selectedTip.geometry.lat, selectedTip.geometry.lng], 16);
    else map.flyTo([39.468, -0.355], 15);
  }, [selectedTip]);

  const onClick = (tip: Tip) => {
    const selected = selectedTip?.name === tip.name;
    selectTip(tip);
  };

  return tips.map((tip) => <Marker key={tip.name} tip={tip} onClick={() => onClick(tip)} selected={selectedTip?.name === tip.name} />);
}
