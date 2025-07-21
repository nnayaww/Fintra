import applepay from "@/assets/images/applepay.jpg";
import BlackLogo from "@/assets/images/BlackLogo.png";
import mastercard from "@/assets/images/mastercard.jpg";
import momo from "@/assets/images/momo.png";
import visa from "@/assets/images/visa.jpg";
import { useTheme } from "@/lib/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import { router, useLocalSearchParams } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const imageMap: Record<string, any> = {
  momo,
  "apple pay": applepay,
  mastercard,
  visa,
};

const TopUpNow = () => {
  const { amount, methodName, methodImageKey, methodNumber } = useLocalSearchParams();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  function formatBalance(amount: number): string {
    if (amount >= 1e9) return (amount / 1e9).toFixed(2) + "B";
    if (amount >= 1e6) return (amount / 1e6).toFixed(2) + "M";
    return amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      console.log('Deep link event:', event.url);
      const parsed = Linking.parse(event.url);
      const ref = parsed.queryParams?.reference as string | undefined;
      if (ref) {
        router.push({
          pathname: "/(root)/(home)/(top-up)/top-up-successful",
          params: {
            reference: ref,
          },
        });
      }
    };

    const subs = Linking.addEventListener("url", handleDeepLink);
    return () => subs.remove();
  }, []);

  const handleManualVerify = () => {
    if (reference) {
      router.push({
        pathname: "/(root)/(home)/(top-up)/top-up-successful",
        params: { reference },
      });
    } else {
      Alert.alert("No reference", "No payment reference to verify.");
    }
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const storedUserId = await AsyncStorage.getItem("userId");
      const storedEmail = await AsyncStorage.getItem("email");
      const token = await AsyncStorage.getItem("token");

      if (!storedUserId || !storedEmail) {
        Alert.alert("Error", "User information not found.");
        return;
      }

      const callbackUrl = Linking.createURL("topup-success");
      console.log('Callback URL being sent to backend:', callbackUrl);
      const res = await fetch("https://fintra-1.onrender.com/api/payment/topup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          email: storedEmail,
          userId: storedUserId,
          amount: Number(Array.isArray(amount) ? amount[0] : amount),
          type: (Array.isArray(methodName) ? methodName[0] : methodName)?.toLowerCase() === "momo" ? "momo" : "card",
          callback_url: callbackUrl,
        }),
      });

      const data = await res.json();
      console.log('Topup API response:', data);
      if (!res.ok) throw new Error(data.message || "Failed to start top-up");

      setReference(data.reference);
      console.log('Opening WebBrowser with URL:', data.authorization_url);
      await WebBrowser.openBrowserAsync(data.authorization_url);
    } catch (err: any) {
      Alert.alert("Top Up Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className={`flex-1 p-5 ${theme === "dark" ? "bg-dark-background" : "bg-white"}`} style={{ paddingTop: 40 }}>
        {/* Header */}
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color={theme === "dark" ? "#fff" : "#0D0D0D"} style={{ padding: 6 }} />
          </TouchableOpacity>
          <View className="flex-1 items-center" style={{ marginLeft: -40 }}>
            <Text className={`font-UrbanistBold ${theme === "dark" ? "text-dark-primary" : "text-primary"}`} style={{ fontSize: 24 }}>
              Top Up Now
            </Text>
          </View>
        </View>

        {/* Amount */}
        <View className="mt-10">
          <Text className={`font-UrbanistSemiBold ${theme === "dark" ? "text-dark-primary" : "text-primary"}`} style={{ fontSize: 20 }}>
            Amount to Top Up
          </Text>
          <View className={`py-2 px-4 rounded-lg mt-4 flex justify-center ${theme === "dark" ? "bg-dark-secondary" : "bg-[#F6F8FA]"}`} style={{ height: 70 }}>
            <Text className={`font-UrbanistBold ${theme === "dark" ? "text-dark-primary" : "text-primary"}`} style={{ fontSize: 28 }}>
              ₵ {formatBalance(Number(Array.isArray(amount) ? amount[0] : amount))}
            </Text>
          </View>
        </View>

        {/* Method */}
        <View className="mt-10">
          <Text
            className={`font-UrbanistSemiBold ${
              theme === "dark" ? "text-white" : "text-primary"
            }`}
            style={{ fontSize: 20 }}
          >
            Top Up Method
          </Text>
          <View style={{ borderWidth: 2, borderColor: theme === "dark" ? "#444" : "#ebedf0", gap: 14, height: 80 }} className={`flex-row justify-between items-center w-full p-5 mt-4 border rounded-lg ${theme === "dark" ? "bg-dark-secondary" : "bg-[#F6F8FA]"}`}>
            <View className="flex-row items-center">
              {methodImageKey && (
                <Image
                  source={imageMap[(Array.isArray(methodImageKey) ? methodImageKey[0] : methodImageKey)?.toLowerCase()] || BlackLogo}
                  style={{ width: 50, height: 50, marginRight: 12, marginLeft: -6, borderRadius: 9999 }}
                  resizeMode="cover"
                />
              )}
              <Text
                className={`font-UrbanistBold ${
                  theme === "dark" ? "text-white" : "text-primary"
                }`}
                style={{ fontSize: 20 }}
              >
                {methodNumber || methodName || "Select Method"}
                </Text>
            </View>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="font-UrbanistBold text-[#196126] text-xl">Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Buttons */}
        <View className="flex-row gap-4 items-center absolute" style={{ bottom: 46, right: 20, left: 20 }}>
          <TouchableOpacity
            onPress={() => router.back()}
            className={`flex-1 items-center justify-center p-5 border-[1.5px] border-general rounded-full ${
              theme === "dark" ? "bg-dark-background" : "bg-white"
            }`}
          >
            <Text
              className={`font-UrbanistSemiBold text-xl ${
                theme === "dark" ? "text-white" : "text-primary"
              }`}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleConfirm}
            disabled={loading}
            className="bg-general flex-1 items-center justify-center p-5 rounded-full"
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="font-UrbanistSemiBold text-xl text-white">
                Confirm
              </Text>
            )}
          </TouchableOpacity>
        </View>
        {reference && (
          <View style={{ marginTop: 40, alignItems: 'center' }}>
            <Text style={{ marginBottom: 10, textAlign: 'center', color: theme === 'dark' ? '#fff' : '#222', fontFamily: 'Urbanist-Medium' }}>
              If you’ve completed payment, verify below.
            </Text>
            <TouchableOpacity
              onPress={handleManualVerify}
              className="bg-general flex items-center justify-center p-4 border-none rounded-full"
              style={{ width: '80%' }}
            >
              <Text className="font-UrbanistSemiBold text-buttontext text-white">
                Verify Payment Manually
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TopUpNow;
