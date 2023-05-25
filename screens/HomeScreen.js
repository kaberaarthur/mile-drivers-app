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
import { SafeAreaView, Text } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useEffect } from "react";

const HomeScreen = () => {
  const dispatch = useDispatch();

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

  return (
    <SafeAreaView style={tw`px-5 py-10`}>
      <Text>HomeScreen</Text>
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

export default HomeScreen;
