import { useTheme } from "@/lib/ThemeContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

const SendNow = () => {
  const { theme } = useTheme();
  const { amount, name, avatar } = useLocalSearchParams();
  const [contactImage, setContactImage] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const displayName = Array.isArray(name) ? name[0] : name;
  const displayAmount = Array.isArray(amount) ? amount[0] : amount;
  const receiverEmail = "ama@example.com"; // ✅ Hardcoded test email

  const parsedAvatar =
    typeof avatar === "string" && avatar.startsWith("http")
      ? { uri: avatar }
      : require("@/assets/images/nature.jpg");

  const formatBalance = (amount: number): string =>
    amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const handleSendMoney = async () => {
    try {
      setLoading(true);
      const senderEmail = await AsyncStorage.getItem("email");
      const token = await AsyncStorage.getItem("token");
      console.log("Sender Email:", senderEmail);
      console.log("Token:", token);
      console.log("Receiver Email:", receiverEmail);
      console.log("Amount:", displayAmount);

      if (!senderEmail || !receiverEmail || !displayAmount) {
        Alert.alert("Missing information. Please check sender or receiver details.");
        return;
      }

      console.log("Sending transfer request...");
      const response = await axios.post(
        "https://fintra-1.onrender.com/api/payment/transfer",
        {
          senderEmail,
          receiverEmail,
          amount: Number(displayAmount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );
      console.log("Transfer API response:", response.data);

      const transferData = response.data;
      if (transferData.balance !== undefined) {
        await AsyncStorage.setItem("balance", (transferData.balance / 100).toString());
        console.log("Updated AsyncStorage balance:", transferData.balance / 100);
      }

      router.push({
        pathname: "/(root)/(home)/(send)/send-money-sent",
        params: {
          id: transferData.id,
          reference: transferData.reference,
          createdAt: transferData.createdAt,
          status: transferData.status,
          amount: displayAmount,
          name: displayName,
          email: receiverEmail,
          avatar: contactImage,
          notes,
        },
      });
      console.log("Navigated to send-money-sent screen");
    } catch (error: any) {
      console.error("Transfer failed:", error?.response?.data || error.message);
      Alert.alert(
        "Transfer Failed",
        error?.response?.data?.message || "Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                Send Now
              </Text>
            </View>
          </View>

          {/* Recipient */}
          <Text
            className={`font-UrbanistSemiBold mt-10 ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ fontSize: 20 }}
          >
            Recipient
          </Text>
          <View className="flex-row py-4 items-center">
            <View
              className={`rounded-full items-center justify-center ${
                theme === "dark" ? "bg-dark-secondary" : "bg-[#F6F8FA]"
              }`}
              style={{ width: 70, height: 70 }}
            >
              {contactImage ? (
                <Image source={{ uri: contactImage }} style={{ width: 70, height: 70 }} />
              ) : (
                <FontAwesome5
                  name="user-alt"
                  size={21}
                  color={theme === "dark" ? "#A0A0A0" : "#9CA3AF"}
                />
              )}
            </View>
            <View className="gap-2 ml-4">
              <Text className={`font-UrbanistBold text-[20px] text-primary`}>
                {displayName}
              </Text>
              <Text className="font-UrbanistMedium text-secondary text-[16px]">
                {receiverEmail}
              </Text>
            </View>
            <MaterialCommunityIcons
              name="greater-than"
              size={26}
              color={theme === "dark" ? "#fff" : "black"}
              style={{ position: "absolute", right: 0 }}
            />
          </View>

          {/* Amount */}
          <View className="mt-5">
            <Text
              className={`font-UrbanistSemiBold ${
                theme === "dark" ? "text-white" : "text-primary"
              } text-[20px]`}
            >
              Amount to send
            </Text>
            <View
              className={`py-2 px-4 rounded-lg mt-4 ${
                theme === "dark" ? "bg-[#23262F]" : "bg-[#F6F8FA]"
              }`}
              style={{ height: 70 }}
            >
              <Text
                className={`font-UrbanistBold ${
                  theme === "dark" ? "text-white" : "text-primary"
                } text-[28px]`}
              >
                ₵ {formatBalance(Number(displayAmount))}
              </Text>
            </View>
          </View>

          {/* Notes */}
          {/* <Text
            className={`font-UrbanistSemiBold mt-10 ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            } text-[20px]`}
          >
            Add Notes
          </Text> */}
          {/* <View
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
              onPress={() => router.push("/(root)/(tabs)/home")}
              className="flex-1 items-center justify-center p-5 border-[1.5px] border-general rounded-full bg-white"
            >
              <Text className="font-UrbanistSemiBold text-xl text-primary">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSendMoney}
              className="bg-general flex-1 items-center justify-center p-5 rounded-full"
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="font-UrbanistSemiBold text-xl text-primary">
                  Send Money
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SendNow;
