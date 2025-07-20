import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@/lib/ThemeContext";

const TopUpAddNewPayment = () => {
  const [AccountHolderName, setAccountHolderName] = useState("");
  const [AccountHolderNameFocused, setAccountHolderNameFocused] =
    useState(false);
  const [AccountHolderNameError, setAccountHolderNameError] = useState("");
  const [CardNumber, setCardNumber] = useState("");
  const [CardNumberError, setCardNumberError] = useState("");
  const [cardNumberFocused, setCardNumberFocused] = useState(false);
  const [ExpiryDate, setExpiryDate] = useState<Date | null>(null);
  const [ExpiryDateFocused, setExpiryDateFocused] = useState(false);
  const [ExpiryDateError, setExpiryDateError] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [CVV, setCVV] = useState("");
  const [CVVError, setCVVError] = useState("");
  const [CVVFocused, setCVVFocused] = useState(false);
  const { theme } = useTheme();

  const handleErrors = () => {
    let valid = true;

    // AccountHolderName validation
    if (!AccountHolderName.trim()) {
      setAccountHolderNameError("This field is required");
      valid = false;
    } else if (!/^[A-Za-z\s]+$/.test(AccountHolderName.trim())) {
      setAccountHolderNameError("Name can only contain letters and spaces");
      valid = false;
    } else {
      setAccountHolderNameError("");
    }

    if (!CardNumber.trim()) {
      setCardNumberError("Card number is required");
      valid = false;
    } else if (!/^\d{16}$/.test(CardNumber.replace(/\s/g, ""))) {
      setCardNumberError("Card number must be 16 digits");
      valid = false;
    } else {
      setCardNumberError("");
    }

    if (!ExpiryDate) {
      setExpiryDateError("Please select the expiry date");
      valid = false;
    }

    if (!CVV.trim()) {
      setCVVError("CVV is required");
      valid = false;
    } else if (!/^\d+$/.test(CVV.trim())) {
      setCVVError("Card number must contain only digits");
      valid = false;
    }
  };

  const formatDate = (date: Date) => {
    if (isNaN(date.getTime())) return ""; // Return empty string if invalid date
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${mm}/${dd}`;
  };

  return (
    <View
      className={`flex-1 p-5 ${
        theme === "dark" ? "bg-dark-background" : "bg-white"
      }`}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
      >
        <View className="flex-row justify-between items-center mt-3">
          <TouchableOpacity
            onPress={() => {
            router.back();
          }}
          >
            <Fontisto
              name="close-a"
              size={17}
              color={theme === "dark" ? "#fff" : "#0D0D0D"}
              style={{ padding: 6, marginTop: 22 }}
            />
          </TouchableOpacity>
          <Text
            className={`font-UrbanistBold mt-5 ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ fontSize: 22 }}
          >
            Add New Top Up Method
          </Text>
          <TouchableOpacity
            onPress={() => {
              /* router.replace("/"); */
            }}
          >
            <MaterialCommunityIcons
              name="line-scan"
              size={23}
              color={theme === "dark" ? "#fff" : "#0D0D0D"}
              style={{ marginTop: 20 }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onScrollBeginDrag={Keyboard.dismiss}
        >
          <View className="flex items-center" style={{ marginTop: 30 }}>
            <View
              className="rounded-xl"
              style={{ width: "100%", backgroundColor: "#82E394", height: 230 }}
            ></View>
          </View>
          <View style={{ marginTop: 30 }}>
            <Text
              className={`text-2xl font-UrbanistSemiBold ${
                theme === "dark" ? "text-dark-primary" : "text-primary"
              }`}
            >
              Account Holder Name
            </Text>
            <TextInput
              value={AccountHolderName}
              onChangeText={(text) => {
                setAccountHolderName(text);
                if (AccountHolderNameError) setAccountHolderNameError("");
              }}
              placeholder="Account Holder Name"
              placeholderTextColor="#9CA3AF"
              className={`text-xl font-UrbanistSemiBold border-none rounded-lg w-full p-5 mt-3 opacity-4 focus:outline-none focus:border-blue-400 ${
                theme === "dark"
                  ? "bg-dark-secondary text-dark-primary"
                  : "bg-[#F6F8FA] text-primary"
              }`}
              onFocus={() => setAccountHolderNameFocused(true)}
              onBlur={() => setAccountHolderNameFocused(false)}
            />
            {AccountHolderNameError ? (
              <Text
                style={{
                  color: "#E53E3E",
                  marginLeft: 8,
                  marginTop: 4,
                  fontSize: 16,
                  fontFamily: "Urbanist-Medium",
                }}
              >
                {AccountHolderNameError}
              </Text>
            ) : null}
          </View>
          <View style={{ marginTop: 30 }}>
            <Text
              className={`text-2xl font-UrbanistSemiBold ${
                theme === "dark" ? "text-dark-primary" : "text-primary"
              }`}
            >
              Card Number
            </Text>
            <TextInput
              value={CardNumber}
              placeholder="XXXX XXXX XXXX XXXX"
              keyboardType="numeric"
              maxLength={19}
              placeholderTextColor="#9CA3AF"
              className={`text-xl font-UrbanistSemiBold border-none rounded-lg w-full p-5 mt-3 opacity-4 focus:outline-none focus:border-blue-400 ${
                theme === "dark"
                  ? "bg-dark-secondary text-dark-primary"
                  : "bg-[#F6F8FA] text-primary"
              }`}
              onFocus={() => setCardNumberFocused(true)}
              onBlur={() => setCardNumberFocused(false)}
              onChangeText={(text) => {
                // Remove all non-digit characters
                let digitsOnly = text.replace(/\D/g, "");
                digitsOnly = digitsOnly.slice(0, 16);
                const formatted = digitsOnly.replace(/(.{4})/g, "$1 ").trim();
                setCardNumber(formatted);
                if (CardNumberError) setCardNumberError("");
              }}
            />
            {CardNumberError ? (
              <Text
                style={{
                  color: "#E53E3E",
                  marginLeft: 8,
                  marginTop: 4,
                  fontSize: 16,
                  fontFamily: "Urbanist-Medium",
                }}
              >
                {CardNumberError}
              </Text>
            ) : null}
          </View>
          <View className="flex-row" style={{ marginTop: 30, gap: 12 }}>
            <View className="flex-1" style={{ width: "80%" }}>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={{
                  position: "absolute",
                  right: 24,
                  top: 55,
                  zIndex: 1,
                }}
                activeOpacity={0.7}
              >
                <FontAwesome5
                  name="calendar-alt"
                  size={24}
                  color={theme === "dark" ? "#fff" : "#0D0D0D"}
                />
              </TouchableOpacity>
              <Text
                className={`text-2xl font-UrbanistSemiBold ${
                  theme === "dark" ? "text-dark-primary" : "text-primary"
                }`}
              >
                Expiry Date
              </Text>
              <TextInput
                value={ExpiryDate ? formatDate(ExpiryDate) : ""}
                onChangeText={() => {}}
                keyboardType="numeric"
                placeholder="mm/dd"
                placeholderTextColor="#9CA3AF"
                className={`text-xl font-UrbanistSemiBold border-none rounded-lg p-5 mt-3 opacity-4 focus:outline-none focus:border-blue-400 ${
                  theme === "dark"
                    ? "bg-dark-secondary text-dark-primary"
                    : "bg-[#F6F8FA] text-primary"
                }`}
                editable={false}
              />
              {ExpiryDateError ? (
                <Text
                  style={{
                    color: "#E53E3E",
                    marginLeft: 8,
                    marginTop: 8,
                    fontSize: 16,
                    fontFamily: "Urbanist-Medium",
                  }}
                >
                  {ExpiryDateError}
                </Text>
              ) : null}
              {showDatePicker && (
                <DateTimePicker
                  value={ExpiryDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={(_, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate && !isNaN(selectedDate.getTime())) {
                      setExpiryDate(selectedDate);
                      setExpiryDateError("");
                    }
                  }}
                  maximumDate={new Date()}
                />
              )}
            </View>
            <View className="flex-1">
              <Text
                className={`text-2xl font-UrbanistSemiBold ${
                  theme === "dark" ? "text-dark-primary" : "text-primary"
                }`}
              >
                CVV
              </Text>
              <TextInput
                value={CVV}
                placeholder="XXX"
                keyboardType="numeric"
                maxLength={3}
                placeholderTextColor="#9CA3AF"
                className={`text-xl font-UrbanistSemiBold border-none rounded-lg w-full p-5 mt-3 opacity-4 focus:outline-none focus:border-blue-400 ${
                  theme === "dark"
                    ? "bg-dark-secondary text-dark-primary"
                    : "bg-[#F6F8FA] text-primary"
                }`}
                onFocus={() => setCVVFocused(true)}
                onBlur={() => setCVVFocused(false)}
                onChangeText={(text) => {
                  // Remove all non-digit characters
                  let digitsOnly = text.replace(/\D/g, "");
                  // Limit to 3 digits
                  digitsOnly = digitsOnly.slice(0, 3);
                  setCVV(digitsOnly);
                  if (CVVError) setCVVError("");
                }}
              />
              {CVVError ? (
                <Text
                  style={{
                    color: "#E53E3E",
                    marginLeft: 8,
                    marginTop: 4,
                    fontSize: 16,
                    fontFamily: "Urbanist-Medium",
                  }}
                >
                  {CVVError}
                </Text>
              ) : null}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View
        style={{
          position: "absolute",
          left: 20,
          right: 20,
          bottom: 40,
        }}
      >
        <TouchableOpacity
          className="bg-general flex items-center justify-center p-5 border-none rounded-full"
          onPress={handleErrors}
        >
          <Text
            className={`font-UrbanistSemiBold text-buttontext ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopUpAddNewPayment;

