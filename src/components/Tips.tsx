"use client";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Marker, Tag } from "@/components";
import Image from "next/image";
import { icon } from "@/assets";
import { Tip as ITip, TipKind } from "@/types";
import { Map } from "@/features";
import { ComponentProps } from "react";

type ListHeaderProps = {
  category: TipKind;
  onClick: () => void;
};

export const TipsListHeader = ({ category, onClick }: ListHeaderProps) => {
  return (
    <div
      key={category}
      className="bg-slate-200 py-1 px-4 rounded-xl text-black flex gap-2 select-none cursor-pointer hover:bg-slate-300"
      onClick={onClick}
    >
      <Image src={icon(category)} alt={category} />
      {category}
    </div>
  );
};

export const TipsListContainer = ({ children }: ComponentProps<"div">) => {
  return <div className="bg-neutral-600 rounded-xl text-white">{children}</div>;
};

type TipProps = {
  tip: ITip;
  selected: boolean;
  onClick: () => void;
};

export const Tip = ({ tip, selected, onClick }: TipProps) => {
  const type = Object.values(tip.type || {})[0];
  return (
    <>
      <div
        key={tip.name}
        className="px-2 flex gap-2 items-center cursor-pointer min-h-8"
        onClick={onClick}
      >
        <FontAwesomeIcon
          icon={selected ? faAngleDown : faAngleRight}
          className="min-w-4"
        />
        <span className=" hover:underline w-full">{tip.name}</span>
        <Tag text={type} className="ml-auto" />
      </div>

      {selected && <TipDescription tip={tip} />}
    </>
  );
};

const TipDescription = ({ tip }: { tip: ITip }) => {
  return (
    <>
      <div className="px-4 py-1">{tip.description}</div>
      <div className=" px-4 py-1 flex flex-wrap">
        {tip.tags.map((tag) => (
          <Tag text={tag} key={tag} />
        ))}
      </div>
      <a
        href={tip.mapsUrl}
        target="_blank"
        className=" px-4 py-1 hidden sm:block cursor-pointer font-bold"
      >
        Navigation &rarr;
      </a>
      <a
        className="cursor-pointer block sm:hidden"
        href={tip.mapsUrl}
        target="_blank"
      >
        <Map
          zoom={13}
          center={[tip.geometry.lat, tip.geometry.lng]}
          className="w-full h-60"
        >
          <Marker tip={tip} />
        </Map>
      </a>
    </>
  );
};
