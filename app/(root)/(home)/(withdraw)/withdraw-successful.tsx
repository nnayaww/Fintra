import { useTheme } from "@/lib/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const WithdrawSuccessful = () => {
  const { theme } = useTheme();
  const { amount, methodName, methodNumber, notes, reference } =
    useLocalSearchParams();

  const validAmount = amount && !isNaN(Number(amount)) ? Number(amount) : 0;

  const [loading, setLoading] = useState(true);
  const [userBalance, setUserBalance] = useState('')

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

  const fetchNewUserDetails = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      console.log(userId)
      const response = await axios.get(
        `https://fintra-1.onrender.com/api/users/id/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 30000,
        }
      );
      console.log(response.data.balance);
      
      const newBalance: any = (response.data.balance)/100
      setUserBalance(newBalance)
      await AsyncStorage.setItem("balance", String(newBalance));
      console.log("after withdrawal data:", response.data.balance);
    } catch (error) {
      console.error("Failed to fetch updated user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewUserDetails();
  }, []);

  return (
    <View
      className={`flex-1 justify-center items-center p-5 ${
        theme === "dark" ? "bg-dark-background" : "bg-white"
      }`}
    >
      <Ionicons
        name="checkmark-circle"
        size={96}
        color="#4BB543"
        style={{ marginBottom: 20 }}
      />

      <Text
        className={`font-UrbanistBold mb-2 text-center ${
          theme === "dark" ? "text-dark-primary" : "text-primary"
        }`}
        style={{ fontSize: 24 }}
      >
        Withdrawal Successful
      </Text>

      <Text
        className={`font-UrbanistMedium mb-8 text-center ${
          theme === "dark" ? "text-dark-secondary" : "text-gray-500"
        }`}
        style={{ fontSize: 16 }}
      >
        You have successfully withdrawn ₵{formatBalance(validAmount)} to{" "}
        {methodNumber} ({methodName}).
      </Text>

      {/* Transaction Summary */}
      <View
        className={`w-full rounded-lg p-5 mb-10 ${
          theme === "dark" ? "bg-[#23262F]" : "bg-gray-100"
        }`}
        style={{ gap: 12 }}
      >
        <Text
          className={`font-UrbanistBold ${
            theme === "dark" ? "text-white" : "text-primary"
          }`}
          style={{ fontSize: 18 }}
        >
          Transaction Summary
        </Text>

        <Text
          className={`font-UrbanistMedium ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Amount: ₵{formatBalance(validAmount)}
        </Text>

        <Text
          className={`font-UrbanistMedium ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Method: {methodName}
        </Text>

        <Text
          className={`font-UrbanistMedium ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Account: {methodNumber}
        </Text>

        {notes ? (
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Notes: {notes}
          </Text>
        ) : null}

        {reference ? (
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Reference: {reference}
          </Text>
        ) : null}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4BB543" />
      ) : (
        <TouchableOpacity
          onPress={() => router.replace("/(root)/(tabs)/home")}
          className="bg-general px-6 py-4 rounded-full"
        >
          <Text className="text-white font-UrbanistSemiBold text-lg">
            Done
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default WithdrawSuccessful;
