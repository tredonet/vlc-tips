import { Map } from "features";
import { Marker } from "components";
import { ComponentProps, useEffect, useState } from "react";
import { Tip } from "types";
import { capitalize } from "utils";
import { Tag } from "./Tag";

type TipsTitleProps = {
  icon: any;
};

export const TipsTitle: React.FC<ComponentProps<"div"> & TipsTitleProps> = ({ children, icon, ...props }) => (
  <div className="bg-slate-200 mx-4 mb-4 py-1 px-4 sm:px-8 rounded-xl font-patrick text-xl cursor-pointer" {...props}>
    <div className="flex gap-4">
      <img src={icon.src} />
      {children}
    </div>
  </div>
);

export const TipsListContainer: React.FC<ComponentProps<"ul">> = ({ children, className, ...props }) => (
  <ul className={`mx-4 mb-8 bg-neutral-600 rounded-xl text-xl ${className}`} {...props}>
    {children}
  </ul>
);

export const TipsListItem: React.FC<ComponentProps<"li">> = ({ children, className, ...props }) => (
  <li className={`font-patrick text-white pt-1 px-4 ${className}`} {...props}>
    {children}
  </li>
);

export const TipDescription: React.FC<{ tip: Tip }> = ({ tip }) => {
  const [setMarker, setSetMarker] = useState(false);
  useEffect(() => {
    setTimeout(() => setSetMarker(true), 200);
  });
  return (
    <div className="font-patrick text-white p-4 py-2 text-base">
      {tip.type &&
        Object.entries(tip.type).map(([key, val]: any) => (
          <div>
            {capitalize(key)}: {val}
          </div>
        ))}
      <div className="my-2">{tip.description}</div>
      <div className="flex flex-wrap my-1">
        {tip.tags.map((tag) => (
          <Tag text={tag} />
        ))}
      </div>
      <div className="hidden sm:block cursor-pointer font-bold">
        <a href={tip.mapsUrl} target="_blank">
          Navigation &rarr;
        </a>
      </div>
      <a className="cursor-pointer" href={tip.mapsUrl} target="_blank">
        <Map zoom={13} center={tip.geometry} className="w-full h-60 block sm:hidden cursor-pointer">
          {setMarker && <Marker tip={tip} />}
        </Map>
      </a>
    </div>
  );
};
