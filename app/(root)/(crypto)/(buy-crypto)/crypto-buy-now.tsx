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

const BuyNow = () => {
  const [notes, setNotes] = useState("");
  const { amount, logo, name, price, symbol } = useLocalSearchParams();

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
      <View className="flex-1 bg-white p-5" style={{ paddingTop: 40 }}>
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => {
              router.push("/(root)/(crypto)/(buy-crypto)/amount-to-buy");
            }}
          >
            <Ionicons
              name="arrow-back"
              size={28}
              color="#0D0D0D"
              style={{ padding: 6 }}
            />
          </TouchableOpacity>
          <View className="flex-1 items-center" style={{ marginLeft: -40 }}>
            <Text
              className="font-UrbanistBold text-primary"
              style={{ fontSize: 24 }}
            >
              Buy Now
            </Text>
          </View>
        </View>
        <View className="mt-10">
          <Text
            className="font-UrbanistSemiBold text-primary"
            style={{ fontSize: 20 }}
          >
            Amount Entered
          </Text>
          <View
            className="py-2 px-4 bg-[#F6F8FA] rounded-lg mt-4 flex justify-center"
            style={{ height: 70 }}
          >
            <Text
              className="font-UrbanistBold"
              style={{ fontSize: 28 }}
            >{`₵ ${formatBalance(
              Number(Array.isArray(amount) ? amount[0] : amount)
            )}`}</Text>
          </View>
        </View>

        <View className="mt-10">
          <Text
            className="font-UrbanistSemiBold text-primary"
            style={{ fontSize: 20 }}
          >
            Crypto To Buy
          </Text>
          <View
            style={{
              borderWidth: 2,
              borderColor: "#ebedf0",
              gap: 14,
              height: 80,
            }}
            className="flex-row justify-between items-center bg-[#F6F8FA] w-full p-5 mt-4 border rounded-lg"
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
              <Text className="font-UrbanistBold" style={{ fontSize: 20 }}>
                {name}
              </Text>
            </View>
          </View>
        </View>
        <View className="mt-10">
          <Text
            className="font-UrbanistSemiBold text-primary"
            style={{ fontSize: 20 }}
          >
            Amount To Buy
          </Text>
          <View
            className="py-2 px-6 bg-[#F6F8FA] rounded-lg mt-4 flex-row items-center"
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
            <Text className="font-UrbanistBold" style={{ fontSize: 28 }}>
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
              router.push("/(root)/(crypto)/(buy-crypto)/select-crypto");
            }}
            className="bg-white flex-1 items-center justify-center p-5 border-[1.5px] border-general rounded-full"
          >
            <Text className="font-UrbanistSemiBold text-xl text-primary">
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
            <Text className="font-UrbanistSemiBold text-xl text-primary">
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BuyNow;
