/* eslint-disable react/no-unescaped-entities */
import { useTheme } from "@/lib/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const ContactUs = () => {
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (!name || !email || !message) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    // Handle message sending logic here
    Alert.alert("Success", "Your message has been sent!");
    setName("");
    setEmail("");
    setMessage("");
  };

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
          Contact Us
        </Text>
      </View>
      <ScrollView className="mt-8" showsVerticalScrollIndicator={false}>
        <Text
          className={`text-lg font-UrbanistRegular leading-relaxed mb-6 ${
            theme === "dark" ? "text-dark-secondary" : "text-secondary"
          }`}
        >
          We're here to help! Whether you have a question, a suggestion, or
          need support, feel free to reach out to us through any of the
          following methods.
        </Text>
        <View
          className={`p-4 rounded-lg mb-6 ${
            theme === "dark" ? "bg-dark-secondary" : "bg-gray-100"
          }`}
        >
          <Text
            className={`text-lg font-UrbanistBold mb-2 ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
          >
            Email Support
          </Text>
          <Text
            className={`text-base font-UrbanistRegular ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
          >
            support@fintra.com
          </Text>
        </View>
        <View
          className={`p-4 rounded-lg mb-6 ${
            theme === "dark" ? "bg-dark-secondary" : "bg-gray-100"
          }`}
        >
          <Text
            className={`text-lg font-UrbanistBold mb-2 ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
          >
            Phone Support
          </Text>
          <Text
            className={`text-base font-UrbanistRegular ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
          >
            +1 (800) 123-4567
          </Text>
        </View>
        <View className="mb-6">
          <Text
            className={`text-lg font-UrbanistBold mb-4 ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
          >
            Send Us a Message
          </Text>
          <TextInput
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
            className={`h-12 border rounded-lg px-4 mb-4 ${
              theme === "dark"
                ? "border-gray-700 bg-dark-secondary text-dark-primary"
                : "border-gray-300 bg-white text-primary"
            }`}
            placeholderTextColor={
              theme === "dark" ? "#9CA3AF" : "#6B7280"
            }
          />
          <TextInput
            placeholder="Your Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            className={`h-12 border rounded-lg px-4 mb-4 ${
              theme === "dark"
                ? "border-gray-700 bg-dark-secondary text-dark-primary"
                : "border-gray-300 bg-white text-primary"
            }`}
            placeholderTextColor={
              theme === "dark" ? "#9CA3AF" : "#6B7280"
            }
          />
          <TextInput
            placeholder="Your Message"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            className={`h-32 border rounded-lg px-4 py-2 ${
              theme === "dark"
                ? "border-gray-700 bg-dark-secondary text-dark-primary"
                : "border-gray-300 bg-white text-primary"
            }`}
            placeholderTextColor={
              theme === "dark" ? "#9CA3AF" : "#6B7280"
            }
          />
        </View>
        <TouchableOpacity
          className="bg-general flex items-center justify-center p-4 border-none rounded-full"
          onPress={handleSendMessage}
        >
          <Text className="font-UrbanistSemiBold text-buttontext text-primary">
            Send Message
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ContactUs; 