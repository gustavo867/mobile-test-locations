import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { useStorage } from "../hooks/useStorage";

export interface Cities {
  name: string;
  country: string;
}

type CityContext = {
  cities: Cities[];
  setCities: React.Dispatch<React.SetStateAction<Cities[]>>;
  createCity: (city: Cities) => void;
};

export const CityContext = createContext<CityContext>({} as CityContext);

export const CityProvider: React.FC = ({ children }) => {
  const [cities, setCities] = useState<Cities[]>([]);
  const { data } = useStorage<Cities[]>("cities");

  const createCity = useCallback((city: Cities) => {
    setCities((state) => [...state, city]);
  }, []);

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
    }),
    [cities, setCities]
  );

  return <CityContext.Provider value={values}>{children}</CityContext.Provider>;
};
