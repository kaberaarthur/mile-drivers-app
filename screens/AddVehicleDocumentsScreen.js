import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import { Icon } from "react-native-elements";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";

import { db, auth } from "../firebaseConfig";
import firebase from "firebase/compat/app";

const AddVehicleDocumentsScreen = () => {
  const route = useRoute();
  const { vehicleID } = route.params;
  const navigation = useNavigation();

  const [vehicleData, setVehicleData] = useState(null);
  const [vehicleError, setVehicleError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Reference to the Firestore document with the given vehicleID
    const vehicleRef = db.collection("vehicles").doc(vehicleID);

    // Fetch the document and update the state with the data
    vehicleRef.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        setVehicleData(docSnapshot.data());
        console.log("Vehicle Data", docSnapshot.data());
      } else {
        console.log(`Document with ID ${vehicleID} not found.`);
        setVehicleError(`Document with ID ${vehicleID} not found.`);
      }
    });
  }, [vehicleID]);

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <View
        style={tw`pt-10 px-4 flex-row items-center justify-between mb-4 bg-white`}
      >
        <Icon
          type="ionicon"
          name="arrow-back"
          color="black"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={tw`text-lg font-bold`}>Vehicle Management</Text>
        <View style={tw`w-6`} />
      </View>
      <Text style={tw`pt-2 px-2 font-semibold`}>
        Vehicle:{" "}
        {vehicleData["brand"] +
          " " +
          vehicleData["model"] +
          " " +
          vehicleData["year"] +
          " " +
          vehicleData["licensePlate"]}
      </Text>
    </SafeAreaView>
  );
};

export default AddVehicleDocumentsScreen;
