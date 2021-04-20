import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import CreateCity from "../screens/Create/CreateCity";
import CreateLocation from "../screens/Create/CreateLocation";

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreateCity" component={CreateCity} />
        <Stack.Screen name="CreateLocation" component={CreateLocation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
