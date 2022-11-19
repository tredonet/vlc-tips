import DataContext from "providers/provider";
import { useContext } from "react";

export const useLocation = () => useContext(DataContext);
