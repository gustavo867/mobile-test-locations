import { StatusBar } from "expo-status-bar";
import React from "react";
import { LocationsProvider } from "./src/context/LocationsContext";
import { CityProvider } from "./src/context/CitiesContext";
import Routes from "./src/routes/routes";

export default function App() {
  return (
    <LocationsProvider>
      <CityProvider>
        <StatusBar style="dark" />
        <Routes />
      </CityProvider>
    </LocationsProvider>
  );
}
