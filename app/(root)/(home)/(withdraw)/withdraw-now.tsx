import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useTheme } from "@/lib/ThemeContext";

const WithdrawNow = () => {
  const [notes, setNotes] = useState("");
  const { amount, methodName, methodImage, methodNumber } =
    useLocalSearchParams();
  const { theme } = useTheme();

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
      <View
        className={`flex-1 p-5 ${
          theme === "dark" ? "bg-dark-background" : "bg-white"
        }`}
        style={{ paddingTop: 40 }}
      >
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace("/(root)/(tabs)/home");
              }
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
              Withdraw Now
            </Text>
          </View>
        </View>
        <View className="mt-10">
          <Text
            className={`font-UrbanistSemiBold ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ fontSize: 20 }}
          >
            Amount to Withdraw
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

        <View className="mt-10">
          <Text
            className={`font-UrbanistSemiBold ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ fontSize: 20 }}
          >
            Withdraw to
          </Text>
          <View
            style={{
              borderWidth: 2,
              borderColor: theme === "dark" ? "#444" : "#ebedf0",
              gap: 14,
              height: 80,
            }}
            className={`flex-row justify-between items-center w-full p-5 mt-4 border rounded-lg ${
              theme === "dark" ? "bg-dark-secondary" : "bg-[#F6F8FA]"
            }`}
          >
            <View className="flex-row items-center">
              {methodImage && (
                <Image
                  source={
                    typeof methodImage === "string" &&
                    methodImage.startsWith("http")
                      ? { uri: methodImage }
                      : methodName === "Visa"
                      ? require("@/assets/images/visa.jpg")
                      : methodName === "Mastercard"
                      ? require("@/assets/images/mastercard.jpg")
                      : methodName === "Paypal"
                      ? require("@/assets/images/paypal.jpg")
                      : methodName === "Apple Pay"
                      ? require("@/assets/images/applepay.jpg")
                      : methodName === "Google Pay"
                      ? require("@/assets/images/googlepay.jpg")
                      : require("@/assets/images/BlackLogo.png")
                  }
                  style={{
                    width: 50,
                    height: 50,
                    marginRight: 12,
                    marginLeft: -6,
                    borderRadius: 9999,
                  }}
                  resizeMode="cover"
                />
              )}
              {methodName === "Mastercard" || methodName === "Visa" ? (
                <Text
                  className={`font-UrbanistBold ${
                    theme === "dark" ? "text-dark-primary" : "text-primary"
                  }`}
                  style={{ fontSize: 20 }}
                >
                  {methodNumber || "Select Account"}
                </Text>
              ) : (
                <Text
                  className={`font-UrbanistBold ${
                    theme === "dark" ? "text-dark-primary" : "text-primary"
                  }`}
                  style={{ fontSize: 20 }}
                >
                  {methodName || "Select Account"}
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                router.replace({
                  pathname:
                    "/(root)/(home)/(withdraw)/withdraw-destination-account",
                  params: {
                    amount,
                  },
                });
              }}
            >
              <Text className="font-UrbanistBold text-[#196126] text-xl">
                Change
              </Text>
            </TouchableOpacity>
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
              router.replace("/(root)/(home)/(withdraw)/withdraw-enter-amount");
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
                pathname: "/(root)/(home)/(withdraw)/withdraw-successful",
                params: {
                  methodName,
                  methodNumber,
                  amount,
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
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default WithdrawNow;

