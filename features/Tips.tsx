import { useTips } from "hooks";
import { uniqueValues } from "utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Tip } from "types";
import Eye from "../public/icons/eye.svg";
import { TipsTitle, TipsListContainer, TipsListItem, Tag, ClickTag, TipDescription } from "components";
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

type TipsListProps = {
  title: string;
  icon: SVGElement;
  tips?: Tip[];
  expanded: boolean;
  onClick: any;
};

const TipsList: React.FC<TipsListProps> = ({ title, icon, tips, expanded, onClick }) => {
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
                <>
                  <TipsListItem onClick={() => setSelectedTip(tip)} key={tip.name} className="flex justify-between">
                    <div>
                      <FontAwesomeIcon icon={selected ? faAngleDown : faAngleRight} className="mt-1 mr-4" />
                      {tip.name}
                    </div>
                    {tip.type && <Tag text={Object.values(tip.type)[0]} className="w-min" />}
                  </TipsListItem>
                  {selected && <TipDescription tip={tip} />}
                </>
              );
            })}
        </TipsListContainer>
      )}
    </>
  );
};

