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

const OneRequestScreen = ({ route }) => {
  const navigation = useNavigation();
  const { ride } = route.params;

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
          <Text style={tw`text-sm`}>Kshs {ride.tripFare.amount}</Text>
          <Text style={tw`text-sm`}>{ride.distance} km</Text>
        </View>
      </View>

      <View style={tw`mb-5`}>
        <Text style={tw`text-sm font-bold text-gray-300`}>PICK UP</Text>
        <Text style={tw`text-lg`}>{ride.pickup}</Text>
      </View>

      <View style={tw`mb-5`}>
        <Text style={tw`text-sm font-bold text-gray-300`}>DROP OFF</Text>
        <Text style={tw`text-lg`}>{ride.dropoff}</Text>
      </View>

      <View
        style={tw`bg-gray-100 py-3 mb-5 flex-row justify-between items-center`}
      >
        <View>
          <Text style={tw`text-base font-bold`}>TRIP FARE</Text>
          <Text style={tw`text-sm`}>Amount: Kshs {ride.tripFare.amount}</Text>
          <Text style={tw`text-sm`}>
            Discount: Kshs {ride.tripFare.discount}
          </Text>

          <Text style={tw`text-base text-right`}>
            Total Amount: Kshs {ride.tripFare.totalAmount}
          </Text>
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
          onPress={() => navigation.navigate("ChatScreen")}
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
        <TouchableOpacity style={tw`items-center`}>
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

      <TouchableOpacity style={tw`bg-yellow-500 rounded-sm p-2`}>
        <Text style={tw`text-center text-black font-bold text-lg`}>
          GO TO PICK UP
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OneRequestScreen;
