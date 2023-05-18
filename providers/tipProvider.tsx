import React, { ComponentProps, createContext, Dispatch, useEffect, useState } from "react";
import { Tip, TipKind } from "types";

export type TipContextProps = {
  tips?: Tip[];
  loadTips: (listId: string) => void;
  selectedTip?: Tip;
  setSelectedTip: Dispatch<Tip | undefined>;
  selectedCategory: TipKind;
  setSelectedCategory: Dispatch<TipKind>;
};

export const TipContext = createContext<TipContextProps>({} as TipContextProps);

export const TipProvider: React.FC<ComponentProps<"div">> = ({ children }) => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [selectedTip, setSelectedTip] = useState<Tip>();
  const [selectedCategory, setSelectedCategory] = useState<TipKind>("Restaurant");

  const loadTips = (listId: string) => {
    fetch(`/api/tip?listId=${listId}`)
      .then((res) => res.json())
      .then(setTips)
      .catch((e) => console.log(e.message));
  };

  const values = {
    tips,
    loadTips,
    selectedTip,
    setSelectedTip: (tip: Tip | undefined): void => setSelectedTip(tip === selectedTip ? undefined : tip),
    selectedCategory,
    setSelectedCategory,
  };

  return <TipContext.Provider value={values}>{children}</TipContext.Provider>;
};
