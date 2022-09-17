import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function HomeScreen() {
  const navigation = useNavigation();

  const contacts = [
    {
      id: 1,
      name: "John Tan",
      birthday: "09-09-1998",
    },
    {
      id: 2,
      name: "Peter Chan",
      birthday: "20-09-1993",
    },
  ];
  function renderItem({ item }) {
    return (
      // <Animated.View
      //   entering={SlideInLeft.delay(item.index * 100)}
      //   exiting={SlideOutRight.delay(300)}
      // >
      <View>
        <TouchableOpacity style={styles.noteCard} onPress={() => {}}>
          <Text style={styles.contactName}>{item.birthday}</Text>
          <Text>{"         "}</Text>
          <Text style={styles.contactName}>{item.name}</Text>

          {/* <Text style={styles.noteCardBodyText}>{item.mobile}</Text> */}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <View style={styles.dateContainer}>
        <Text
          style={{
            fontWeight: "500",
            fontSize: 32,
            marginBottom: 10,
            alignSelf: "center",
          }}
        >
          Saturday
        </Text>
        <Text
          style={{
            fontWeight: "400",
            fontSize: 22,
            marginBottom: 20,
            alignSelf: "center",
          }}
        >
          17/09/2022
        </Text>
      </View>
      <Text style={styles.calendarTitle}>
        Upcoming Birthdays for the Month of September!
      </Text>
      <ScrollView style={styles.calendar}>
        <FlatList
          data={contacts}
          renderItem={renderItem}
          keyExtractor={(contact) => contact.id.toString()}
        />
      </ScrollView>
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
  dateContainer: {
    flex: 0.3,
    padding: 25,
    margin: 10,
    alignItems: "center",
  },
  noteCard: {
    borderColor: "gray",
    borderWidth: "1px",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
  },
  calendar: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    margin: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 20,
    alignSelf: "center",
  },
  calendarTitle: {
    fontWeight: "500",
    fontSize: 20,
    textAlign: "center",
    alignSelf: "center",
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

  buttonText: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 17,
    padding: 20,
    color: "white",
  },
});
