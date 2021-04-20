import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import { LocationsProvider } from "../context/LocationsContext";
import { CityProvider } from "../context/CitiesContext";

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <LocationsProvider>
      <CityProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </CityProvider>
    </LocationsProvider>
  );
};

export default Routes;
