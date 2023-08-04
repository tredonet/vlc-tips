import { icon } from "assets";
import { TipsTitle, TipsListContainer, TipsListItem, Button, Tag } from "components";
import { EditTip } from "features";
import { useTips } from "hooks";
import { useAuth } from "hooks/useAuth";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Tip } from "types";
import { uniqueValues } from "utils";

const Manager: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tip, setTip] = useState<Tip | null>(null);
  const { token, username } = useAuth();
  const { tips, loadTips } = useTips();
  const router = useRouter();
  useEffect(() => {
    // if (!token) {
    //   router.push("/login");
    //   return;
    // }
    loadTips("Tonino");
  }, []);
  const categories = uniqueValues(tips?.map((tip) => tip.kind) || []);

  type TipsProps = {
    title: string;
    icon: SVGElement;
    tips?: Tip[];
  };
  const setSelectedTip = (tip: Tip) => {
    setTip(tip);
    setIsOpen((x) => !x);
  };
  const onNewTip = () => {
    setSelectedTip({
      name: "",
      listId: username,
      kind: "Restaurant",
      description: "",
      tags: [],
      geometry: {
        lat: 0,
        lng: 0,
      },
      mapsUrl:""
    });
    setIsOpen(true);
  };
  const TipsList: React.FC<TipsProps> = ({ title, icon, tips }) => (
    <>
      <TipsTitle icon={icon}>{title}</TipsTitle>
      <TipsListContainer className="cursor-pointer">
        {tips &&
          tips.map((tip) => (
            <TipsListItem key={tip.name} onClick={() => setSelectedTip(tip)}>
              {tip.name}
            </TipsListItem>
          ))}
      </TipsListContainer>
    </>
  );
  return (
    <div className="flex justify-center mt-12">
      {categories.map((category) => (
        <div>
          <TipsList
            key={category}
            title={category}
            icon={icon(category)}
            tips={tips?.filter((tip) => tip.kind === category)}
          />
        </div>
      ))}
      <Button className="bg-teal-600 h-min w-max text-white px-4 hover:bg-teal-500" onClick={onNewTip}>
        Add Tip
      </Button>
      <EditTip isOpen={isOpen} setIsOpen={setIsOpen} tip={tip} />
    </div>
  );
};

export default Manager;
