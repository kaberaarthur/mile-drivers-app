import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";

const ChatScreen = () => {
  const navigation = useNavigation(); // Access the navigation object
  const { ride } = route.params; // Access data about the ride
  const [messageText, setMessageText] = useState(""); // Declare the messageText state variable

  const messages = [
    {
      id: 1,
      sender: "Rider",
      message: "Hello, how are you?",
      timestamp: new Date(2022, 2, 12, 19, 38), // May 27, 2023, 7:38 PM
    },
    {
      id: 2,
      sender: "Rider",
      message: "Hello, how are you?",
      timestamp: new Date(2023, 1, 17, 18, 12), // May 27, 2023, 7:38 PM
    },
    {
      id: 3,
      sender: "Driver",
      message: "I am good",
      timestamp: new Date(2023, 4, 24, 16, 11), // May 27, 2023, 7:38 PM
    },
    {
      id: 4,
      sender: "Rider",
      message: "Where are you at the moment?",
      timestamp: new Date(2023, 5, 24, 19, 23), // May 27, 2023, 7:38 PM
    },
    {
      id: 5,
      sender: "Driver",
      message: "I'm stuck in traffic, I'll be there in a minute or so.",
      timestamp: new Date(2023, 4, 27, 19, 40), // May 27, 2023, 7:40 PM
    },
    {
      id: 6,
      sender: "Rider",
      message: "Ok please hurry up!",
      timestamp: new Date(2023, 4, 27, 19, 42), // May 27, 2023, 7:42 PM
    },
    {
      id: 7,
      sender: "Rider",
      message: "How's the weather there?",
      timestamp: new Date(2023, 4, 27, 19, 45),
    },
    {
      id: 8,
      sender: "Driver",
      message: "It's sunny and warm.",
      timestamp: new Date(2023, 4, 27, 19, 46),
    },
    {
      id: 9,
      sender: "Rider",
      message: "Great! I love sunny weather.",
      timestamp: new Date(2023, 4, 27, 19, 48),
    },
    {
      id: 10,
      sender: "Driver",
      message: "Me too! Makes the ride more enjoyable.",
      timestamp: new Date(2023, 4, 27, 19, 50),
    },
    {
      id: 11,
      sender: "Rider",
      message: "Are you familiar with this area?",
      timestamp: new Date(2023, 4, 27, 19, 55),
    },
    {
      id: 12,
      sender: "Driver",
      message: "Yes, I've been driving here for years.",
      timestamp: new Date(2023, 4, 27, 19, 57),
    },
    {
      id: 13,
      sender: "Rider",
      message: "That's reassuring. I'm new to this city.",
      timestamp: new Date(2023, 4, 27, 20, 2),
    },
    {
      id: 14,
      sender: "Driver",
      message: "No worries! I'll get you to your destination safely.",
      timestamp: new Date(2023, 4, 27, 20, 5),
    },
    {
      id: 15,
      sender: "Rider",
      message: "Thank you, I appreciate it.",
      timestamp: new Date(2023, 4, 27, 20, 10),
    },
    {
      id: 16,
      sender: "Driver",
      message: "You're welcome! Enjoy the ride.",
      timestamp: new Date(2023, 4, 27, 20, 12),
    },
    {
      id: 17,
      sender: "Rider",
      message: "Could you please drop me off at the mall?",
      timestamp: new Date(2023, 4, 27, 20, 20),
    },
    {
      id: 18,
      sender: "Driver",
      message: "Sure, I'll take you to the mall.",
      timestamp: new Date(2023, 4, 27, 20, 22),
    },
    {
      id: 19,
      sender: "Rider",
      message: "Thanks again for the ride.",
      timestamp: new Date(2023, 4, 27, 20, 30),
    },
    {
      id: 20,
      sender: "Driver",
      message: "You're welcome! Have a great day.",
      timestamp: new Date(2023, 4, 27, 20, 32),
    },
  ];

  const renderChatBubble = (message) => {
    const isRider = message.sender === "Rider";
    const chatBubbleStyle = isRider
      ? tw`bg-white rounded-lg shadow`
      : tw`bg-yellow-500 rounded-lg`;
    const textStyle = isRider ? tw`text-black` : tw`text-white`;
    const timestampStyle = isRider ? tw`text-left` : tw`text-right`;

    const formattedTimestamp = formatTimestamp(message.timestamp);

    return (
      <View key={message.id} style={tw`mb-2`}>
        <View style={[tw`p-3`, chatBubbleStyle]}>
          <Text style={[tw`text-base`, textStyle]}>{message.message}</Text>
        </View>
        <Text style={[tw`text-xs text-gray-500 mb-1`, timestampStyle]}>
          {formattedTimestamp}
        </Text>
      </View>
    );
  };

  const formatTimestamp = (timestamp) => {
    const currentDate = new Date();
    const messageDate = new Date(timestamp);

    const isToday = messageDate.toDateString() === currentDate.toDateString();
    const isYesterday =
      messageDate.toDateString() ===
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - 1
      ).toDateString();

    if (isToday) {
      return "Today";
    } else if (isYesterday) {
      return "Yesterday";
    } else {
      const options = { month: "short", day: "numeric", year: "numeric" };
      return messageDate.toLocaleDateString(undefined, options);
    }
  };

  const handleSendMessage = () => {
    // Logic to handle sending the message
    if (messageText.trim() !== "") {
      // Check if the message is not empty or only whitespace
      const newMessage = {
        id: messages.length + 1,
        sender: "Rider", // or "Driver", depending on the user
        message: messageText.trim(),
        timestamp: new Date(),
      };

      // Add the new message to the messages array
      setMessageText(""); // Clear the input field after sending the message
    }
  };

  return (
    <View style={tw`flex-1 bg-white py-10`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between p-4 border-b`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            type="ionicon"
            name="arrow-back-outline"
            color="black"
            size={24}
          />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold text-center`}>Rider's Name</Text>
        <View style={tw`w-6`} />
      </View>

      {/* Horizontal Line */}
      <View style={tw`border-b border-gray-300`} />

      {/* Chat Messages */}
      <ScrollView contentContainerStyle={tw`p-4`} style={tw`flex-1`}>
        {/* Render messages */}
        {messages.map((message) => renderChatBubble(message))}
      </ScrollView>

      {/* Input Box */}
      <View style={tw`absolute bottom-0 left-0 right-0`}>
        <View style={tw`flex-row items-center p-4 bg-white`}>
          <TextInput
            style={tw`flex-1 py-2 px-4 border border-gray-300 rounded-md`}
            placeholder="Type a message..."
            value={messageText}
            onChangeText={(text) => setMessageText(text)}
          />
          <TouchableOpacity style={tw`ml-2`} onPress={handleSendMessage}>
            <Icon type="ionicon" name="send" color="#F5B800" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatScreen;
