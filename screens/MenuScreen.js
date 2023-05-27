import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

function MenuScreen({ navigation }) {
  const userData = {
    name: "John Doe",
    rating: "4.7",
  };

  const handleEditProfile = () => {
    // This function will be used to handle profile editing
    console.log("Edit Profile Clicked");
  };

  const menuItems = [
    { name: "Sign Up", icon: "person-add-outline", screen: "SignUpScreen" },
    { name: "Verify Phone", icon: "call-outline", screen: "VerifyPhoneScreen" },
    { name: "Home", icon: "home-outline", screen: "HomeScreen" },
    {
      name: "Requests",
      icon: "notifications-outline",
      screen: "RequestsScreen",
    },
    {
      name: "One Request",
      icon: "paper-plane-outline",
      screen: "OneRequestScreen",
    },
    { name: "Ride", icon: "car-outline", screen: "RideScreen" },
    { name: "Pickup", icon: "location-outline", screen: "PickupScreen" },
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
          <Text style={tw`text-xl font-bold mb-2`}>{userData.name}</Text>
          <TouchableOpacity onPress={handleEditProfile}>
            <Text style={[tw`text-lg mb-2`, { color: "#F5B800" }]}>
              Edit Profile
            </Text>
          </TouchableOpacity>
          <View style={tw`flex-row items-center`}>
            <Icon type="ionicon" name="star-outline" color="gold" size={24} />
            <Text style={tw`text-lg ml-2 mb-2`}>{userData.rating}</Text>
          </View>
        </View>
      </View>
      <View style={tw`h-0.5 bg-gray-400 mb-8`} />

      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={tw`flex-row items-center mb-5`}
          onPress={() => navigation.navigate(item.screen)}
        >
          <View style={[tw`p-2 rounded-full`, { backgroundColor: "#F5B800" }]}>
            <Icon type="ionicon" name={item.icon} color="black" size={24} />
          </View>
          <Text style={tw`ml-4 text-lg`}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
}

export default MenuScreen;

const styles = StyleSheet.create({
  customColor: {
    backgroundColor: "#F5B800",
  },
});
