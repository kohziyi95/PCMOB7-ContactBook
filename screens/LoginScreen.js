import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { SIGNUP_SCREEN, HOME_STACK , PROFILE_STACK } from "../constants";
import { db, auth } from "../database/firebaseDB";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    Keyboard.dismiss();
    try {
      await auth.signInWithEmailAndPassword(email, password).then(() => {
        console.log("Signed in.");
        navigation.navigate(HOME_STACK);
      });
    } catch (error) {
      // console.log(error);
      console.log(error.code);
      if (error.code === "auth/wrong-password") {
        console.log("Wrong password");
        setErrorText(error.message);
      } else if (error.code === "auth/user-not-found") {
        console.log("User not found");
        setErrorText(error.message);
      } else {
        setErrorText(error.message);
      }
    } finally {
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/address-book.png")}
      />
      <Text style={styles.title}>Friend Manager</Text>
      <TextInput
        style={styles.inputView}
        placeholder="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={styles.inputView}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(pw) => setPassword(pw)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          await login();
        }}
      >
        {loading ? (
          <ActivityIndicator style={styles.buttonText} />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.errorText}>{errorText}</Text>

      <TouchableOpacity>
        <Text
          style={{
            fontWeight: "400",
            fontSize: 17,
            padding: 5,
            color: "blue",
            alignSelf: "center",
          }}
          onPress={() => {
            navigation.navigate(SIGNUP_SCREEN);
          }}
        >
          No Account? Sign up now!
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export const LOGIN_SCREEN = "LOGIN_SCREEN";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 100,
    padding: 25,
  },
  image: {
    marginTop: 20,
    flex: 0.5,
    resizeMode: "contain",
    alignSelf: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 40,
    marginTop: 50,
    alignSelf: "center",
  },
  inputView: {
    backgroundColor: "#F1F0F5",
    borderRadius: 5,
    marginBottom: 30,
    padding: 20,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 15,
    width: "70%",
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 17,
    padding: 20,
    color: "white",
  },
  errorText: {
    marginTop: 20,
    fontSize: 15,
    color: "red",
    padding: 5,
  },
});
