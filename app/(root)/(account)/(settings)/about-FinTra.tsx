import { useTheme } from "@/lib/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

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
      <ScrollView className="mt-8" showsVerticalScrollIndicator={false}>
        <Text
          className={`text-2xl font-UrbanistBold mb-4 ${
            theme === "dark" ? "text-dark-primary" : "text-primary"
          }`}
        >
          Our Story
        </Text>
        <Text
          className={`text-lg font-UrbanistRegular leading-relaxed mb-6 ${
            theme === "dark" ? "text-dark-secondary" : "text-secondary"
          }`}
        >
          Founded in 2023, FinTra was born from the idea that financial
          transactions should be simple, secure, and accessible to everyone.
          We saw the complexities and frustrations people faced with traditional
          banking and decided to create a solution that puts the user first.
        </Text>
        <Text
          className={`text-lg font-UrbanistRegular leading-relaxed ${
            theme === "dark" ? "text-dark-secondary" : "text-secondary"
          }`}
        >
          Welcome to FinTra, your trusted partner in seamless and secure financial
          transactions. Our mission is to empower individuals and businesses by
          providing a reliable and intuitive platform for managing their finances.
        </Text>
        <Text
          className={`text-2xl font-UrbanistBold mt-8 mb-4 ${
            theme === "dark" ? "text-dark-primary" : "text-primary"
          }`}
        >
          Our Mission
        </Text>
        <Text
          className={`text-lg font-UrbanistRegular leading-relaxed ${
            theme === "dark" ? "text-dark-secondary" : "text-secondary"
          }`}
        >
          To simplify the way you send, receive, and manage money. We believe
          that financial services should be accessible to everyone, everywhere,
          which is why we are committed to creating a platform that is both
          powerful and easy to use.
        </Text>
        <Text
          className={`text-2xl font-UrbanistBold mt-8 mb-4 ${
            theme === "dark" ? "text-dark-primary" : "text-primary"
          }`}
        >
          Our Team
        </Text>
        <Text
          className={`text-lg font-UrbanistRegular leading-relaxed mb-6 ${
            theme === "dark" ? "text-dark-secondary" : "text-secondary"
          }`}
        >
          We are a diverse team of developers, designers, and financial experts
          passionate about building a better financial future. Our collective
          experience drives us to innovate and deliver a product that truly
          makes a difference.
        </Text>
        <Text
          className={`text-2xl font-UrbanistBold mt-8 mb-4 ${
            theme === "dark" ? "text-dark-primary" : "text-primary"
          }`}
        >
          Our Values
        </Text>
        <Text
          className={`text-lg font-UrbanistRegular leading-relaxed ${
            theme === "dark" ? "text-dark-secondary" : "text-secondary"
          }`}
        >
          - Security: We prioritize the safety of your data and transactions.
          {"\n"}- Transparency: We believe in clear and honest communication.
          {"\n"}- Innovation: We are constantly improving our platform to meet
          your needs.
          {"\n"}- Customer-Centric: Your experience is at the heart of everything
          we do.
        </Text>
      </ScrollView>
      <View className="py-4 items-center">
        <Text
          className={`text-sm font-UrbanistRegular ${
            theme === "dark" ? "text-dark-secondary" : "text-secondary"
          }`}
        >
          Version 1.0.0
        </Text>
        <Text
          className={`text-sm font-UrbanistRegular ${
            theme === "dark" ? "text-dark-secondary" : "text-secondary"
          }`}
        >
          © 2024 FinTra Inc.
        </Text>
      </View>
    </View>
  );
};

export default AboutFinTra;
