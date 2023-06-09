import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

const HistoryScreen = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [filteredRides, setFilteredRides] = useState([]);
  const [totalEarned, setTotalEarned] = useState(0);

  const historyData = {
    rides: [
      {
        id: "1",
        date: "2023-05-11",
        rideDateID: 51123,
        rideMonth: "May",
        rideDay: "11",
        rideDayOfWeek: "Thu",
        rideYear: "2023",
        riderName: "John Murii",
        amountPaid: 270,
        kilometers: "8.5",
        pickupLocation: "Garden City Mall, Thika Road",
        dropoffLocation: "Allsops Stage, Thika Road",
        licensePlate: "KDL 222B",
        phoneNumber: "+254712345678",
      },
      {
        id: "2",
        date: "2023-05-13",
        rideDateID: 51323,
        rideMonth: "May",
        rideDay: "13",
        rideDayOfWeek: "Sat",
        rideYear: "2023",
        riderName: "Jane Njau",
        amountPaid: 180,
        kilometers: "5.2",
        pickupLocation: "Kencom Bus Stop, Moi Avenue",
        dropoffLocation: "Westlands Roundabout",
        licensePlate: "KAB 987C",
        phoneNumber: "+254712345679",
      },
      {
        id: "3",
        date: "2023-05-13",
        rideDateID: 51323,
        rideMonth: "May",
        rideDay: "13",
        rideDayOfWeek: "Sat",
        rideYear: "2023",
        riderName: "David Wangari",
        amountPaid: 900,
        kilometers: "3.8",
        pickupLocation: "Kenyatta National Hospital",
        dropoffLocation: "Upperhill, Ralph Bunche Road",
        licensePlate: "KBC 345D",
        phoneNumber: "+254712345680",
      },
      {
        id: "4",
        date: "2023-12-24",
        rideDateID: 122423,
        rideMonth: "Dec",
        rideDay: "24",
        rideDayOfWeek: "Sun",
        rideYear: "2023",
        riderName: "Mary Kamau",
        amountPaid: 650,
        kilometers: "2.5",
        pickupLocation: "The Junction Mall, Ngong Road",
        dropoffLocation: "Yaya Centre, Argwings Kodhek Road",
        licensePlate: "KDE 765F",
        phoneNumber: "+254712345681",
      },
      // Add more ride objects here...
    ],
  };

  const renderDateButtons = () => {
    const rideDateIDs = Array.from(
      new Set(historyData.rides.map((ride) => ride.rideDateID))
    );

    const handleButtonPress = (rideDateID) => {
      setSelectedButton(rideDateID);
    };

    return (
      <ScrollView
        horizontal
        contentContainerStyle={tw`flex-row mb-4`}
        showsHorizontalScrollIndicator={false}
      >
        {rideDateIDs.map((rideDateID) => {
          const isSelected = selectedButton === rideDateID;
          const ride = historyData.rides.find(
            (ride) => ride.rideDateID === rideDateID
          );

          return (
            <TouchableOpacity
              key={rideDateID}
              style={[
                tw`rounded-md h-24 p-4 mr-2 bg-gray-100`,
                isSelected ? tw`border-2 border-yellow-500` : null,
              ]}
              activeOpacity={0.7}
              onPress={() => handleButtonPress(rideDateID)}
            >
              <View style={tw`flex items-center`}>
                <Text
                  style={[
                    tw`text-center text-lg`,
                    isSelected ? tw`text-yellow-500` : null,
                  ]}
                >
                  {ride.rideDay}
                </Text>
                <Text
                  style={[
                    tw`text-center text-lg`,
                    isSelected ? tw`text-yellow-500` : null,
                  ]}
                >
                  {ride.rideDayOfWeek}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  function getRandomNumber() {
    return Math.floor(Math.random() * (75 - 20 + 1)) + 20;
  }

  function getRandomGender() {
    const genders = ["men", "women"];
    return genders[Math.floor(Math.random() * genders.length)];
  }

  const renderRideCard = (ride) => {
    return (
      <View key={ride.id} style={tw`bg-white p-4 mb-4`}>
        <View style={tw`flex-row items-center mb-2`}>
          <Image
            source={{
              uri: `https://randomuser.me/api/portraits/med/${getRandomGender()}/${getRandomNumber()}.jpg`,
            }}
            style={tw`w-16 h-16 rounded-lg`}
          />
          <Text style={tw`text-lg ml-2`}>{ride.riderName}</Text>
        </View>
        <Text style={tw`text-gray-900 text-lg font-bold mb-1`}>
          Kshs. {ride.amountPaid}
        </Text>
        <Text style={tw`text-gray-900`}>{ride.kilometers} KM</Text>
        <View style={tw`border-t border-gray-300 mt-2 pt-2`}>
          <Text style={tw`text-gray-400`}>PICK UP</Text>
          <Text style={tw`text-gray-900 font-bold text-lg`}>
            {ride.pickupLocation}
          </Text>
          <Text style={tw`text-gray-400 mt-2`}>DROP OFF</Text>
          <Text style={tw`text-gray-900 font-bold text-lg`}>
            {ride.dropoffLocation}
          </Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    let ridesToRender = [];
    let totalEarnings = 0;

    if (selectedButton) {
      ridesToRender = historyData.rides.filter(
        (ride) => ride.rideDateID === selectedButton
      );
    } else {
      ridesToRender = historyData.rides;
    }

    totalEarnings = ridesToRender.reduce(
      (sum, ride) => sum + ride.amountPaid,
      0
    );

    setFilteredRides(ridesToRender); // Update filtered rides state
    setTotalEarned(totalEarnings); // Update total earned state
  }, [selectedButton]);

  const totalJobs = filteredRides.length;

  return (
    <View style={tw`flex-1 bg-white `}>
      <View style={tw`pt-10 px-4`}>
        <View style={tw`flex-row items-center justify-between mb-4`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon type="ionicon" name="menu-outline" color="black" size={24} />
          </TouchableOpacity>
          <Text style={tw`text-lg font-bold`}>History</Text>
          <View style={tw`w-6`} />
        </View>

        {renderDateButtons()}
      </View>

      <ScrollView style={tw`flex-1 bg-gray-100`}>
        <View style={tw`flex-row pt-4 px-4`}>
          <View style={[tw`flex-1 bg-yellow-400 rounded-sm p-4 mr-2`]}>
            <View style={tw`flex-row items-center mb-2`}>
              <Icon type="ionicon" name="car-outline" color="black" size={24} />
            </View>
            <Text style={tw`text-gray-800 text-sm`}>Total Jobs</Text>
            <Text style={tw`text-gray-800 text-xl font-bold`}>{totalJobs}</Text>
          </View>
          <View style={[tw`flex-1 bg-yellow-600 rounded-sm p-4 ml-2`]}>
            <View style={tw`flex-row items-center mb-2`}>
              <Icon
                type="ionicon"
                name="cash-outline"
                color="black"
                size={24}
              />
            </View>
            <Text style={tw`text-gray-800 text-sm`}>Earned Cash</Text>
            <Text style={tw`text-gray-800 text-xl font-bold`}>
              Kshs. {totalEarned}
            </Text>
          </View>
        </View>

        {/* Rides History */}
        <View style={tw`py-4`}>
          {filteredRides.map((ride) => renderRideCard(ride))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HistoryScreen;
