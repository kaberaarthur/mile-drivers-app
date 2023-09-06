import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../slices/userSlice";
import { selectPerson, setPerson } from "../slices/personSlice";
import { auth } from "../firebaseConfig"; // Import your Firebase config
import firebase from "firebase/compat/app";

const RequestCard = ({ request }) => {
  const firstName = request.riderName.split(" ")[0];
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const person = useSelector(selectPerson);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to SignUpScreen when no user is logged in
      navigation.navigate("SignUpScreen");
    }
  }, [loading, user, navigation]);

  if (loading) {
    return null; // Or return a loading spinner.
  }

  const handleAcceptRequest = () => {
    navigation.navigate("OneRequestScreen", { ride: request });
    console.log(request.rideID);
  };

  function roundToNearestTen(num) {
    return Math.round(num / 10) * 10;
  }

  return (
    <View style={tw`bg-white rounded-sm p-4 mb-4 pb-2`}>
      <View style={tw`pt-4`}></View>
      <View style={tw`flex-row justify-between items-center `}>
        <View style={tw`flex-row items-center`}>
          <Image
            style={tw`w-10 h-10 rounded-full mr-2`}
            source={{ uri: request.riderAvatar }}
          />
          <Text style={tw`text-lg font-bold pl-2`}>{firstName}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={tw`bg-black rounded-sm p-2 mt-4`}
        onPress={handleAcceptRequest}
      >
        <Text style={tw`text-center text-white font-bold`}>Accept Request</Text>
      </TouchableOpacity>
      <View style={tw`pb-4`}></View>
    </View>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [driver, setDriver] = useState({
    isOnline: true,
    driverId: "58674001",
    driverName: "Muiruri Kabera",
    driverPhone: "+254790485731",
    carMake: "Toyota",
    carModel: "Vitz",
    licensePlate: "KDB 754D",
    rating: "4.7",
    isAvailable: true,
  });

  const [newRides, setNewRides] = useState([]); // Firestore data state

  useEffect(() => {
    // Initialize Firestore if not already initialized
    const db = firebase.firestore();

    // Define the query to fetch rides with rideStatus === "1"
    const query = db.collection("rides").where("rideStatus", "==", "1");

    // Subscribe to the query and update the state when data changes
    const unsubscribe = query.onSnapshot((querySnapshot) => {
      const updatedRides = [];
      querySnapshot.forEach((doc) => {
        // Get the ride data and add it to the updatedRides array
        updatedRides.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setNewRides(updatedRides);

      console.log("New Rides: ", updatedRides);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleToggleStatus = () => {
    // Toggle driver status here
    setDriver((prevDriver) => ({
      ...prevDriver,
      isOnline: !prevDriver.isOnline,
    }));
  };

  // ... (no changes to the fetchData function)

  return (
    <SafeAreaView style={tw`pt-10 flex-1`}>
      <View style={tw`flex-row items-center justify-between mb-5 px-6`}>
        <TouchableOpacity onPress={() => navigation.navigate("MenuScreen")}>
          <Icon type="ionicon" name="menu-outline" color="black" size={24} />
        </TouchableOpacity>
        <Text style={tw`font-bold text-base`}>
          {driver.isOnline ? "Online" : "Offline"}
        </Text>
        <TouchableOpacity onPress={handleToggleStatus}>
          <Icon
            type="font-awesome"
            name={driver.isOnline ? "toggle-on" : "toggle-off"}
            color="black"
            size={24}
          />
        </TouchableOpacity>
      </View>

      <View
        style={tw`${driver.isOnline ? "bg-yellow-500" : "bg-gray-500"} p-4`}
      >
        {driver.isOnline ? (
          <Text style={tw`text-black font-bold`}>
            You have{" "}
            {newRides.length === 1
              ? "1 new request"
              : `${newRides.length} new requests`}
            .
          </Text>
        ) : (
          <View style={tw`flex-row items-center`}>
            <Icon type="ionicon" name="moon-outline" color="white" size={24} />
            <View style={tw`pl-2`}>
              <Text style={tw`text-white font-bold`}>You are offline !</Text>
              <Text style={tw`text-white`}>
                Go online to start accepting jobs.
              </Text>
            </View>
          </View>
        )}
      </View>

      <FlatList
        data={newRides} // Use Firestore data here
        renderItem={({ item }) => <RequestCard request={item} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={tw`p-4`}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
