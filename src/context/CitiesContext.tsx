import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStorage } from "../hooks/useStorage";

export interface Cities {
  name: string;
  country: string;
}

type CityContext = {
  cities: Cities[];
  setCities: React.Dispatch<React.SetStateAction<Cities[]>>;
  createCity: (city: Cities) => void;
  editCity: (index: number, location: Cities) => void;
};

export const CityContext = createContext<CityContext>({} as CityContext);

export const CityProvider: React.FC = ({ children }) => {
  const [cities, setCities] = useState<Cities[]>([]);
  const { data } = useStorage<Cities[]>("cities");

  const createCity = useCallback((city: Cities) => {
    setCities((state) => [...state, city]);
  }, []);

  const editCity = useCallback(
    (index: number, location: Cities) => {
      const newArray = cities.map((item, i) => (i === index ? location : item));

      setCities(newArray);
    },
    [cities]
  );

  useEffect(() => {
    if (data) {
      setCities(data);
    }
  }, [data]);

  useEffect(() => {
    AsyncStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  const values = useMemo(
    () => ({
      cities,
      setCities,
      createCity,
      editCity,
    }),
    [cities, setCities, createCity, editCity]
  );

  return <CityContext.Provider value={values}>{children}</CityContext.Provider>;
};
