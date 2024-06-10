"use client";
import { Tip } from "@/types";
import React, {
  ComponentProps,
  createContext,
  Dispatch,
  useContext,
  useState,
} from "react";

export type TipContextProps = {
  selectedTip: Tip | undefined;
  selectTip: Dispatch<Tip>;
};

export const TipContext = createContext<TipContextProps>({} as TipContextProps);

export const TipProvider: React.FC<ComponentProps<"div">> = ({ children }) => {
  const [selectedTip, setSelectedTip] = useState<Tip>();

  const selectTip = (tip: Tip) =>
    setSelectedTip(tip == selectedTip ? undefined : tip);

  const values = {
    selectedTip,
    selectTip,
  };

  return <TipContext.Provider value={values}>{children}</TipContext.Provider>;
};

export const useTip = () => useContext(TipContext);
