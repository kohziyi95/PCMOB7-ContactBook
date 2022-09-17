/* eslint-disable react/react-in-jsx-scope */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, ActivityIndicator, StatusBar, View } from "react-native";
import React, { useEffect, useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { LOGIN_SCREEN, SIGNUP_SCREEN, HOME_STACK, PROFILE_STACK, CONTACT_STACK } from "./constants";
import HomeStack from "./components/HomeStack";
import ProfileStack from "./components/ProfileStack";
import ContactStack from "./components/ContactStack";

// import { auth } from "./database/firebaseDB";


const Stack = createStackNavigator();


export default function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  async function setToken() {
    const token = await AsyncStorage.getItem("token");
    setLoggedIn(token);
    setLoading(false);
  }

  useEffect(() => {
    setToken();
  }, []);

  const LoadingScreen = () => (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );

  const AppScreen = () => (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator
        initialRouteName={ LOGIN_SCREEN }
        screenOptions={{ animationEnabled: false, headerShown: false }}
      >
        <Stack.Screen component={LoginScreen} name={LOGIN_SCREEN} />
        <Stack.Screen component={SignupScreen} name={SIGNUP_SCREEN} />
        <Stack.Screen component={HomeStack} name={HOME_STACK} />
        <Stack.Screen component={ProfileStack} name={PROFILE_STACK} />
        <Stack.Screen component={ContactStack} name={CONTACT_STACK} />

      </Stack.Navigator>
    </NavigationContainer>
  );

  return loading ? <LoadingScreen /> : <AppScreen />;
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
