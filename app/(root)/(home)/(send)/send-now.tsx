import { useTheme } from "@/lib/ThemeContext";
import { wp, hp, rf, rs, getSafeAreaPadding, getIconSize } from "@/lib/responsive";
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
  const safeArea = getSafeAreaPadding();
  const iconSizes = getIconSize();
  const [contactImage, setContactImage] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const displayName = Array.isArray(name) ? name[0] : name;
  const displayAmount = Array.isArray(amount) ? amount[0] : amount;
  console.log("display amount: ",displayAmount)
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
          className={`flex-1 ${
            theme === "dark" ? "bg-dark-background" : "bg-white"
          }`}
          style={{ 
            paddingTop: safeArea.top + hp(2),
            paddingHorizontal: wp(5)
          }}
        >
          {/* Header */}
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons
                name="arrow-back"
                size={iconSizes.large}
                color={theme === "dark" ? "#fff" : "#0D0D0D"}
                style={{ padding: rs(6) }}
              />
            </TouchableOpacity>
            <View className="flex-1 items-center" style={{ marginLeft: wp(-10) }}>
              <Text
                className={`font-UrbanistBold ${
                  theme === "dark" ? "text-dark-primary" : "text-primary"
                }`}
                style={{ fontSize: rf(24) }}
              >
                Send Now
              </Text>
            </View>
          </View>

          {/* Recipient */}
          <Text
            className={`font-UrbanistSemiBold ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ 
              fontSize: rf(20),
              marginTop: hp(4)
            }}
          >
            Recipient
          </Text>
          <View className="flex-row items-center" style={{ paddingVertical: hp(2) }}>
            <View
              className={`rounded-full items-center justify-center ${
                theme === "dark" ? "bg-dark-secondary" : "bg-[#F6F8FA]"
              }`}
              style={{ width: wp(18), height: wp(18) }}
            >
              {contactImage ? (
                <Image source={{ uri: contactImage }} style={{ width: wp(18), height: wp(18), borderRadius: wp(9) }} />
              ) : (
                <FontAwesome5
                  name="user-alt"
                  size={iconSizes.medium}
                  color={theme === "dark" ? "#A0A0A0" : "#9CA3AF"}
                />
              )}
            </View>
            <View className="gap-2" style={{ marginLeft: wp(4) }}>
              <Text className={`font-UrbanistBold ${theme === "dark" ? "text-white" : "text-primary"}`} style={{ fontSize: rf(20) }}>
                {displayName}
              </Text>
              <Text className={`font-UrbanistMedium ${theme === "dark" ? "text-gray-300" : "text-secondary"}`} style={{ fontSize: rf(16) }}>
                {receiverEmail}
              </Text>
            </View>
            <MaterialCommunityIcons
              name="greater-than"
              size={iconSizes.medium}
              color={theme === "dark" ? "#fff" : "black"}
              style={{ position: "absolute", right: 0 }}
            />
          </View>

          {/* Amount */}
          <View style={{ marginTop: hp(2.5) }}>
            <Text
              className={`font-UrbanistSemiBold ${
                theme === "dark" ? "text-white" : "text-primary"
              }`}
              style={{ fontSize: rf(20) }}
            >
              Amount to send
            </Text>
            <View
              className={`rounded-lg ${
                theme === "dark" ? "bg-[#23262F]" : "bg-[#F6F8FA]"
              }`}
              style={{ 
                height: hp(9),
                marginTop: hp(2),
                paddingVertical: hp(1),
                paddingHorizontal: wp(4),
                justifyContent: 'center'
              }}
            >
              <Text
                className={`font-UrbanistBold ${
                  theme === "dark" ? "text-white" : "text-primary"
                }`}
                style={{ fontSize: rf(28) }}
              >
                ₵ {formatBalance(Number(Math.round(parseFloat(displayAmount) / 100).toString()))}
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
            className="flex-row items-center"
            style={{ 
              position: "absolute", 
              right: wp(5), 
              left: wp(5), 
              bottom: hp(6),
              gap: wp(4)
            }}
          >
            <TouchableOpacity
              onPress={() => router.push("/(root)/(tabs)/home")}
              className="flex-1 items-center justify-center border-[1.5px] border-general rounded-full bg-white"
              style={{ paddingVertical: hp(2) }}
            >
              <Text className="font-UrbanistSemiBold text-primary" style={{ fontSize: rf(20) }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSendMoney}
              className="bg-general flex-1 items-center justify-center rounded-full"
              style={{ paddingVertical: hp(2) }}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="font-UrbanistSemiBold text-primary" style={{ fontSize: rf(20) }}>
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
