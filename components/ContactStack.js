import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { CONTACT_SCREEN } from "../constants";
import ContactScreenAdd from "../screens/ContactScreenAdd";
import ContactScreenHome from "../screens/ContactScreenHome";
import ContactScreenDetails from "../screens/ContactScreenDetails";
import ContactScreenEdit from "../screens/ContactScreenEdit";

const NotesStackNav = createStackNavigator();

export default function ContactStack() {
  return (
    <NotesStackNav.Navigator>
      <NotesStackNav.Screen
        name={CONTACT_SCREEN.Home}
        component={ContactScreenHome}
        options={{ headerShown: false }}
      />
      <NotesStackNav.Screen
        name={CONTACT_SCREEN.Add}
        component={ContactScreenAdd}
        options={{ headerShown: false }}
      />
      <NotesStackNav.Screen
        name={CONTACT_SCREEN.Details}
        component={ContactScreenDetails}
        options={{ headerShown: false }}
      />
      <NotesStackNav.Screen
        name={CONTACT_SCREEN.Edit}
        component={ContactScreenEdit}
        options={{ headerShown: false }}
      />
    </NotesStackNav.Navigator>
  );
}
