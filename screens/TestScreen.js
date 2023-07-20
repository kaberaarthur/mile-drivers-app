import { useDispatch, useSelector } from "react-redux";
import {
  selectDriver,
  setDriver,
  setDriverId,
  setDriverName,
  setDriverPhone,
  setCarMake,
  setCarModel,
  setLicensePlate,
  setRating,
  setIsAvailable,
} from "../slices/driverSlice.js";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import { db, auth } from "../firebaseConfig";

const TestScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const docRef = db.collection("lastPartnerCode").doc("sz9CX7al5MgsvGsvaRYM");
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Last Number Data: ", doc.data());
        }
      })
      .catch((error) => {
        console.log("Error getting lastNumber document:", error);
      });
  });

  useEffect(() => {
    const driver = {
      driverId: "59567001",
      driverName: "David Njoroge",
      driverPhone: "+254 790 485 731",
      carMake: "Daihatsu",
      carModel: "Mira",
      licensePlate: "KDA 755E",
      rating: 4.5,
      isAvailable: true,
    };

    dispatch(setDriver(driver));
  }, []);

  const driver = useSelector(selectDriver);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`px-5 py-10 flex-1`}>
      <View style={tw`flex-row justify-between items-center`}>
        <Text style={tw`text-xl font-semibold`}>HomeScreen</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("MenuScreen")}
          style={tw`bg-black p-2 rounded-full`}
        >
          <Icon type="ionicon" name="menu-outline" color="white" size={24} />
        </TouchableOpacity>
      </View>
      <Text>Driver ID: {driver.driverId}</Text>
      <Text>Driver Name: {driver.driverName}</Text>
      <Text>Driver Phone: {driver.driverPhone}</Text>
      <Text>Car Make: {driver.carMake}</Text>
      <Text>Car Model: {driver.carModel}</Text>
      <Text>License Plate: {driver.licensePlate}</Text>
      <Text>Rating: {driver.rating}</Text>
      <Text>Is Available: {driver.isAvailable ? "Yes" : "No"}</Text>
    </SafeAreaView>
  );
};

export default TestScreen;
