import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  Modal,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const IDCardScreen = () => {
  const navigation = useNavigation();
  const [photo, setPhoto] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePhotoUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      console.log("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (!pickerResult.canceled) {
      setPhoto(pickerResult.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    console.log("Selected photo:", photo);
    console.log("ID Number:", idNumber);
    console.log("Birthday:", birthday);
    setModalVisible(true);
  };

  const handleModalOk = () => {
    setModalVisible(false);
    navigation.goBack(); // Go back to the Document Management Screen
  };

  return (
    <View style={[tw`flex-1 bg-white`, tw`py-10`]}>
      <View style={tw`bg-white items-center`}>
        <Text style={tw`text-xl font-bold`}>ID Card</Text>
        <TouchableOpacity onPress={handleGoBack} style={tw`absolute left-3`}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
      </View>

      <View style={tw`bg-gray-100 flex-1`}>
        <TouchableOpacity
          style={tw`bg-white rounded-md mx-4 my-4 p-4`}
          onPress={handlePhotoUpload}
        >
          {photo ? (
            <Image
              source={{ uri: photo }}
              style={tw`w-full h-40 rounded-md`}
              resizeMode="cover"
            />
          ) : (
            <View
              style={tw`flex-row items-center justify-center h-40 bg-yellow-600 rounded-md mb-4`}
            />
          )}
          <Text style={tw`text-lg font-semibold mt-2`}>
            {photo ? "Update Photo" : "Upload Photo"}
          </Text>
        </TouchableOpacity>

        <View style={tw`bg-white rounded-md mx-4 my-4 p-4`}>
          <View>
            <Text style={tw`text-sm font-semibold mb-1`}>ID Number</Text>
            <TextInput
              style={tw`bg-white p-2 border border-gray-300 rounded`}
              placeholder="37000001"
              onChangeText={setIdNumber}
              value={idNumber}
            />
          </View>

          <View style={tw`mt-4`}>
            <Text style={tw`text-sm font-semibold mb-1`}>Birthday</Text>
            <View style={tw`flex-row`}>
              <TextInput
                style={tw`bg-white p-2 border border-gray-300 rounded mr-2`}
                placeholder="DD"
                onChangeText={(day) =>
                  setBirthday((prevDate) => ({ ...prevDate, day }))
                }
                value={birthday.day}
                keyboardType="number-pad"
              />
              <TextInput
                style={tw`bg-white p-2 border border-gray-300 rounded mr-2`}
                placeholder="MM"
                onChangeText={(month) =>
                  setBirthday((prevDate) => ({ ...prevDate, month }))
                }
                value={birthday.month}
                keyboardType="number-pad"
              />
              <TextInput
                style={tw`bg-white p-2 border border-gray-300 rounded`}
                placeholder="YYYY"
                onChangeText={(year) =>
                  setBirthday((prevDate) => ({ ...prevDate, year }))
                }
                value={birthday.year}
                keyboardType="number-pad"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          style={tw`bg-yellow-500 mx-4 my-4 p-4 rounded-md items-center`}
        >
          <Text style={tw`text-gray-900 text-lg font-semibold`}>Submit</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="fade" transparent visible={isModalVisible}>
        <View
          style={tw`flex-1 justify-center items-center bg-gray-800 bg-opacity-50`}
        >
          <View style={tw`bg-white p-6 rounded-md`}>
            <Text style={tw`text-lg text-center mb-4`}>
              We are processing your approval, you shall be notified by
              email/sms once we are through.
            </Text>
            <Button title="OK" onPress={handleModalOk} color="#FBBF24" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default IDCardScreen;
