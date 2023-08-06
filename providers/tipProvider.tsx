import React, { ComponentProps, createContext, Dispatch, useEffect, useState } from "react";
import { Tip, TipKind } from "types";

export type TipContextProps = {
  tips?: Tip[];
  loadTips: Dispatch<string>;
  setListId: Dispatch<string>;
  selectedTip?: Tip;
  setSelectedTip: Dispatch<Tip | undefined>;
  selectedCategory: TipKind;
  setSelectedCategory: Dispatch<TipKind>;
};

export const TipContext = createContext<TipContextProps>({} as TipContextProps);

export const TipProvider: React.FC<ComponentProps<"div">> = ({ children }) => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [listId, setListId] = useState<string>("Tonino");
  const [selectedTip, setSelectedTip] = useState<Tip>();
  const [selectedCategory, setSelectedCategory] = useState<TipKind>("Restaurant");
  
  const loadTips = () => {
    fetch(`/api/tip?listId=${listId}`)
      .then((res) => res.json())
      .then(setTips)
      .catch((e) => console.log(e.message));
  };

  useEffect(loadTips, [listId]);

  const values = {
    tips,
    loadTips,
    setListId,
    selectedTip,
    setSelectedTip: (tip: Tip | undefined): void => setSelectedTip(tip === selectedTip ? undefined : tip),
    selectedCategory,
    setSelectedCategory,
  };

  return <TipContext.Provider value={values}>{children}</TipContext.Provider>;
};
