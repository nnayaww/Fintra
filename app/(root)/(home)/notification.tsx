/* eslint-disable react-hooks/rules-of-hooks */
import { useTheme } from "@/lib/ThemeContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { router } from "expo-router";
import React from "react";
import { SectionList, Text, TouchableOpacity, View } from "react-native";

interface Notification {
  id: string;
  type: "payment" | "top-up" | "security";
  title: string;
  message: string;
  time: string;
}

const notificationData: Notification[] = [
  {
    id: "1",
    type: "payment",
    title: "Payment Successful",
    message: "You have successfully sent $50 to John Doe.",
    time: "10:00 AM",
  },
  {
    id: "2",
    type: "top-up",
    title: "Top-Up Successful",
    message: "You have successfully topped up your account with $100.",
    time: "11:30 AM",
  },
  {
    id: "3",
    type: "security",
    title: "Security Alert",
    message: "Your password was recently changed. If this was not you, please secure your account immediately.",
    time: "Yesterday",
  },
  {
    id: "4",
    type: "payment",
    title: "Payment Received",
    message: "You have received $25 from Jane Smith.",
    time: "Yesterday",
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "payment":
      return <FontAwesome name="money" size={24} color="#82E394" />;
    case "top-up":
      return <MaterialCommunityIcons name="bank-transfer" size={24} color="#82E394" />;
    case "security":
      return <MaterialCommunityIcons name="shield-check" size={24} color="#f54f4f" />;
  }
};

const NotificationItem: React.FC<{ item: Notification }> = ({ item }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      className={`flex-row items-center p-4 rounded-lg mb-4 ${
        theme === "dark" ? "bg-[#23262F]" : "bg-gray-100"
      }`}
    >
      <View className="mr-4">{getNotificationIcon(item.type)}</View>
      <View className="flex-1">
        <Text
          className={`font-UrbanistBold text-lg ${
            theme === "dark" ? "text-white" : "text-primary"
          }`}
        >
          {item.title}
        </Text>
        <Text
          className={`font-UrbanistRegular text-base ${
            theme === "dark" ? "text-gray-300" : "text-secondary"
          }`}
        >
          {item.message}
        </Text>
      </View>
      <Text
        className={`font-UrbanistRegular text-sm ${
          theme === "dark" ? "text-gray-400" : "text-secondary"
        }`}
      >
        {item.time}
      </Text>
    </TouchableOpacity>
  );
};

const notification = () => {
  const { theme } = useTheme();

  const sections = [
    {
      title: "Today",
      data: notificationData.filter((item) => item.time.includes("AM") || item.time.includes("PM")),
    },
    {
      title: "Yesterday",
      data: notificationData.filter((item) => !item.time.includes("AM") && !item.time.includes("PM")),
    },
  ];

  return (
    <View
      className={`flex-1 ${
        theme === "dark" ? "bg-dark-background" : "bg-white"
      }`}
    >
      <View
        className="flex-row justify-between items-center pt-5 pl-5 pr-5"
        style={{ marginTop: 28 }}
      >
        <TouchableOpacity
          onPress={() => {
              router.back();
          }}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color={theme === "dark" ? "#fff" : "#0D0D0D"}
            style={{ padding: 6 }}
          />
        </TouchableOpacity>
        <Text
          className={`font-UrbanistBold ${
            theme === "dark" ? "text-dark-primary" : "text-primary"
          }`}
          style={{ fontSize: 24 }}
        >
          Notification
        </Text>
        <TouchableOpacity
          onPress={() => {
            router.push(
              "/(root)/(account)/(settings)/notification-settings"
            );
          }}
        >
          <Octicons
            name="gear"
            size={26}
            color={theme === "dark" ? "#fff" : "#0D0D0D"}
            style={{ paddingHorizontal: 6 }}
          />
        </TouchableOpacity>
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text
            className={`font-UrbanistBold text-xl p-4 ${
              theme === "dark" ? "text-white" : "text-primary"
            }`}
          >
            {title}
          </Text>
        )}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
};

export default notification;
