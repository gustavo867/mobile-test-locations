import React, { ReactNode, useContext, useState } from "react";

import { Text, View } from "react-native";
import Switch from "../../components/Switch";
import { CityContext } from "../../context/CitiesContext";
import { LocationsContext } from "../../context/LocationsContext";

import styles from "./styles";

interface HomeProps {
  children: ReactNode;
}

function Home({ children }: HomeProps) {
  const [state, setState] = useState<"cities" | "locations">("cities");

  const { locations } = useContext(LocationsContext);
  const { cities } = useContext(CityContext);

  return (
    <View style={styles.container}>
      <Switch
        a="Cidades"
        b="Localidades"
        state={state}
        functionA={() => {}}
        functionB={() => {}}
      />
    </View>
  );
}

export default Home;
