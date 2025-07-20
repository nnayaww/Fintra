import { images } from "@/constants";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/lib/ThemeContext";

const welcome = () => {
  const { theme } = useTheme();
  return (
    <SafeAreaView
      className={`flex-1 ${
        theme === "dark" ? "bg-dark-background" : "bg-white"
      }`}
    >
      <View
        className="flex-1 justify-center items-center gap-10"
        style={{ marginBottom: 130 }}
      >
        <Image
          source={theme === 'dark' ? images.BlackLogo : images.GreenLogo}
          className="w-[80%] h-[28%] max-w-[300px]"
        />
        <View>
          <Text
            className={`font-UrbanistBold text-heading ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
          >
            Let's Get Started!
          </Text>
        </View>
        <View className="flex justify-center items-center p-5 -mt-7">
          <Text
            className={`font-UrbanistMedium text-subtext ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
          >
            With FinTra, sending and receiving money is
          </Text>
          <Text
            className={`font-UrbanistMedium text-subtext ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
          >
            easier than ever before.
          </Text>
        </View>
      </View>
      <View
        className="flex-row gap-4 items-center"
        style={{ position: "absolute", right: 20, left: 20, bottom: 48 }}
      >
        <TouchableOpacity
          onPress={() => {
            router.push("/(auth)/sign-up");
          }}
          className={`flex-1 items-center justify-center p-5 border-[1.5px] border-general rounded-full ${
            theme === "dark" ? "bg-dark-background" : "bg-white"
          }`}
        >
          <Text
            className={`font-UrbanistSemiBold text-buttontext ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
          >
            Sign up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("/(auth)/sign-in");
          }}
          className="bg-general flex-1 items-center justify-center p-5 border-none rounded-full"
        >
          <Text
            className={`font-UrbanistSemiBold text-buttontext ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
          >
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default welcome;
