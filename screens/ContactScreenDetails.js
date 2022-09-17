import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Linking,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CONTACT_SCREEN } from "../constants";

import { db, auth } from "../database/firebaseDB";
import { FontAwesome } from "@expo/vector-icons";

export default function ContactScreenDetails() {
  const route = useRoute();
  const navigation = useNavigation();

  const [params, setParams] = useState(route.params);
  const [id, setId] = useState(params.id);
  const [name, setName] = useState(params.name);
  const [email, setEmail] = useState(params.email);
  const [mobile, setMobile] = useState(params.mobile);
  const [teleHandle, setTeleHandle] = useState(params.teleHandle);
  const [igHandle, setIgHandle] = useState(params.igHandle);
  const [birthday, setBirthday] = useState(params.birthday);

  useEffect(() => {
    const subscriber = db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("contacts")
      .doc(id)
      .onSnapshot((documentSnapshot) => {
        console.log("Contact exists: ", documentSnapshot.exists);

        if (documentSnapshot.exists) {
          console.log("Gragging Contact data: ", documentSnapshot.data());
          let contact = documentSnapshot.data();
          setName(contact.name);
          setEmail(contact.email);
          setMobile(contact.mobile);
          setTeleHandle(contact.teleHandle);
          setIgHandle(contact.igHandle);
          setBirthday(contact.birthday);
        }
      });
    return () => subscriber();
  }, []);

  function deleteContact(id) {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("contacts")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Contact Deleted.");
        navigation.navigate(CONTACT_SCREEN.Home);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const [showBox, setShowBox] = useState(true);

  const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to delete this contact?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            deleteContact(id);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name={"arrow-left"} size={24} color={"black"} />
        </TouchableOpacity>
        <Image
          source={require("../assets/profile-placeholder.jpg")}
          style={styles.photo}
        />
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.updateText}>Upload Photo</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{name}</Text>
        <View style={{ padding: 20, alignSelf: "center" }}>
          <Text style={styles.text}>
            <FontAwesome name="phone" size={36} color="black" />
            {"      "}
            {mobile}
          </Text>

          <Text style={styles.text}>
            <FontAwesome name="envelope" size={36} color="black" />
            {"     "}
            {email}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "http://www.instagram.com/" + igHandle.substring(1)
              );
            }}
          >
            <Text style={styles.linkText}>
              <FontAwesome name="instagram" size={42} color="black" />
              {"     "}
              {igHandle}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://t.me/" + igHandle.substring(1));
            }}
          >
            <Text style={styles.linkText}>
              <FontAwesome name="telegram" size={36} color="black" />
              {"     "}
              {teleHandle}
            </Text>
          </TouchableOpacity>

          <Text style={styles.text}>
            <FontAwesome name="birthday-cake" size={36} color="black" />
            {"     "}
            {birthday}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate(CONTACT_SCREEN.Edit, {
                id: id,
                name: name,
                mobile: mobile,
                email: email,
                birthday: birthday,
                teleHandle: teleHandle,
                igHandle: igHandle,
              });
            }}
          >
            <Text style={styles.buttonText}>Edit Details</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              showConfirmDialog();
            }}
          >
            <Text style={styles.buttonText}>Delete Contact</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    height: 160,
    width: 160,
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
  linkText: {
    fontWeight: "400",
    fontSize: 24,
    color: "rgba(0, 138, 180, 0.75)",
    margin: 15,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 15,
    // width: "30%",
    alignSelf: "center",
    flex: 1,
    margin: 10,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 17,
    padding: 20,
    color: "white",
  },
});
