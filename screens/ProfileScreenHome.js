import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LOGIN_SCREEN , PROFILE_SCREEN, PROFILE_STACK } from "../constants";
import { db, auth } from "../database/firebaseDB";
import { FontAwesome } from "@expo/vector-icons";

const imgPlaceholder = "https://picsum.photos/200";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState({});

  //   function getUser() {
  useEffect(() => {
    const subscriber = db
      .collection("users")
      .doc(auth.currentUser.uid)

      .onSnapshot((documentSnapshot) => {
        console.log("User exists: ", documentSnapshot.exists);

        if (documentSnapshot.exists) {
          console.log("User data: ", documentSnapshot.data());
          setUser(documentSnapshot.data());
        }
      });

    // );

    return () => subscriber();
  }, []);

  async function logout() {
    auth
      .signOut()
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/profile-placeholder.jpg")}
        style={styles.photo}
      />
      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.updateText}>Upload Photo</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{user.name}</Text>
      <View style={{ padding: 20, alignSelf: "center" }}>
        <Text style={styles.text}>
          <FontAwesome name="phone" size={36} color="black" />
          {"      "}
          {user.mobile}
        </Text>

        <Text style={styles.text}>
          <FontAwesome name="envelope" size={36} color="black" />
          {"     "}
          {user.email}
        </Text>

        <Text style={styles.text}>
          <FontAwesome name="birthday-cake" size={36} color="black" />
          {"     "}
          {user.birthday}
        </Text>
      </View>

      <TouchableOpacity onPress={() => {navigation.navigate(PROFILE_SCREEN.Update, user)}}>
        <Text style={styles.editText}>Edit Details</Text>
      </TouchableOpacity>

      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          await logout().then(() => {
            navigation.navigate(LOGIN_SCREEN);
          });
        }}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 70,
    padding: 25,
  },
  title: {
    fontWeight: "500",
    fontSize: 42,
    // marginBottom: 20,
    alignSelf: "center",
  },
  photo: {
    height: 200,
    width: 200,
    borderRadius: 200,
    alignSelf: "center",
  },
  updateText: {
    width: 200,
    color: "rgba(0,0,0,0.5)",
    fontSize: 16,
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 20,
  },
  editText: {
    width: 200,
    color: "rgba(0,0,0,0.5)",
    fontSize: 24,
    alignSelf: "center",
    textAlign: "center",
    marginTop: 20,
  },
  text: {
    fontWeight: "400",
    fontSize: 24,
    color: "black",
    margin: 15,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 15,
    width: "70%",
    alignSelf: "center",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 17,
    padding: 20,
    color: "white",
  },
});
