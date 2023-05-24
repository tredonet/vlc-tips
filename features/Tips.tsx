import { useTips } from "hooks";
import { capitalize, uniqueValues } from "utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Tip } from "types";
import Eye from "../public/icons/eye.svg";
import { TipsTitle, TipsListContainer, TipsListItem, Tag, ClickTag } from "components";
import { MiniMap } from "./MiniMap";
import { useState } from "react";
import { icon } from "assets";

export const Tips: React.FC = () => {
  const [filter, setFilter] = useState<string | undefined>();
  const { tips, selectedCategory, setSelectedCategory } = useTips();
  const tags = ["Spanish", "Drinks", "Tapas", "Paella"];
  const categories = uniqueValues(tips?.map((tip) => tip.kind) || []);

  return (
    <>
      <div className="flex flex-wrap my-5 mx-3">
        {tags.map((tag) => (
          <ClickTag
            key={tag}
            text={tag}
            onClick={() => setFilter(filter === tag ? undefined : tag)}
            highlighted={tag === filter}
          />
        ))}
      </div>
      {!filter &&
        categories.map((category) => (
          <TipsList
            key={category}
            title={category}
            icon={icon(category)}
            expanded={category === selectedCategory}
            onClick={() => setSelectedCategory(category)}
            tips={tips?.filter((tip) => tip.kind === category)}
          />
        ))}
      {filter && (
        <TipsList
          title={filter}
          icon={Eye}
          expanded={true}
          onClick={null}
          tips={tips?.filter((tip) => tip.tags.includes(filter))}
        />
      )}
    </>
  );
};

type TipsProps = {
  title: string;
  icon: SVGElement;
  tips?: Tip[];
  expanded: boolean;
  onClick: any;
};

const TipsList: React.FC<TipsProps> = ({ title, icon, tips, expanded, onClick }) => {
  const { selectedTip, setSelectedTip } = useTips();

  return (
    <>
      <TipsTitle icon={icon} onClick={onClick}>
        {title}
      </TipsTitle>
      {expanded && (
        <TipsListContainer className="cursor-pointer">
          {tips &&
            tips.map((tip) => {
              const selected = selectedTip?.name === tip.name;
              return (
                <TipsListItem onClick={() => setSelectedTip(tip)} key={tip.name}>
                  {tip.name}
                  <FontAwesomeIcon icon={selected ? faAngleDown : faAngleLeft} className="float-right mt-1" />
                  {selected && <ItemDescription tip={tip} />}
                </TipsListItem>
              );
            })}
        </TipsListContainer>
      )}
    </>
  );
};

const ItemDescription: React.FC<{ tip: Tip }> = ({ tip }) => {
  return (
    <div className="py-2 text-base">
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
        <MiniMap tip={tip} />
      </a>
    </div>
  );
};
