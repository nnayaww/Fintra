import { useTheme } from "@/lib/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import {
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PrivacyPolicy = () => {
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
          style={{ marginHorizontal: 55 }}
        >
          Privacy Policy
        </Text>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={Keyboard.dismiss}
      >
        <View style={{ marginTop: 30 }}>
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 17, lineHeight: 26 }}
          >
            At FinTra, we respect and protect the privacy of our users. This
            privacy policy outlines the types of personal information we
            collect, how we use it, and how we protect your information.
          </Text>
          <Text
            className={`font-UrbanistBold text-2xl ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ marginTop: 35 }}
          >
            Information We Collect
          </Text>
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 17, lineHeight: 26, marginTop: 6 }}
          >
            We may collect the following types of information to provide and
            improve our services:
          </Text>
          <View
            style={{
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 30,
              marginTop: -30,
            }}
          >
            <Text
              className={`font-UrbanistMedium ${
                theme === "dark" ? "text-dark-secondary" : "text-secondary"
              }`}
              style={{ fontSize: 17, lineHeight: 26 }}
            >
              Personal Information: such as your name, email address, phone
              number, date of birth, and identification details.{"\n"}Financial
              Information: including payment methods, transaction history, and
              balance-related data.{"\n"}Device Information: such as IP address,
              device type, operating system, and mobile network information.
              {"\n"}Usage Data: including app interactions, pages visited, and
              features used.{"\n"}Location Data: if you enable location
              services, we may collect and use location data to provide
              region-specific features.
            </Text>
          </View>
          <Text
            className={`font-UrbanistBold text-2xl ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ marginTop: 35 }}
          >
            How We Use Your Information
          </Text>
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 17, lineHeight: 26, marginTop: 6 }}
          >
            We use your information for the following purposes:
          </Text>
          <View
            style={{
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 30,
              marginTop: -30,
            }}
          >
            <Text
              className={`font-UrbanistMedium ${
                theme === "dark" ? "text-dark-secondary" : "text-secondary"
              }`}
              style={{ fontSize: 17, lineHeight: 26 }}
            >
              - To provide and improve our services, such as sending and
              receiving money.{"\n"}- To verify your identity and prevent
              fraudulent activity.{"\n"}- To personalize your experience based
              on your preferences and usage.{"\n"}- To communicate important
              updates, service notifications, and promotional offers (with your
              consent).{"\n"}- To comply with legal and regulatory obligations.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;

