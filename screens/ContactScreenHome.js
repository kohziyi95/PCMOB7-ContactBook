import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
//   import { useDispatch, useSelector } from "react-redux";
import { CONTACT_SCREEN } from "../constants";
//   import { fetchPosts } from "../features/notesSlice";
//   import Animated, { SlideInLeft, SlideOutRight } from "react-native-reanimated";
import { db, auth } from "../database/firebaseDB";
import { FontAwesome } from "@expo/vector-icons";

//   const contacts = [
//     {
//       id: 1,
//       name: "John Tan",
//       mobile: "23489228",
//       email: "hello@test.com"
//     },
//   ];

export default function ContactScreenHome() {
  const navigation = useNavigation();

  const [contacts, setContacts] = useState([]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const subscriber = db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("contacts")
      .onSnapshot((querySnapshot) => {
        let contactArray = [];
        querySnapshot.forEach((documentSnapshot) => {
          console.log(
            "Contact ID: ",
            documentSnapshot.id,
            documentSnapshot.data()
          );
          contactArray.push(documentSnapshot.data());
        });
        setContacts(contactArray);
      });

    return () => subscriber();
  }, []);

  function renderItem({ item }) {
    return (
      // <Animated.View
      //   entering={SlideInLeft.delay(item.index * 100)}
      //   exiting={SlideOutRight.delay(300)}
      // >
      <View>
        <TouchableOpacity
          style={styles.noteCard}
          onPress={() => {
            navigation.navigate(CONTACT_SCREEN.Details, item);
          }}
        >
          <FontAwesome name="user" size={34} color="black" />
          <Text style={styles.contactName}>{item.name}</Text>
          {/* <Text style={styles.noteCardBodyText}>{item.mobile}</Text> */}
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: "gray",
            width: "80%",
            alignSelf: "center",
          }}
        />
      </View>

      // </Animated.View>
    );
  }
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Your Contacts</Text>

      {/* {isLoading && <ActivityIndicator />} */}
      {contacts.length == 0 && <Text style={{ fontSize: 24, alignSelf: "center", marginTop: 60, }}>No Contacts Found.</Text>}

      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(contact) => contact.id.toString()}
      />

      <View style={{ flex: 1 }} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate(CONTACT_SCREEN.Add);
        }}
      >
        <Text style={styles.buttonText}>Add New Contact</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  noteCard: {
    padding: 15,
    paddingLeft: 30,

    flexDirection: "row",
    alignItems: "center",
  },
  contactName: {
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 15,
  },
  noteCardBodyText: {
    fontSize: 12,
    fontWeight: "300",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    padding: 25,
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 20,
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
