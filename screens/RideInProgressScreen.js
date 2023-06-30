import React from "react";
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

const RideInProgress = () => {
  const navigation = useNavigation();
  const currentRide = useSelector((state) => state.currentRide);
  const dummyText = "25";
  const dummyName = "Arthur Kabera";
  const dummyPlaceOne = "TRM, Thika Road";
  const dummyPlaceTwo = "Quickmart, Thindigua";

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
            <Text style={tw`ml-4 text-lg font-bold`}>{dummyName}</Text>
            <View style={tw`ml-auto`}>
              <Text style={tw`text-sm`}>Kshs {570}</Text>
              <Text style={tw`text-sm`}>{2.7} km</Text>
            </View>
          </View>

          {/* Part 2 */}
          <View style={tw`mb-5 pb-4`}>
            <Text style={tw`text-sm font-bold text-gray-400`}>PICK UP</Text>
            <Text style={tw`text-lg`}>{dummyPlaceOne}</Text>
          </View>
          <View style={tw`mb-5`}>
            <Text style={tw`text-sm font-bold text-gray-400`}>DROP OFF</Text>
            <Text style={tw`text-lg`}>{dummyPlaceTwo}</Text>
          </View>
          <View style={tw`flex-row justify-between mb-5`}>
            <Text style={tw`text-sm font-bold`}>Cash:</Text>
            <Text style={tw`text-sm`}>Kshs {280}</Text>
          </View>
          <View style={tw`flex-row justify-between mb-5`}>
            <Text style={tw`text-sm font-bold`}>Discount:</Text>
            <Text style={tw`text-sm`}>Kshs {300}</Text>
          </View>
          <View style={tw`flex-row justify-between mb-5`}>
            <Text style={tw`text-sm font-bold`}>Total Due:</Text>
            <Text style={tw`text-sm font-bold`}>Kshs {580}</Text>
          </View>

          {/* Part 3 */}
          <View style={tw`flex-row`}>
            <TouchableOpacity style={tw`flex-1 bg-gray-900 p-4 rounded mr-2`}>
              <Text style={tw`text-center text-white font-bold text-lg`}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`flex-1 bg-yellow-500 p-4 rounded ml-2`}>
              <Text style={tw`text-center text-gray-100 font-bold text-lg`}>
                Drop Off
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RideInProgress;
