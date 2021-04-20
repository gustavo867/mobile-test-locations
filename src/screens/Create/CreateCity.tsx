import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useContext, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { ms } from "react-native-size-matters";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { CityContext } from "../../context/CitiesContext";

// import { Container } from './styles';

const CreateCity: React.FC = () => {
  const [data, setData] = useState({
    name: "",
    country: "",
  });
  const { goBack } = useNavigation();
  const { createCity } = useContext(CityContext);

  const onSubmit = useCallback(() => {
    if (data.country === "") {
      Alert.alert("Por favor digite o país");
      return;
    }
    if (data.name === "") {
      Alert.alert("Por favor digite o nome da cidade");
      return;
    }

    createCity(data);
    goBack();
  }, [data.name, data.country]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie uma cidade</Text>
      <View style={{ height: ms(50) }} />
      <Input
        title="Nome da cidade"
        value={data.name}
        onChangeText={(text) => setData((state) => ({ ...state, name: text }))}
      />
      <View style={{ height: ms(20) }} />
      <Input
        title="Nome do país da cidade"
        value={data.country}
        onChangeText={(text) =>
          setData((state) => ({ ...state, country: text }))
        }
      />
      <Button text="Confirmar" onPress={() => onSubmit()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#13131A",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: ms(20),
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CreateCity;
