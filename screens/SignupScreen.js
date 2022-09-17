import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { LOGIN_SCREEN } from "../constants";
import { db, auth } from "../database/firebaseDB";
import { collection, doc, setDoc } from "firebase/firestore";

export default function SignupScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [birthday, setBirthday] = useState("");
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function signup() {
    setLoading(true);
    Keyboard.dismiss();
    if (password == confirmPassword) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          db.collection("users")
            .doc(user.uid)
            .set({
              name: name,
              mobile: mobile,
              email: email,
              birthday: birthday,
            })
            .then(() => {
              console.log("user added.");
            })
            .catch((error) => {
              console.log("Error adding user:", error);
            });
          navigation.navigate(LOGIN_SCREEN);

          // ...
        })
        .catch((error) => {
          console.log(error.message);
          setErrorText(error.message);
        });
    } else {
      setErrorText("Passwords do not match.");
      setPassword("");
      setConfirmPassword("");
    }

    setLoading(false);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <Text style={styles.title}>Register Account</Text>
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
        <TextInput
          style={styles.inputView}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(pw) => setConfirmPassword(pw)}
        />
        <TextInput
          style={styles.inputView}
          placeholder="Name"
          value={name}
          onChangeText={(name) => setName(name)}
        />
        <TextInput
          style={styles.inputView}
          placeholder="Mobile"
          value={mobile}
          onChangeText={(mobile) => setMobile(mobile)}
        />
        <TextInput
          style={styles.inputView}
          placeholder="Birthday (DD-MM-YYYY)"
          value={birthday}
          onChangeText={(birthday) => setBirthday(birthday)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await signup();
          }}
        >
          {loading ? (
            <ActivityIndicator style={styles.buttonText} />
          ) : (
            <Text style={styles.buttonText}>Sign Up!</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.errorText}>{errorText}</Text>
        <Text style={{ fontWeight: "400", fontSize: 17, padding: 5 }}>
          {message}
        </Text>
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
              navigation.navigate(LOGIN_SCREEN);
            }}
          >
            Already have an account? Click here to login!
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export const SIGNUP_SCREEN = "SIGNUP_SCREEN";

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
