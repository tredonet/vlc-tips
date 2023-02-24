import React, { ComponentProps, createContext, Dispatch, useEffect, useState } from "react";
import { Tip, TipKind } from "types";

export type DataContextProps = {
  tips?: Tip[];
  listId: string;
  setListId: (listId: string) => void;
  reloadTips: () => void;
  selectedTip?: Tip;
  setSelectedTip: Dispatch<Tip | undefined>;
  selectedCategory: TipKind;
  setSelectedCategory: Dispatch<TipKind>;
};

const DataContext = createContext<DataContextProps>({} as DataContextProps);
export default DataContext;
export const DataProvider: React.FC<ComponentProps<"div">> = ({ children }) => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [selectedTip, setSelectedTip] = useState<Tip>();
  const [listId, setListId] = useState("Tonino");
  const [selectedCategory, setSelectedCategory] = useState<TipKind>("Restaurant");

  useEffect(() => fetchTips(), []);

  const fetchTips = () => {
    fetch(`/api/tip?listId=${listId}`)
      .then((res) => res.json())
      .then((res) => setTips(res.filter((tip: Tip) => tip.kind !== "Landmark")))
      .catch((e) => console.log(e.message));
  };

  const values = {
    tips,
    listId,
    setListId,
    reloadTips: (): void => fetchTips(),
    selectedTip,
    setSelectedTip: (tip: Tip | undefined): void =>
      setSelectedTip(tip === selectedTip ? undefined : tip),
    selectedCategory,
    setSelectedCategory,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};
