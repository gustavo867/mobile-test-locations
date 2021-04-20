import React, { ReactNode, useContext, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Switch from "../../components/Switch";
import { CityContext } from "../../context/CitiesContext";
import { LocationsContext } from "../../context/LocationsContext";

import styles from "./styles";
import { moderateScale, ms } from "react-native-size-matters";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import CityCard from "../../components/CityCard";
import LocationCard from "../../components/LocationCard";

interface HomeProps {
  children: ReactNode;
}

function Home({ children }: HomeProps) {
  const [state, setState] = useState<"cities" | "locations">("cities");
  const { navigate } = useNavigation();
  const { locations } = useContext(LocationsContext);
  const { cities } = useContext(CityContext);

  return (
    <SafeAreaView style={styles.container}>
      <Switch
        a="Cidades"
        b="Localidades"
        state={state}
        functionA={() => setState("cities")}
        functionB={() => setState("locations")}
      />
      {state === "cities" && (
        <View>
          <View style={styles.rowTop}>
            <Text style={styles.title}>Total de cidades: {cities.length}</Text>
            <TouchableOpacity onPress={() => navigate("CreateCity")}>
              <AntDesign name="plus" size={moderateScale(20)} color="#fff" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={cities}
            style={{
              marginTop: ms(10),
            }}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: ms(60),
            }}
            renderItem={({ item, index }) => (
              <CityCard item={item} index={index} />
            )}
          />
        </View>
      )}
      {state === "locations" && (
        <View>
          <View style={styles.rowTop}>
            <Text style={styles.title}>
              Total de localidades: {locations.length}
            </Text>
            <TouchableOpacity onPress={() => navigate("CreateLocation")}>
              <AntDesign name="plus" size={moderateScale(20)} color="#fff" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={locations}
            style={{
              marginTop: ms(10),
            }}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: ms(60),
            }}
            renderItem={({ item, index }) => (
              <LocationCard item={item} index={index} />
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

export default Home;
