import { useTheme } from "@/lib/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const AboutFinTra = () => {
  const { theme } = useTheme();
  return (
    <View
      className={`flex-1 p-5 ${
        theme === "dark" ? "bg-dark-background" : "bg-white"
      }`}
    >
      <View className="flex-row items-center mt-3">
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color={theme === "dark" ? "#fff" : "#0D0D0D"}
            style={{ padding: 6, marginTop: 22 }}
          />
        </TouchableOpacity>
        <Text
          className={`font-UrbanistBold text-3xl mt-5 ${
            theme === "dark" ? "text-dark-primary" : "text-primary"
          }`}
          style={{ marginHorizontal: 60 }}
        >
          About FinTra
        </Text>
      </View>
      <View
        className="flex-1 justify-center items-center"
        style={{ marginTop: -80 }}
      >
        <Text
          className={`text-center font-UrbanistSemiBold text-2xl ${
            theme === "dark" ? "text-dark-secondary" : "text-secondary"
          }`}
        >
          Nothing to display yet.
        </Text>
      </View>
    </View>
  );
};

export default AboutFinTra;
