import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useTheme } from "@/lib/ThemeContext";

const BuyNow = () => {
  const [notes, setNotes] = useState("");
  const { amount, logo, name, price, symbol } = useLocalSearchParams();
  const { theme } = useTheme();

  const dollarRate = 10.35;

  const CalcAmount = (
                Number(Array.isArray(amount) ? amount[0] : amount) /
                (Number(Array.isArray(price) ? price[0] : price) * dollarRate)
              ).toFixed(4)

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
              Buy Now
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
            Amount Entered
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
            Crypto To Buy
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
              <Image
                source={{ uri: Array.isArray(logo) ? logo[0] : logo }}
                style={{
                  width: 50,
                  height: 50,
                  marginRight: 12,
                  marginLeft: -6,
                  borderRadius: 9999,
                }}
                resizeMode="cover"
              />
              <Text
                className={`font-UrbanistBold ${
                  theme === "dark" ? "text-dark-primary" : "text-primary"
                }`}
                style={{ fontSize: 20 }}
              >
                {name}
              </Text>
            </View>
          </View>
        </View>
        <View className="mt-10">
          <Text
            className={`font-UrbanistSemiBold ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ fontSize: 20 }}
          >
            Amount To Buy
          </Text>
          <View
            className={`py-2 px-6 rounded-lg mt-4 flex-row items-center ${
              theme === "dark" ? "bg-dark-secondary" : "bg-[#F6F8FA]"
            }`}
            style={{ height: 70 }}
          >
            <Image
              source={{ uri: Array.isArray(logo) ? logo[0] : logo }}
              style={{
                width: 50,
                height: 50,
                marginRight: 12,
                marginLeft: -6,
                borderRadius: 9999,
              }}
              resizeMode="cover"
            />
            <Text
              className={`font-UrbanistBold ${
                theme === "dark" ? "text-dark-primary" : "text-primary"
              }`}
              style={{ fontSize: 28 }}
            >
              {CalcAmount}{` ${symbol}`}
            </Text>
          </View>
        </View>
        <View
          className="flex-row gap-4 items-center"
          style={{ position: "absolute", right: 20, left: 20, bottom: 46 }}
        >
          <TouchableOpacity
            onPress={() => {
              // if (router.canGoBack()) {
              //   router.back();
              // // } else {
                router.replace("/(root)/(tabs)/home");
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
                pathname: "/(root)/(crypto)/(buy-crypto)/crypto-receipt",
                params: {
                  name,
                  amount,
                  price,
                  logo,
                  symbol,
                  CalcAmount,
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

export default BuyNow;

