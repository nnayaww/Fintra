import { View, Text, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useTheme } from "@/lib/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";

const WithdrawSuccessful = () => {
  const { amount, methodName, methodNumber, notes, reference } =
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
        You have successfully withdrawn ₵{formatBalance(Number(amount))} to{" "}
        {methodNumber} ({methodName}).
      </Text>

      {/* Transaction Details */}
      <View
        className={`w-full rounded-lg p-5 mb-10 ${
          theme === "dark" ? "bg-dark-secondary" : "bg-[#F6F8FA]"
        }`}
        style={{ gap: 12 }}
      >
        <Text
          className={`font-UrbanistBold ${
            theme === "dark" ? "text-dark-primary" : "text-primary"
          }`}
          style={{ fontSize: 18 }}
        >
          Transaction Summary
        </Text>
        <Text
          className={`font-UrbanistMedium ${
            theme === "dark" ? "text-dark-secondary" : "text-gray-600"
          }`}
        >
          Amount: ₵{formatBalance(Number(amount))}
        </Text>
        <Text
          className={`font-UrbanistMedium ${
            theme === "dark" ? "text-dark-secondary" : "text-gray-600"
          }`}
        >
          Method: {methodName}
        </Text>
        <Text
          className={`font-UrbanistMedium ${
            theme === "dark" ? "text-dark-secondary" : "text-gray-600"
          }`}
        >
          Account: {methodNumber}
        </Text>
        {notes ? (
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-gray-600"
            }`}
          >
            Notes: {notes}
          </Text>
        ) : null}
        {reference ? (
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-gray-600"
            }`}
          >
            Reference: {reference}
          </Text>
        ) : null}
      </View>

      <TouchableOpacity
        onPress={() => router.replace("/(root)/(home)")}
        className="bg-general px-6 py-4 rounded-full"
      >
        <Text className="text-white font-UrbanistSemiBold text-lg">Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WithdrawSuccessful;
