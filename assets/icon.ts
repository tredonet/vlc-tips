import Nightlife from "../public/icons/nightlife.svg";
import Restaurant from "../public/icons/restaurant.svg";
import Sightseeing from "../public/icons/sightseeing.svg";
import Landmark from "../public/icons/landmark.svg";
import Coffee from "../public/icons/coffee.svg";
import Market from "../public/icons/market.svg";
import Snacks from "../public/icons/snacks.svg";
import { TipKind } from "types";

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
