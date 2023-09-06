import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setCurrentRide } from "../slices/currentRideSlice"; // Update this path based on where your currentRideSlice isi located
import { db, auth } from "../firebaseConfig"; // Import your Firebase config
import firebase from "firebase/compat/app";

const OneRequestScreen = ({ route }) => {
  const navigation = useNavigation();
  const { ride } = route.params;
  const dispatch = useDispatch();

  // Log the ride object
  console.log("Ride:", ride);

  const goToPickUpScreen = () => {
    dispatch(
      setCurrentRide({
        riderProfilePicture: ride.riderAvatar,
        riderName: ride.riderName,
        amountOfTheRide: ride.tripFare.amount,
        pickupPoint: ride.pickup,
        dropOffPoint: ride.dropoff,
        tripFare: {
          amount: ride.tripFare.amount,
          discount: ride.tripFare.discount,
          totalDue: ride.tripFare.totalAmount,
        },
      })
    );
    navigation.navigate("PickUpScreen");
  };

  const handleCancelRequest = () => {
    // Get the ride ID
    const rideId = ride.id;

    console.log(rideId);

    // Update Firestore document
    db.collection("rides")
      .doc(rideId)
      .update({ rideStatus: "1" })
      .then(() => {
        console.log("Ride status updated to 2");
        // Now, navigate to OneRequestScreen
        navigation.navigate("HomeScreen");
      })
      .catch((error) => {
        console.error("Error updating ride status:", error);
      });
  };

  return (
    <SafeAreaView style={tw`pt-10 px-6 flex-1`}>
      <View style={tw`flex-row items-center justify-between mb-5`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            type="ionicon"
            name="arrow-back-outline"
            color="black"
            size={24}
          />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>#{ride.rideID}</Text>
      </View>

      <View style={tw`flex-row items-center mb-5`}>
        <Image
          style={tw`w-20 h-20 rounded-full mr-2`}
          source={{ uri: ride.riderAvatar }}
        />
        <View style={tw`pl-4`}>
          <Text style={tw`text-lg font-bold`}>{ride.riderName}</Text>
          <Text style={tw`text-sm`}>{ride.riderPhone}</Text>
        </View>
      </View>

      <View style={tw`flex-row justify-between mb-5`}>
        <TouchableOpacity
          style={tw`items-center`}
          onPress={() => {
            Linking.openURL(`tel:${ride.riderPhone}`);
          }}
        >
          <View style={tw`items-center`}>
            <Icon
              type="ionicon"
              name="call"
              color="white"
              size={24}
              containerStyle={tw`bg-green-600 p-2 rounded-lg`}
            />
            <Text style={tw`text-sm text-center`}>Call</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`items-center`}
          onPress={() => navigation.navigate("ChatScreen", { ride: ride })}
        >
          <View style={tw`items-center`}>
            <Icon
              type="ionicon"
              name="chatbubble-ellipses"
              color="white"
              size={24}
              containerStyle={tw`bg-blue-600 p-2 rounded-lg`}
            />
            <Text style={tw`text-sm text-center`}>Message</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`items-center`}
          onPress={handleCancelRequest}
        >
          <View style={tw`items-center`}>
            <Icon
              type="ionicon"
              name="trash"
              color="white"
              size={24}
              containerStyle={tw`bg-gray-500 p-2 rounded-lg`}
            />
            <Text style={tw`text-sm text-center`}>Cancel</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={tw`bg-yellow-500 rounded-sm p-2`}
        onPress={goToPickUpScreen}
      >
        <Text style={tw`text-center text-black font-bold text-lg`}>
          GO TO PICK UP
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OneRequestScreen;
