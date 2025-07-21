import { useTheme } from "@/lib/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

const WithdrawNow = () => {
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { amount, methodName, methodImage, methodNumber } =
    useLocalSearchParams();
  const { theme } = useTheme();

  const formatBalance = (amount: number): string => {
    if (amount >= 1_000_000_000) {
      return (amount / 1_000_000_000).toFixed(2).replace(/\.00$/, "") + "B";
    }
    if (amount >= 1_000_000) {
      return (amount / 1_000_000).toFixed(2).replace(/\.00$/, "") + "M";
    }
    return amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      const userId = await AsyncStorage.getItem("userId");
      const name = await AsyncStorage.getItem("fullName");
      const phone = await AsyncStorage.getItem("phone");
      const token = await AsyncStorage.getItem("token");

      if (!userId || !name || !phone || !token) {
        Alert.alert("Missing Info", "User details are missing. Please log in again.");
        setIsLoading(false);
        return;
      }

      const selectedMethodName = Array.isArray(methodName) ? methodName[0] : methodName;
      const accountNumber = selectedMethodName?.toLowerCase() === 'momo'
        ? phone
        : Array.isArray(methodNumber) ? methodNumber[0] : methodNumber;

      const payload = {
        userId,
        amount: parseFloat(Array.isArray(amount) ? amount[0] : (amount as string)) * 100,
        name,
        accountNumber,
        bankCode: selectedMethodName,
      };

      console.log('Withdrawal Request Payload:', payload);

      const response = await axios.post(
        "https://fintra-1.onrender.com/api/payment/withdraw",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 15000,
        }
      );

      console.log('Withdrawal API Response:', response.data);

      Alert.alert(
        "Withdrawal Initiated",
        response.data.message || "Your withdrawal is being processed.",
        [
          {
            text: "OK",
            onPress: () => {
              router.push({
                pathname: "/(root)/(home)/(withdraw)/withdraw-successful",
                params: {
                  amount,
                  methodName,
                  methodNumber: accountNumber,
                  notes,
                  reference: response.data.reference,
                },
              });
            },
          },
        ]
      );

    } catch (error: any) {
      console.error('Withdrawal Error:', error?.response?.data || error.message);
      Alert.alert(
        "Withdrawal Failed",
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        className={`flex-1 p-5 ${
          theme === "dark" ? "bg-dark-background" : "bg-white"
        }`}
        style={{ paddingTop: 60 }}
      >
        {/* Header */}
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
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

        {/* Amount */}
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
            className={`py-2 px-4 rounded-lg mt-4 ${
              theme === "dark" ? "bg-dark-secondary" : "bg-[#F6F8FA]"
            }`}
            style={{ height: 70 }}
          >
            <Text
              className={`font-UrbanistBold ${
                theme === "dark" ? "text-dark-primary" : "text-primary"
              }`}
              style={{ fontSize: 28 }}
            >
              ₵ {formatBalance(Number(amount))}
            </Text>
          </View>
        </View>

        {/* Method */}
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
                      : methodName === "Momo"
                      ? require("@/assets/images/momo.png")
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
                    borderRadius: 9999,
                  }}
                  resizeMode="cover"
                />
              )}
              <Text
                className={`font-UrbanistBold ${
                  theme === "dark" ? "text-dark-primary" : "text-primary"
                }`}
                style={{ fontSize: 20 }}
              >
                {methodNumber || methodName}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname:
                    "/(root)/(home)/(withdraw)/withdraw-destination-account",
                  params: { amount },
                })
              }
            >
              <Text className="font-UrbanistBold text-[#196126] text-xl">
                Change
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notes
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
        </View> */}

        {/* Buttons */}
        <View
          className="flex-row gap-4 items-center"
          style={{ position: "absolute", right: 20, left: 20, bottom: 46 }}
        >
          <TouchableOpacity
            onPress={() =>
              router.push("/(root)/(tabs)/home")
            }
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
            onPress={handleConfirm}
            disabled={isLoading}
            className="bg-general flex-1 items-center justify-center p-5 border-none rounded-full"
          >
            <Text
              className={`font-UrbanistSemiBold text-xl ${
                theme === "dark" ? "text-dark-primary" : "text-primary"
              }`}
            >
              {isLoading ? "Processing..." : "Confirm"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default WithdrawNow;
