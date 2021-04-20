import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useContext, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { ms } from "react-native-size-matters";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { LocationsContext } from "../../context/LocationsContext";

const CreateLocation: React.FC = () => {
  const [data, setData] = useState({
    name: "",
    type: "",
    address: "",
    notas: "",
  });
  const { goBack } = useNavigation();
  const { createLocation } = useContext(LocationsContext);

  const onSubmit = useCallback(() => {
    if (data.name === "") {
      Alert.alert("Por favor digite o nome da localidade");
      return;
    }
    if (data.type === "") {
      Alert.alert("Por favor digite o tipo da localidade");
      return;
    }
    if (data.address === "") {
      Alert.alert("Por favor digite o endereço da localidade");
      return;
    }
    if (data.notas === "") {
      Alert.alert("Por favor digite as notas da localidade");
      return;
    }

    createLocation(data as any);
    goBack();
  }, [data]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie uma localidade</Text>
      <View style={{ height: ms(50) }} />
      <Input
        title="Nome da localidade"
        value={data.name}
        onChangeText={(text) => setData((state) => ({ ...state, name: text }))}
      />
      <View style={{ height: ms(20) }} />
      <Input
        title="Tipo da localidade"
        value={data.type}
        onChangeText={(text) => setData((state) => ({ ...state, type: text }))}
      />
      <View style={{ height: ms(20) }} />
      <Input
        title="Endereço da localidade"
        value={data.address}
        onChangeText={(text) =>
          setData((state) => ({ ...state, address: text }))
        }
      />
      <View style={{ height: ms(20) }} />
      <Input
        title="Notas da localidade"
        value={data.notas}
        onChangeText={(text) => setData((state) => ({ ...state, notas: text }))}
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

export default CreateLocation;
