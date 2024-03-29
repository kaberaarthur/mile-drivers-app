import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useNavigation, useEffect } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../slices/userSlice";
import { selectPerson, setPerson } from "../slices/personSlice";

function MenuScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const person = useSelector(selectPerson);
  console.log("Person Data:", person["otpDate"]);

  /*
  useEffect(() => {
    if (person) {
      console.log("Person data:", person);
      // console.log("Formatted Date and Time:", person.dateRegistered);
    }
  }, [person]);
  */

  const userData = {
    name: "John Doe",
    rating: "4.7",
  };

  const handleEditProfile = () => {
    // This function will be used to handle profile editing
    console.log("Edit Profile Clicked");
    navigation.navigate("EditProfileScreen");
  };

  const menuItems = [
    { name: "History", icon: "albums-outline", screen: "HistoryScreen" },

    {
      name: "Notifications",
      icon: "copy-outline",
      screen: "NotificationScreen",
    },

    {
      name: "Vehicle Management",
      icon: "car-sport-outline",
      screen: "VehicleManagementScreen",
    },

    {
      name: "Document Management",
      icon: "copy-outline",
      screen: "DocumentManagementScreen",
    },

    {
      name: "Finances",
      icon: "cash-outline",
      screen: "FinanceScreen",
    },
  ];

  return (
    <SafeAreaView style={tw`pt-10 px-6 flex-1 bg-white`}>
      <View style={tw`flex-row items-center justify-between mb-5`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            type="ionicon"
            name="arrow-back-outline"
            color="white"
            size={24}
            containerStyle={tw`bg-black p-2 rounded-full`}
          />
        </TouchableOpacity>
        <Text style={tw`text-xl font-semibold`}>Menu</Text>
        <View style={tw`w-8`} />
      </View>

      <View style={tw`flex-row mb-8`}>
        <Image
          style={tw`w-24 h-24 rounded-full`}
          source={{ uri: "https://via.placeholder.com/100" }} // Replace with actual profile picture URL
        />
        <View style={tw`ml-4 pl-8`}>
          <Text style={tw`text-xl font-bold mb-2`}>{person["name"]}</Text>
          <TouchableOpacity onPress={handleEditProfile}>
            <Text style={[tw`text-lg mb-2`, { color: "#000" }]}>
              Edit Profile
            </Text>
          </TouchableOpacity>
          <View style={tw`flex-row items-center`}>
            <Icon type="ionicon" name="star-outline" color="gold" size={24} />
            <Text style={tw`text-lg ml-2 mb-2`}>{person["rating"]}</Text>
          </View>
        </View>
      </View>
      <View style={tw`h-0.5 bg-gray-400 mb-8`} />
      <ScrollView>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={tw`flex-row items-center mb-5`}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View
              style={[tw`p-2 rounded-full`, { backgroundColor: "#F5B800" }]}
            >
              <Icon type="ionicon" name={item.icon} color="black" size={24} />
            </View>
            <Text style={tw`ml-4 text-lg`}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default MenuScreen;

const styles = StyleSheet.create({
  customColor: {
    backgroundColor: "#F5B800",
  },
});
