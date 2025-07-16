// src/navigation/MainNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlanogramScreen from "../screens/PlanogramScreen";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Planogram"
        component={PlanogramScreen}
        options={{ title: "Planogram" }}
      />
    </Stack.Navigator>
  );
}
