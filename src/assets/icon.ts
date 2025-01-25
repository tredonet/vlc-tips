import Nightlife from "../../public/nightlife.svg";
import Restaurant from "../../public/restaurant.svg";
import Sightseeing from "../../public/sightseeing.svg";
import Landmark from "../../public/landmark.svg";
import Coffee from "../../public/coffee.svg";
import Market from "../../public/market.svg";
import Snacks from "../../public/snacks.svg";
import { TipKind } from "@/models";

export const icon = (kind: TipKind) => {
  const icons = {
    Nightlife,
    Restaurant,
    Sightseeing,
    Landmark,
    Coffee,
    Snacks,
    Market,
  };
  return icons[kind];
};
