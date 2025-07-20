import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { useTheme } from "@/lib/ThemeContext";

const RequestNow = () => {
  const { type } = useLocalSearchParams();
  const [contactImage, setContactImage] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const { theme } = useTheme();

  const { amount, name, email, avatar } = useLocalSearchParams();
  const displayName = Array.isArray(name) ? name[0] : name;
  const displayEmail = Array.isArray(email) ? email[0] : email;
  const parsedAvatar =
    typeof avatar === "string" && avatar.startsWith("http")
      ? { uri: avatar } // Remote image URL
      : require("@/assets/images/nature.jpg");

  function formatBalance(amount: number): string {
    if (amount >= 1_000_000_000) {
      return (amount / 1_000_000_000).toFixed(2).replace(/\.00$/, "") + "B";
    }
    if (amount >= 1_000_000) {
      return (amount / 1_000_000).toFixed(2).replace(/\.00$/, "") + "M";
    }
    // Format with commas for thousands
    return amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
      >
        <View
          className={`flex-1 p-5 ${
            theme === "dark" ? "bg-dark-background" : "bg-white"
          }`}
          style={{ paddingTop: 40 }}
        >
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => {
                // if (router.canGoBack()) {
                  router.back();
                // } else {
                //   router.replace("/(root)/(tabs)/home");
                // }
              }}
            >
              <Ionicons
                name="arrow-back"
                size={28}
                color={theme === "dark" ? "#fff" : "#0D0D0D"}
                style={{ padding: 6 }}
              />
            </TouchableOpacity>
            <View className="flex-1 items-center" style={{ marginLeft: -40 }}>
              <Text
                className={`font-UrbanistBold ${
                  theme === "dark" ? "text-dark-primary" : "text-primary"
                }`}
                style={{ fontSize: 24 }}
              >
                Request Now
              </Text>
            </View>
          </View>
          <Text
            className={`font-UrbanistSemiBold mt-10 ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ fontSize: 20 }}
          >
            Recipient
          </Text>
          <View className="flex">
            <View className="flex-row py-4 items-center">
              <View
                className={`rounded-full flex items-center justify-center ${
                  theme === "dark" ? "bg-dark-secondary" : "bg-[#F6F8FA]"
                }`}
                style={{ width: 70, height: 70 }}
              >
                {contactImage ? (
                  <>
                    <Image
                      source={{ uri: contactImage }}
                      style={{ width: 70, height: 70 }}
                      resizeMode="cover"
                    />
                  </>
                ) : (
                  <FontAwesome5
                    name="user-alt"
                    size={21}
                    color={theme === "dark" ? "#A0A0A0" : "#9CA3AF"}
                  />
                )}
              </View>
              <View className="gap-2 ml-4">
                <Text
                  className={`font-UrbanistBold ${
                    theme === "dark" ? "text-dark-primary" : "text-primary"
                  }`}
                  style={{ fontSize: 20 }}
                >
                  {displayName}
                </Text>
                <Text
                  className={`font-UrbanistMedium ${
                    theme === "dark" ? "text-dark-secondary" : "text-secondary"
                  }`}
                  style={{ fontSize: 16 }}
                >
                  {displayEmail}
                </Text>
              </View>
              <MaterialCommunityIcons
                name="greater-than"
                size={26}
                color={theme === "dark" ? "#fff" : "black"}
                style={{ position: "absolute", right: 0 }}
              />
            </View>
          </View>

          <View className="mt-5">
            <Text
              className={`font-UrbanistSemiBold ${
                theme === "dark" ? "text-dark-primary" : "text-primary"
              }`}
              style={{ fontSize: 20 }}
            >
              Amount to request
            </Text>
            <View
              className={`py-2 px-4 rounded-lg mt-4 flex justify-center ${
                theme === "dark" ? "bg-dark-secondary" : "bg-[#F6F8FA]"
              }`}
              style={{ height: 70 }}
            >
              <Text
                className={`font-UrbanistBold ${
                  theme === "dark" ? "text-dark-primary" : "text-primary"
                }`}
                style={{ fontSize: 28 }}
              >{`₵ ${formatBalance(
                Number(Array.isArray(amount) ? amount[0] : amount)
              )}`}</Text>
            </View>
          </View>
          <Text
            className={`font-UrbanistSemiBold mt-10 ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ fontSize: 20 }}
          >
            Add Notes
          </Text>
          <View
            className={`rounded-lg mt-2 ${
              theme === "dark" ? "bg-dark-secondary" : "bg-[#F6F8FA]"
            }`}
            style={{ height: 180 }}
          >
            <TextInput
              className={`rounded-lg p-5 font-UrbanistSemiBold ${
                theme === "dark" ? "text-dark-primary" : "text-primary"
              }`}
              style={{ fontSize: 19 }}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
            />
          </View>
          <View
            className="flex-row gap-4 items-center"
            style={{ position: "absolute", right: 20, left: 20, bottom: 46 }}
          >
            <TouchableOpacity
              onPress={() => {
                // if (router.canGoBack()) {
                  router.back();
                // } else {
                //   router.replace("/(root)/(tabs)/home");
                // }
              }}
              className={`flex-1 items-center justify-center p-5 border-[1.5px] border-general rounded-full ${
                theme === "dark" ? "bg-dark-background" : "bg-white"
              }`}
            >
              <Text
                className={`font-UrbanistSemiBold text-xl ${
                  theme === "dark" ? "text-dark-primary" : "text-primary"
                }`}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/(root)/(home)/(request)/request-money-requested",
                  params: {
                    amount,
                    name,
                    email,
                    avatar,
                    notes,
                  },
                })
              }
              className="bg-general flex-1 items-center justify-center p-5 border-none rounded-full"
            >
              <Text
                className={`font-UrbanistSemiBold text-xl ${
                  theme === "dark" ? "text-dark-primary" : "text-primary"
                }`}
              >
                Request Money
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default RequestNow;
