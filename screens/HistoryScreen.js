import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

const HistoryScreen = () => {
  const historyData = {
    rides: [
      {
        id: "1",
        date: "2023-05-11",
        riderName: "John Murii",
        amountPaid: "2020",
        kilometers: "8.5",
        pickupLocation: "Garden City Mall, Thika Road",
        dropoffLocation: "Allsops Stage, Thika Road",
        licensePlate: "KDL 222B",
        phoneNumber: "+254712345678",
      },
      {
        id: "2",
        date: "2023-05-13",
        riderName: "Jane Njau",
        amountPaid: "180",
        kilometers: "5.2",
        pickupLocation: "Kencom Bus Stop, Moi Avenue",
        dropoffLocation: "Westlands Roundabout",
        licensePlate: "KAB 987C",
        phoneNumber: "+254712345679",
      },
      {
        id: "3",
        date: "2023-05-12",
        riderName: "David Wangari",
        amountPaid: "900",
        kilometers: "3.8",
        pickupLocation: "Kenyatta National Hospital",
        dropoffLocation: "Upperhill, Ralph Bunche Road",
        licensePlate: "KBC 345D",
        phoneNumber: "+254712345680",
      },
      {
        id: "4",
        date: "2023-12-24",
        riderName: "Mary Kamau",
        amountPaid: "650",
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
    const datesWithRides = historyData.rides.map((ride) => ride.date);

    return (
      <ScrollView
        horizontal
        contentContainerStyle={tw`flex-row mb-4`}
        showsHorizontalScrollIndicator={false}
      >
        {historyData.rides.map((ride) => {
          const rideDate = new Date(ride.date);
          const formattedDay = rideDate.toLocaleDateString("en-US", {
            weekday: "short",
          });
          const formattedDayShort = formattedDay.substring(0, 3);
          const formattedDate = rideDate.getDate();
          const hasRides = datesWithRides.includes(ride.date);

          return (
            <TouchableOpacity
              key={ride.date}
              style={[
                tw`rounded-md h-24 p-4 mr-2`,
                hasRides ? tw`bg-gray-100` : tw`bg-gray-200`,
              ]}
              disabled={!hasRides}
              activeOpacity={0.7}
            >
              <View style={tw`flex items-center`}>
                <Text
                  style={[
                    tw`text-center text-lg`,
                    hasRides ? tw`text-gray-400` : tw`text-gray-500`,
                  ]}
                >
                  {formattedDayShort}
                </Text>
                <Text
                  style={[
                    tw`text-center text-lg`,
                    hasRides ? tw`text-gray-400` : tw`text-gray-500`,
                  ]}
                >
                  {formattedDate}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  return (
    <View style={tw`flex-1 bg-white py-10 px-4`}>
      <View style={tw`flex-row items-center justify-between mb-4`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon type="ionicon" name="menu-outline" color="black" size={24} />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>History</Text>
        <View style={tw`w-6`} />
      </View>

      {renderDateButtons()}
    </View>
  );
};

export default HistoryScreen;
