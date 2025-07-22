import { useTheme } from "@/lib/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TopUpSuccessful = () => {
  const { theme } = useTheme();
  const { amount, methodName, methodNumber, reference } = useLocalSearchParams();
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(true);

  console.log("Received reference:", reference);

  useEffect(() => {
    const verifyAndFetch = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await fetch(
          `https://fintra-1.onrender.com/api/payment/verify/${reference}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );

        const verifyData = await res.json();
        console.log("verify data balance: ", verifyData.balance);

        if (!res.ok) throw new Error(verifyData.message || "Verification failed");

        if (verifyData.balance !== undefined) {
          const convertedBalance = verifyData.balance/100
          setBalance(JSON.stringify(convertedBalance));
          await AsyncStorage.setItem('balance', String(convertedBalance))
          console.log("balance in state: ",balance)
        } else {
          setBalance("");
        }
      } catch (err: any) {
        console.error("Error verifying payment:", err);
        Alert.alert("Error", err.message || "Could not verify top-up.");
      } finally {
        setLoading(false);
      }
    };

    if (reference) verifyAndFetch();
  }, [reference]);

  return (
    <View className={`flex-1 items-center justify-center space-y-6 px-4 ${theme === "dark" ? "bg-dark-background" : "bg-white"}`}>
      <Ionicons name="checkmark-circle" size={100} color="green" />
      <Text className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-black"}`}>
        Top Up Successful
      </Text>
      <Text className={`text-lg ${theme === "dark" ? "text-white" : "text-black"}`}>
        Amount: GH₵ {amount}
      </Text>
      <Text className={`text-lg ${theme === "dark" ? "text-white" : "text-black"}`}>
        Method: {methodName}
      </Text>
      <Text className={`text-lg ${theme === "dark" ? "text-white" : "text-black"}`}>
        Number: {methodNumber}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <Text className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
          New Balance: GH₵ {balance ?? "N/A"}
        </Text>
      )}

      <TouchableOpacity
        onPress={() => router.push("/(root)/(tabs)/home")}

        className="bg-green-600 px-6 py-3 rounded-xl"
      >
        <Text className="text-white font-semibold">Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TopUpSuccessful;
