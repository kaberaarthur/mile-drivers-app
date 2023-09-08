import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../firebaseConfig"; // Import your Firebase config
import firebase from "firebase/compat/app";
import { setPerson, selectPerson } from "../slices/personSlice";
import Modal from "react-native-modal";
import StarRating from "react-native-star-rating";

const RideInProgress = () => {
  const navigation = useNavigation();
  const currentRide = useSelector((state) => state.currentRide);
  const person = useSelector(selectPerson);
  const [isRatingModalVisible, setRatingModalVisible] = useState(false);
  const [rating, setRating] = useState(0);

  console.log("The Driver", person);

  // Use the useSelector hook to select the data from the currentRideSlice
  const currentRideData = useSelector((state) => state.currentRide);

  // Drop Off Code
  const handleDropOff = () => {
    // Get the ride ID
    const rideId = currentRideData["currentRide"]["id"];

    // Update Firestore document
    db.collection("rides")
      .doc(rideId)
      .update({
        rideStatus: "4",
      })
      .then(() => {
        console.log("Ride Status Changed: Ride Completed");
        setRatingModalVisible(true);
        // Now, navigate to OneRequestScreen
        // navigation.navigate("RideInProgressScreen");
      })
      .catch((error) => {
        console.error("Error updating ride status:", error);
      });
  };

  // Report Code
  const handleReportRide = () => {
    // Get the ride ID
    const rideId = currentRideData["currentRide"]["id"];

    console.log("Ride Data: ", currentRideData["currentRide"]);

    // Update Firestore document
    db.collection("rides")
      .doc(rideId)
      .update({
        rideStatus: "5",
      })
      .then(() => {
        console.log("Ride Status Changed: Driver Has Reported the Ride");
        // Now, navigate to OneRequestScreen
        // navigation.navigate("RideInProgressScreen");

        // Reference to the Firestore collection
        const reportsCollection = db.collection("reports");

        // Data for the document
        const reportData = {
          driverAuthID: person["authID"],
          driverEmail: person["email"],
          driverPhone: person["phone"],
          driverName: person["name"],
          riderAuthID: currentRideData["currentRide"]["riderId"],
          riderPhone: currentRideData["currentRide"]["riderPhone"],
          riderName: currentRideData["currentRide"]["riderPhone"],
          rideId: currentRideData["currentRide"]["id"],
          resolved: false,
          issue: "Driver has reported a ride In Progress",
          timeReported: firebase.firestore.Timestamp.fromDate(new Date()),
        };

        // Add a new document to the collection
        reportsCollection
          .add(reportData)
          .then((docRef) => {
            console.log("Created a Report for This Ride:", docRef.id);
          })
          .catch((error) => {
            console.error("Error adding document:", error);
          });
      })
      .catch((error) => {
        console.error("Error updating ride status:", error);
      });
  };

  function roundToDecimal(number, decimalPlaces) {
    if (decimalPlaces < 0) {
      throw new Error("Decimal places must be greater than or equal to zero.");
    }
    const factor = 10 ** decimalPlaces;
    return Math.round(number * factor) / factor;
  }

  // Function to update the rider's rating in the 'riders' collection using authID
  const updateRiderRatingByAuthID = async (authID, newRating) => {
    const db = firebase.firestore();
    const ridersCollection = db.collection("riders");

    try {
      // Query the rider document by authID
      const query = ridersCollection.where("authID", "==", authID);

      // Execute the query
      const querySnapshot = await query.get();

      if (querySnapshot.size === 0) {
        console.error(`Rider with authID ${authID} not found.`);
        return;
      }

      // Assuming there's only one matching rider (authID is unique)
      const riderDocRef = querySnapshot.docs[0].ref;

      // Update the rider's rating
      await riderDocRef.update({
        rating: newRating, // Replace 'rating' with the actual field name in your document
      });

      console.log(`Rider with authID ${authID} rating updated to ${newRating}`);
    } catch (error) {
      console.error("Error updating rider rating:", error);
    }
  };

  const handleRateRider = (rating) => {
    console.log("Selected Rating:", rating);

    // Take Existing Rating, Find the Mean
    const currentRating = currentRideData["currentRide"]["riderRating"];
    const newRating = roundToDecimal(
      (parseFloat(currentRating) + parseFloat(rating)) / 2,
      1
    );

    console.log(
      "Newer Rating: " +
        roundToDecimal((parseFloat(currentRating) + parseFloat(rating)) / 2, 1)
    );

    const riderAuthID = currentRideData["currentRide"]["riderId"];
    updateRiderRatingByAuthID(riderAuthID, newRating);

    // Close the modal after rating
    setRatingModalVisible(false);

    // Navigate to the HomeScreen
    navigation.navigate("HomeScreen");
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-yellow-500 p-4`}>
      <TouchableOpacity onPress={() => navigation.navigate("RequestsScreen")}>
        <Icon
          type="ionicon"
          name="arrow-back-outline"
          color="black"
          size={24}
        />
      </TouchableOpacity>

      <View style={tw`flex-1 justify-center`}>
        <View style={tw`bg-gray-100 p-6 rounded-lg h-3/4`}>
          {/* Part 1 */}
          <View style={tw`flex-row items-center mb-5`}>
            <Image
              style={tw`w-20 h-20 rounded-full`}
              source={{ uri: "https://links.papareact.com/3pn" }}
            />
            <Text style={tw`ml-4 text-lg font-bold`}>
              {currentRideData["currentRide"]["riderName"]}
            </Text>
          </View>

          {/* Part 2 */}
          <View style={tw`mb-5`}>
            <Text style={tw`text-sm font-bold text-gray-400`}>PICK UP</Text>
            <Text style={tw`text-lg`}>
              {currentRideData["currentRide"]["rideOrigin"][0]["description"]}
            </Text>
          </View>
          <View style={tw`mb-5`}>
            <Text style={tw`text-sm font-bold text-gray-400`}>DROP OFF</Text>
            <Text style={tw`text-lg`}>
              {
                currentRideData["currentRide"]["rideDestination"][0][
                  "description"
                ]
              }
            </Text>
          </View>
          <View style={tw`flex-row justify-between mb-5`}>
            <Text style={tw`text-sm font-bold`}>Client Pays:</Text>
            <Text style={tw`text-sm`}>
              Kshs {currentRideData["currentRide"]["totalClientPays"]}
            </Text>
          </View>
          <View style={tw`flex-row justify-between mb-5`}>
            <Text style={tw`text-sm font-bold`}>Discount:</Text>
            <Text style={tw`text-sm`}>
              Kshs {currentRideData["currentRide"]["totalDeduction"]}
            </Text>
          </View>
          <View style={tw`flex-row justify-between mb-5`}>
            <Text style={tw`text-sm font-bold`}>Ride Total:</Text>
            <Text style={tw`text-sm font-bold`}>
              Kshs {currentRideData["currentRide"]["totalFareBeforeDeduction"]}
            </Text>
          </View>

          {/* Part 3 */}
          <View style={tw`flex-row`}>
            <TouchableOpacity
              style={tw`flex-1 bg-gray-900 p-4 rounded mr-2`}
              onPress={handleReportRide}
            >
              <Text style={tw`text-center text-white font-bold text-base`}>
                Report Ride
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-1 bg-yellow-500 p-4 rounded ml-2`}
              onPress={handleDropOff}
            >
              <Text style={tw`text-center text-gray-100 font-bold text-base`}>
                Drop Off
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal isVisible={isRatingModalVisible}>
        <View style={tw`bg-white p-6 rounded-lg`}>
          <Text>Rate the rider</Text>

          <StarRating
            disabled={false}
            maxStars={5}
            rating={rating}
            selectedStar={(rating) => setRating(rating)}
            fullStarColor={"#f1c40f"} // Customize the color of filled stars
          />

          <TouchableOpacity onPress={() => handleRateRider(rating)}>
            <Text style={tw`p-4 text-base font-semibold`}>Submit Rating</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default RideInProgress;
