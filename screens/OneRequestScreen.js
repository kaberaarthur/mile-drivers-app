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

  // Convert Date Object to String
  function formatDateToCustomString(dateObject) {
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 to month because it's zero-based
    const day = dateObject.getDate().toString().padStart(2, "0");
    const hours = dateObject.getHours().toString().padStart(2, "0");
    const minutes = dateObject.getMinutes().toString().padStart(2, "0");
    const seconds = dateObject.getSeconds().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  }

  const goToPickUpScreen = () => {
    // Clone the ride object to avoid modifying the original object
    const updatedRide = { ...ride };
    console.log(typeof updatedRide.dateCreated.toISOString());
    updatedRide.dateCreated = updatedRide.dateCreated.toISOString();
    // console.log(updatedRide.dateCreated.toDate());

    /*
    // Convert the dateCreated field to a JavaScript Date objec
    if (updatedRide.dateCreated instanceof firebase.firestore.Timestamp) {
      // updatedRide.dateCreated = updatedRide.dateCreated.toDate();

      updatedRide.dateCreated = formatDateToCustomString(
        updatedRide.dateCreated
      );
    }
    */

    dispatch(setCurrentRide(updatedRide));
    navigation.navigate("PickUpScreen", { ride: updatedRide });
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
