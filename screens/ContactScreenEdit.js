import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  KeyBoardAwareScrollView,
  ScrollView,
} from "react-native";
import uuid from "react-uuid";

import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CONTACT_SCREEN } from "../constants";
//   import Animated, { SlideInLeft, SlideOutRight } from "react-native-reanimated";
import { db, auth } from "../database/firebaseDB";

import { FontAwesome } from "@expo/vector-icons";

export default function ContactScreenEdit() {
  const navigation = useNavigation();
  const [contact, setContact] = useState({});
  const route = useRoute();

  const params = route.params;

  const id  = params.id;
  const [name, setName] = useState(params.name);
  const [mobile, setMobile] = useState(params.mobile);
  const [email, setEmail] = useState(params.email);
  const [birthday, setBirthday] = useState(params.birthday);
  const [igHandle, setIgHandle] = useState(params.igHandle);
  const [teleHandle, setTeleHandle] = useState(params.teleHandle);



  const canSave = [name, mobile, birthday, email].every(Boolean);

  async function updateContact() {
    if (canSave) {
      try {
        console.log("ID", id)
        db.collection("users")
          .doc(auth.currentUser.uid)
          .collection("contacts")
          .doc(id)
          .update({
            name: name,
            mobile: mobile,
            email: email,
            birthday: birthday,
            teleHandle: teleHandle,
            igHandle: igHandle,
          })
          .then(() => {
            console.log("Contact Updated!");
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
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.goBack(params)}>
          <FontAwesome name={"arrow-left"} size={24} color={"black"} />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Contact</Text>

        <TouchableOpacity onPress={() => {}}>
          <Image
            source={require("../assets/profile-placeholder.jpg")}
            style={styles.photo}
          />
          <Text style={styles.updateText}>Upload Photo</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.inputView}
          placeholder={"Name"}
          value={name}
          onChangeText={(text) => setName(text)}
          selectionColor={"gray"}
        />
        <TextInput
          style={styles.inputView}
          placeholder={"Mobile"}
          value={mobile}
          onChangeText={(text) => setMobile(text)}
          selectionColor={"gray"}
        />
        <TextInput
          style={styles.inputView}
          placeholder={"Email"}
          value={email}
          onChangeText={(text) => setEmail(text)}
          selectionColor={"gray"}
        />
        <TextInput
          style={styles.inputView}
          placeholder={"Telegram Handle"}
          value={teleHandle}
          onChangeText={(text) => setTeleHandle(text)}
          selectionColor={"gray"}
        />
        <TextInput
          style={styles.inputView}
          placeholder={"Instagram Handle"}
          value={igHandle}
          onChangeText={(text) => setIgHandle(text)}
          selectionColor={"gray"}
        />
        <TextInput
          style={styles.inputView}
          placeholder={"Birthday (DD-MM-YYYY)"}
          value={birthday}
          onChangeText={(text) => setBirthday(text)}
          selectionColor={"gray"}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await updateContact();
          }}
        >
          <Text style={styles.buttonText}>Update Contact</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
      </ScrollView>
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
    // marginBottom: 20,
    alignSelf: "center",
  },
  photo: {
    height: 140,
    width: 140,
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
