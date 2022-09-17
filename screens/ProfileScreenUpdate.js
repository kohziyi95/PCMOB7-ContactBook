import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { db, auth } from "../database/firebaseDB";

export default function ProfileScreenUpdate() {
  const route = useRoute();

  const navigation = useNavigation();
  const user = route.params;

  const [name, setName] = useState(user.name);
  const [mobile, setMobile] = useState(user.mobile);
  const [birthday, setBirthday] = useState(user.birthday);

  const canSave = [name, mobile, birthday].every(Boolean);

  async function saveProfile() {
    if (canSave) {
      try {
        db.collection("users")
          .doc(auth.currentUser.uid)
          .update({
            name: name,
            mobile: mobile,
            birthday: birthday,
          })
          .then(() => {
            console.log("User Updated!");
          });
      } catch (error) {
        console.error("Failed to update ", error.message);
      } finally {
        navigation.goBack();
      }
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome name={"arrow-left"} size={24} color={"black"} />
      </TouchableOpacity>
      <Text style={styles.title}>Edit Profile</Text>

      <TouchableOpacity onPress={() => {}}>
        <Image
          source={require("../assets/profile-placeholder.jpg")}
          style={styles.photo}
        />
        <Text style={styles.updateText}>Upload Photo</Text>
      </TouchableOpacity>
      <Text style={styles.fieldTitle}>Name:</Text>
      <TextInput
        style={styles.inputView}
        placeholder={"Name"}
        value={name}
        onChangeText={(text) => setName(text)}
        selectionColor={"gray"}
      />
      <Text style={styles.fieldTitle}>Mobile:</Text>
      <TextInput
        style={styles.inputView}
        placeholder={"Mobile"}
        value={mobile}
        onChangeText={(text) => setMobile(text)}
        selectionColor={"gray"}
      />
      <Text style={styles.fieldTitle}>Birthday (DD-MM-YYYY)</Text>
      <TextInput
        style={styles.inputView}
        placeholder={"Birthday (DD-MM-YYYY)"}
        value={birthday}
        onChangeText={(text) => setBirthday(text)}
        selectionColor={"gray"}
      />
      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          await saveProfile();
        }}
      >
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    padding: 25,
  },
  title: {
    fontWeight: "500",
    fontSize: 42,
    alignSelf: "center",
  },
  photo: {
    height: 160,
    width: 160,
    borderRadius: 200,
    alignSelf: "center",
  },
  fieldTitle: {
    fontSize: 18,
    margin: 10,
  },
  updateText: {
    width: 200,
    color: "rgba(0,0,0,0.5)",
    fontSize: 16,
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 20,
  },
  inputView: {
    backgroundColor: "#F1F0F5",
    borderRadius: 5,
    marginBottom: 15,
    padding: 20,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 15,
    width: "70%",
    marginBottom: 20,
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
