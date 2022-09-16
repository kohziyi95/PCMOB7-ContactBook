import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function HomeScreen() {
  const navigation = useNavigation();
//   const [name, setName] = useState("loading...");
//   const auth = getAuth();
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       const uid = user.uid;
//       // ...
//     } else {
//       // User is signed out
//       // ...
//     }

//   async function loadName() {
//     const token = await AsyncStorage.getItem("token");
//     try {
//       const response = await axios.get(API + API_WHOAMI, {
//         headers: { Authorization: `JWT ${token}` },
//       });
//       setUsername(response.data.username);
//     } catch (error) {
//       console.log(error.response.data);
//     }
//   }

//   useEffect(() => {
//     const removeListener = navigation.addListener("focus", () => {
//       loadUsername();
//       loadPhoto();
//     });
//     loadUsername();
//     loadPhoto();

//     return () => {
//       removeListener();
//     };
//   }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 100,
    padding: 25,
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 20,
  },
  outlinedButton: {
    borderRadius: 3,
    borderWidth: 1,
    width: 120,
  },
  outlinedButtonText: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 12,
    padding: 15,
    color: "black",
  },
  button: {
    backgroundColor: "black",
    borderRadius: 15,
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 17,
    padding: 20,
    color: "white",
  },
});
