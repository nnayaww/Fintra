 
// TopUpSuccessful.tsx (with fixes applied)
import { useTheme } from "@/lib/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";

const TopUpSuccessful = () => {
  useTheme();
  const { amount, methodName, methodNumber, reference } = useLocalSearchParams();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAndFetch = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const res = await fetch(
          `https://fintra-1.onrender.com/api/payment/verify/${reference}`
        );
        const verifyData = await res.json();

        if (verifyData.status === "success") {
          const userRes = await fetch(`https://fintra-1.onrender.com/api/users/id/${userId}`);
          const userData = await userRes.json();
          setBalance(userData.balance);
        } else {
          Alert.alert("Verification failed", "Payment not successful.");
        }
      } catch (err) {
        console.error("Error verifying payment or fetching user:", err);
        Alert.alert("Error", "Could not fetch updated balance.");
      } finally {
        setLoading(false);
      }
    };

    if (reference) verifyAndFetch();
  }, [reference]);

  return (
    <View className="flex-1 items-center justify-center space-y-6 px-4">
      <Ionicons name="checkmark-circle" size={100} color="green" />
      <Text className="text-2xl font-bold">Top Up Successful</Text>
      <Text className="text-lg">Amount: GH₵ {amount}</Text>
      <Text className="text-lg">Method: {methodName}</Text>
      <Text className="text-lg">Number: {methodNumber}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <Text className="text-lg font-semibold">
          New Balance: GH₵ {balance ?? "N/A"}
        </Text>
      )}

      <TouchableOpacity
        onPress={() => router.replace("/(root)/(tabs)/home")}
        className="bg-green-600 px-6 py-3 rounded-xl"
      >
        <Text className="text-white font-semibold">Go to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TopUpSuccessful;
