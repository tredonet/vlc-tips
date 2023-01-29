import React, { ComponentProps, createContext, Dispatch, useEffect, useState } from "react";
import { Location, LocationKind } from "types";

export type DataContextProps = {
  locations?: Location[];
  reloadLocations: () => void;
  selectedLocation?: Location;
  setSelectedLocation: Dispatch<Location | undefined>;
  selectedCategory: LocationKind;
  setSelectedCategory: Dispatch<LocationKind>;
};

const DataContext = createContext<DataContextProps>({} as DataContextProps);
export default DataContext;
export const DataProvider: React.FC<ComponentProps<"div">> = ({ children }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location>();
  const [selectedCategory, setSelectedCategory] = useState<LocationKind>("Restaurant");

  useEffect(() => fetchLocations(), []);

  const fetchLocations = () => {
    fetch("/api/location")
      .then((res) => res.json())
      .then((res) => setLocations(res.filter((location: Location) => location.kind !== "Landmark")))
      .catch((e) => console.log(e.message));
  };

  const values = {
    locations,
    reloadLocations: (): void => fetchLocations(),
    selectedLocation,
    setSelectedLocation: (location: Location | undefined): void =>
      setSelectedLocation(location === selectedLocation ? undefined : location),
    selectedCategory,
    setSelectedCategory,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};
