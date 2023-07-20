import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";

import { db, auth } from "../firebaseConfig";

const vehicles = [
  {
    id: 1,
    brand: "Mazda",
    model: "Demio",
    licensePlate: "KDD 130D",
    approved: true,
  },
];

const VehicleManagementScreen = () => {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <View
        style={tw`pt-10 px-4 flex-row items-center justify-between mb-4 bg-white`}
      >
        <Icon
          type="ionicon"
          name="arrow-back"
          color="black"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={tw`text-lg font-bold`}>Vehicle Management</Text>
        <View style={tw`w-6`} />
      </View>

      <ScrollView>
        {vehicles.map(({ id, brand, model, licensePlate, approved }) => (
          <View
            key={id}
            style={tw`bg-white rounded-sm mx-4 mt-2 p-4 flex-row items-center`}
          >
            <View style={tw`p-4 rounded-full bg-yellow-500 mr-2`}>
              <Icon type="ionicon" name="car-outline" color="black" size={24} />
            </View>

            <View style={tw`flex-1 pl-2`}>
              <Text style={tw`text-lg font-bold`}>
                {brand} {model}
              </Text>
              <Text style={tw`text-sm`}>{licensePlate}</Text>
            </View>

            {approved ? (
              <Icon
                type="ionicon"
                name="checkmark-circle"
                color="#3b82f6"
                size={24}
              />
            ) : (
              <View style={tw`border border-blue-500 rounded-full w-6 h-6`} />
            )}
          </View>
        ))}
      </ScrollView>

      {vehicles.length <= 5 && (
        <TouchableOpacity
          style={[
            tw`absolute bg-yellow-500 rounded-full p-2`,
            { bottom: 20, alignSelf: "center" },
          ]}
          onPress={() => navigation.navigate("AddVehicleScreen")}
        >
          <Icon type="ionicon" name="add" color="black" size={48} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VehicleManagementScreen;
