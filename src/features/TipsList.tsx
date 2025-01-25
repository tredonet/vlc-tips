"use client";
import { Tip as ITip, TipKind } from "@/models";
import { useEffect, useState } from "react";
import { useTip } from "@/providers";
import { TipsListHeader, TipsListContainer, Tip } from "@/components";

export default function Tips({ tips }: { tips: ITip[] }) {
  const [selectedCategory, selectCategory] = useState("Restaurant");
  const { selectedTip } = useTip();
  useEffect(() => selectCategory((prev) => selectedTip?.kind ?? prev), [selectedTip]);
  const categories = Array.from(new Set(tips.map((tip) => tip.kind) || []));
  return categories.map((category) => {
    const filteredTips = tips.filter((tip) => tip.kind === category);
    const selected = selectedCategory === category;
    return <TipsList key={category} category={category} tips={filteredTips} collapsed={!selected} onClickHeader={() => selectCategory(category)} />;
  });
}

type TipsListProps = {
  category: TipKind;
  tips: ITip[];
  collapsed: boolean;
  onClickHeader?: () => void;
};

export const TipsList = ({ category, tips, collapsed, onClickHeader = () => null }: TipsListProps) => {
  const { selectedTip, selectTip } = useTip();
  return (
    <div key={category} className="flex flex-col gap-4">
      <TipsListHeader category={category} onClick={onClickHeader} />
      {!collapsed && (
        <TipsListContainer>
          {tips.map((tip) => {
            const selected = selectedTip?.name === tip.name;
            return <Tip key={tip.name} tip={tip} selected={selected} onClick={() => selectTip(tip)} />;
          })}
        </TipsListContainer>
      )}
    </div>
  );
};
