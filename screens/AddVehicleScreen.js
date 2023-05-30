import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";

const AddVehicleScreen = () => {
  const navigation = useNavigation();

  // Initialize states for each input field
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [color, setColor] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  // Function to handle creation of a new vehicle
  const handleCreateVehicle = () => {
    const vehicleData = [brand, model, year, licensePlate, color];
    console.log(vehicleData);

    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
    setBrand("");
    setModel("");
    setYear("");
    setLicensePlate("");
    setColor("");

    navigation.goBack();
  };

  const isFormFilled = brand && model && year && licensePlate && color;

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
        <Text style={tw`text-lg font-bold`}>Add a New Vehicle</Text>
        <View style={tw`w-6`} />
      </View>

      <View style={tw`px-4`}>
        <Text style={tw`uppercase text-gray-400 mb-2`}>Vehicle Brand</Text>
        <TextInput
          style={tw`bg-white p-2 rounded-sm mb-4`}
          placeholder="Mazda"
          onChangeText={setBrand}
          value={brand}
        />

        <Text style={tw`uppercase text-gray-400 mb-2`}>Model</Text>
        <TextInput
          style={tw`bg-white p-2 rounded-sm mb-4`}
          placeholder="Demio"
          onChangeText={setModel}
          value={model}
        />

        <Text style={tw`uppercase text-gray-400 mb-2`}>Year</Text>
        <TextInput
          style={tw`bg-white p-2 rounded-sm mb-4`}
          placeholder="2016"
          onChangeText={setYear}
          value={year}
        />

        <Text style={tw`uppercase text-gray-400 mb-2`}>License Plate</Text>
        <TextInput
          style={tw`bg-white p-2 rounded-sm mb-4`}
          placeholder="KDD 130D"
          onChangeText={setLicensePlate}
          value={licensePlate}
        />

        <Text style={tw`uppercase text-gray-400 mb-2`}>Color</Text>
        <TextInput
          style={tw`bg-white p-2 rounded-sm mb-4`}
          placeholder="Silver"
          onChangeText={setColor}
          value={color}
        />

        <TouchableOpacity
          style={tw`bg-yellow-400 p-4 rounded-sm items-center ${
            !isFormFilled && "opacity-50"
          }`}
          onPress={handleCreateVehicle}
          disabled={!isFormFilled}
        >
          <Text style={tw`text-gray-900 text-lg font-bold`}>Submit</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleClose}
      >
        <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
          <View style={tw`bg-white rounded-sm px-4 py-5 w-4/5`}>
            <View style={tw`flex-row justify-between items-center mb-5`}>
              <Text></Text>
              <Icon
                type="ionicon"
                name="close"
                color="white"
                size={24}
                style={tw`p-2 rounded-full bg-blue-500`}
                onPress={handleClose}
              />
            </View>

            <Text style={tw`text-lg mb-5`}>
              We are reviewing your request to add a new vehicle. Our support
              team will get back to you on the status of your vehicle.
            </Text>

            <TouchableOpacity
              style={tw`bg-yellow-500 p-4 rounded-sm items-center`}
              onPress={handleClose}
            >
              <Text style={tw`text-gray-900 text-lg font-bold`}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddVehicleScreen;
