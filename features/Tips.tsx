import { useLocation } from "hooks";
import { capitalize } from "utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Location } from "types";
import { TipsTitle, TipsListContainer, TipsListItem, Tag } from "components";
import { MiniMap } from "./MiniMap";
import pin from "../public/icons/pin.svg";
import vial from "../public/icons/vial.svg";
import eye from "../public/icons/eye.svg";
import information from "../public/icons/information.svg";

export const Tips: React.FC = () => {
  const { locations, selectedCategory, setSelectedCategory } = useLocation();
  return (
    <>
      <TipsList
        title={"Restaurants"}
        icon={pin}
        expanded={"Restaurant" === selectedCategory}
        onClick={() => setSelectedCategory("Restaurant")}
        tips={locations?.filter((loc) => loc.kind === "Restaurant")}
      />
      <TipsList
        title={"Nightlife"}
        icon={vial}
        expanded={"Venue" === selectedCategory}
        onClick={() => setSelectedCategory("Venue")}
        tips={locations?.filter((loc) => loc.kind === "Venue")}
      />
      <TipsList
        title={"Sightseeing"}
        icon={eye}
        expanded={"POI" === selectedCategory}
        onClick={() => setSelectedCategory("POI")}
        tips={locations?.filter((loc) => loc.kind === "POI")}
      />
      <TipsList
        title={"Getting Around"}
        icon={information}
        expanded={"Landmark" === selectedCategory}
        onClick={() => setSelectedCategory("Landmark")}
        tips={locations?.filter((loc) => loc.kind === "Landmark")}
      />
    </>
  );
};

type TipsProps = {
  title: string;
  icon: SVGElement;
  tips?: Location[];
  expanded: boolean;
  onClick: any;
};

const TipsList: React.FC<TipsProps> = ({ title, icon, tips, expanded, onClick }) => {
  const { selectedLocation, setSelectedLocation } = useLocation();

  return (
    <>
      <TipsTitle icon={icon} onClick={onClick}>
        {title}
      </TipsTitle>
      {expanded && (
        <TipsListContainer className="cursor-pointer">
          {tips &&
            tips.map((tip) => {
              const selected = selectedLocation?.name === tip.name;
              return (
                <TipsListItem onClick={() => setSelectedLocation(tip)}>
                  {tip.name}
                  <FontAwesomeIcon icon={selected ? faAngleDown : faAngleLeft} className="float-right mt-1" />
                  {selected && <ItemDescription location={tip} />}
                </TipsListItem>
              );
            })}
        </TipsListContainer>
      )}
    </>
  );
};

const ItemDescription: React.FC<{ location: Location }> = ({ location }) => {
  return (
    <div className="py-2 text-sm">
      {location.type &&
        Object.entries(location.type).map(([key, val]: any) => (
          <div>
            {capitalize(key)}: {val}
          </div>
        ))}
      <div className="text-xs my-2">{location.description}</div>
      <div className="flex my-1">
        {location.tags.map((tag) => (
          <Tag text={tag} />
        ))}
      </div>
      <MiniMap location={location} />
    </div>
  );
};
