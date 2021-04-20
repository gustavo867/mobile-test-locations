import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { useStorage } from "../hooks/useStorage";

export interface Locations {
  name: string;
  type: "Restaurante" | "Residencial" | "Outro";
  address: string;
  notas: string;
}

type LocationsContext = {
  locations: Locations[];
  setLocations: React.Dispatch<React.SetStateAction<Locations[]>>;
  createLocation: (location: Locations) => void;
  deleteLocation: (index: number) => void;
  editLocation: (index: number, location: Locations) => void;
};

export const LocationsContext = createContext<LocationsContext>(
  {} as LocationsContext
);

export const LocationsProvider: React.FC = ({ children }) => {
  const [locations, setLocations] = useState<Locations[]>([]);
  const { data } = useStorage<Locations[]>("locations");

  const createLocation = useCallback(
    (location: Locations) => {
      setLocations((state) => [...state, location]);
    },
    [locations]
  );

  const deleteLocation = useCallback(
    (index: number) => {
      const newArray = locations.filter((_, i) => i !== index);

      setLocations(newArray);
    },
    [locations]
  );

  const editLocation = useCallback(
    (index: number, location: Locations) => {
      const newArray = locations.map((item, i) =>
        i === index ? location : item
      );

      setLocations(newArray);
    },
    [locations]
  );

  useEffect(() => {
    if (data) {
      setLocations(data);
    }
  }, [data]);

  useEffect(() => {
    AsyncStorage.setItem("locations", JSON.stringify(locations));
  }, [locations]);

  const values = useMemo(
    () => ({
      locations,
      setLocations,
      createLocation,
      deleteLocation,
      editLocation,
    }),
    [locations, setLocations, createLocation, deleteLocation, editLocation]
  );

  return (
    <LocationsContext.Provider value={values}>
      {children}
    </LocationsContext.Provider>
  );
};
