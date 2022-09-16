import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { HOME_SCREEN, PROFILE_STACK } from "../constants";
import HomeScreen from "../screens/HomeScreen";
import ProfileStack from "./ProfileStack";

const BottomTab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name == HOME_SCREEN) {
            iconName = "home";
          } else if (route.name == PROFILE_STACK) {
            iconName = "gear";
          } else {
            iconName = "users";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <BottomTab.Screen name={HOME_SCREEN} component={HomeScreen} />
      {/* <BottomTab.Screen name={CONTACT_STACK} component={ContactStack} /> */}
      <BottomTab.Screen name={PROFILE_STACK} component={ProfileStack} />
    </BottomTab.Navigator>
  );
}
