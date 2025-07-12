import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const AboutFinTra = () => {
  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex-row items-center mt-3">
        <TouchableOpacity
          onPress={() => {
            router.push("/(root)/(tabs)/account");
          }}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#0D0D0D"
            style={{ padding: 6, marginTop: 22 }}
          />
        </TouchableOpacity>
        <Text
          className="font-UrbanistBold text-3xl text-primary mt-5"
          style={{ marginHorizontal: 60 }}
        >
          About FinTra
        </Text>
      </View>
      <View
        className="flex-1 justify-center items-center"
        style={{ marginTop: -80 }}
      >
        <Text className="text-center font-UrbanistSemiBold text-2xl text-secondary">
          Nothing to display yet.
        </Text>
      </View>
    </View>
  );
};

export default AboutFinTra;
