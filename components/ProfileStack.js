import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { PROFILE_SCREEN } from "../constants";
import ProfileScreenHome from "../screens/ProfileScreenHome";

const ProfileStackNav = createStackNavigator();

export default function ProfileStack() {
  return (
    <ProfileStackNav.Navigator>
      <ProfileStackNav.Screen
        name={PROFILE_SCREEN.Home}
        component={ProfileScreenHome}
        options={{ headerShown: false }}
      />
      {/* <ProfileStackNav.Screen
        name={PROFILE_SCREEN.Update}
        component={ProfileScreenUpdate}
        options={{ headerShown: false }}
      /> */}
    </ProfileStackNav.Navigator>
  );
}