import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Text,
  StyleSheet,
  Dimensions,
  Easing,
  View,
  Alert,
} from "react-native";
import { ms } from "react-native-size-matters";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "./Button";
import Input from "./Input";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Locations, LocationsContext } from "../context/LocationsContext";

type Props = {
  item: Locations;
  index: number;
};

const { width } = Dimensions.get("screen");

const LocationCard: React.FC<Props> = (props) => {
  const [data, setData] = useState<Locations>({
    name: props.item.name,
    address: props.item.address,
    notas: props.item.notas,
    type: props.item.type,
  });
  const { editLocation, deleteLocation } = useContext(LocationsContext);
  const translateY = useRef(new Animated.Value(-ms(80))).current;
  const translateYEdit = useRef(new Animated.Value(-ms(80))).current;
  const maxHeight = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = useState(false);

  const entryAnimation = useCallback(() => {
    translateY.setValue(-ms(80));
    maxHeight.setValue(0);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 800,
      delay: props.index * 250,
      easing: Easing.bezier(0.39, 0.42, 0, 0.87),
      useNativeDriver: true,
    }).start();
  }, []);

  const openEdit = useCallback(() => {
    translateYEdit.setValue(-ms(80));
    maxHeight.setValue(0);
    Animated.timing(translateYEdit, {
      toValue: 0,
      duration: 800,
      easing: Easing.bezier(0.39, 0.42, 0, 0.87),
      useNativeDriver: true,
    }).start();
    Animated.timing(maxHeight, {
      toValue: ms(200),
      duration: 800,
      easing: Easing.bezier(0.45, 0, 0.55, 1),
      useNativeDriver: false,
    }).start();
  }, []);

  const closeEdit = useCallback(() => {
    Animated.timing(translateYEdit, {
      toValue: -ms(80),
      duration: 800,
      easing: Easing.bezier(0.39, 0.42, 0, 0.87),
      useNativeDriver: true,
    }).start();
    Animated.timing(maxHeight, {
      toValue: 0,
      duration: 800,
      easing: Easing.bezier(0.45, 0, 0.55, 1),
      useNativeDriver: false,
    }).start();
  }, []);

  const opacity = translateY.interpolate({
    inputRange: [-ms(60), 0],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const rotate = translateYEdit.interpolate({
    inputRange: [-ms(60), 0],
    outputRange: ["0deg", "180deg"],
    extrapolate: "clamp",
  });

  const opacityEdit = translateYEdit.interpolate({
    inputRange: [-ms(60), 0],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  useEffect(() => {
    entryAnimation();
  }, []);

  const onSubmit = useCallback(() => {
    editLocation(props.index, data);
  }, [data]);

  const edit = useCallback(() => {
    if (isVisible === false) {
      openEdit();
      setIsVisible((state) => !state);
    } else {
      closeEdit();
      setTimeout(() => {
        setIsVisible((state) => !state);
      }, 400);
    }
  }, [isVisible]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <TouchableOpacity
        style={{
          flexDirection: "column",
          width: width * 0.8 - ms(15),
        }}
        onPress={() => edit()}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: width * 0.8 - ms(15),
          }}
        >
          <Text style={styles.name}>{props.item.name}</Text>
          <Animated.View
            style={{
              transform: [{ rotate }],
            }}
          >
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#ffff" />
          </Animated.View>
        </View>
      </TouchableOpacity>
      <Text style={styles.country}>Tipo: {props.item.type}</Text>
      <Text style={styles.country}>Endereço: {props.item.address}</Text>
      <Text style={styles.country}>Notas: {props.item.notas}</Text>
      <Animated.View
        style={{
          display: isVisible ? "flex" : "none",
        }}
      >
        <Animated.View
          style={{
            opacity: opacityEdit,
            marginTop: ms(20),
            transform: [
              {
                translateY: translateYEdit,
              },
            ],
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Input
            title="Nome da localidade"
            value={data.name}
            onChangeText={(text) =>
              setData((state) => ({ ...state, name: text }))
            }
          />
          <Input
            title="Tipo da localidade"
            value={data.type}
            onChangeText={(text) =>
              setData((state) => ({ ...state, type: text } as any))
            }
          />
          <Input
            title="Endereço da localidade"
            value={data.address}
            onChangeText={(text) =>
              setData((state) => ({ ...state, address: text }))
            }
          />
          <Input
            title="Notas da localidade"
            value={data.notas}
            onChangeText={(text) =>
              setData((state) => ({ ...state, notas: text }))
            }
          />
          <Button text="Submit" onPress={() => onSubmit()} />
          <Button
            text="Excluir localidade"
            color="#8C1C13"
            onPress={() => deleteLocation(props.index)}
          />
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1C1A1C",
    width: width * 0.85,
    minHeight: ms(60),
    padding: ms(15),
    elevation: 5,
    borderRadius: ms(12),
    marginTop: ms(8),
  },
  name: {
    fontSize: ms(18),
    color: "#fff",
    fontWeight: "bold",
  },
  country: {
    fontSize: ms(15),
    color: "#fff",
    fontWeight: "400",
  },
});

export default LocationCard;
