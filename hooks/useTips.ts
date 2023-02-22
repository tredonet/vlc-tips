import DataContext from "providers/provider";
import { useContext } from "react";

export const useTips = () => useContext(DataContext);
