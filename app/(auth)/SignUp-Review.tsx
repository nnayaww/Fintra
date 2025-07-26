import { useTheme } from "@/lib/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSignUp } from "@/context/SignUpContext";
import { Directions } from "react-native-gesture-handler";

const SignUpReview = () => {
  const { theme } = useTheme();
  const {
    account_type,
    first_name,
    middle_name,
    last_name,
    phone,
    country,
    dob,
    email,
    password,
  } = useSignUp();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://fintra-1.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account_type,
          first_name,
          middle_name,
          last_name,
          phone,
          country,
          dob,
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data)
      console.log(data.user)
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Navigate to SetPinCode screen on success
      router.push("/(auth)/SignUp-SetPINCode");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderField = (label: string, value: string) => (
    <View className="mb-4">
      <Text
        className={`text-lg font-UrbanistMedium ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {label}
      </Text>
      <Text
        className={`text-xl font-UrbanistBold ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        {value || "—"}
      </Text>
    </View>
  );

  return (
    <ScrollView
      className={`flex-1 px-6 pt-10 ${
        theme === "dark" ? "bg-dark-background" : "bg-white"
      }`}
    >
      <View style={{flexDirection: 'row', gap: 10, marginBottom: 20, marginTop: 30}}>
      {/* Back Arrow */}
      <TouchableOpacity
        onPress={() => {
        //   if (router.canGoBack()) {
            router.back();
        //   } else {
        //     router.replace("/(auth)/sign-up"); // fallback route
        //   }
        }}
        style={{ marginBottom: 4, marginTop: 8, alignSelf: "flex-start" }}
      >
        <Ionicons
          name="arrow-back"
          size={28}
          color={theme === "dark" ? "#fff" : "#0D0D0D"}
        />
      </TouchableOpacity>
      <Text
        className={`text-3xl font-UrbanistBold mt-2 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        Review your details
      </Text>

      </View>

      {renderField("Account Type", account_type)}
      {renderField("First Name", first_name)}
      {renderField("Middle Name", middle_name)}
      {renderField("Last Name", last_name)}
      {renderField("Phone Number", phone)}
      {renderField("Country", country)}
      {renderField("Date of Birth", dob)}
      {renderField("Email", email)}

      <TouchableOpacity
        className={`mt-8 p-4 rounded-xl items-center ${
          loading ? "bg-gray-400" : "bg-primary"
        }`}
        disabled={loading}
        onPress={handleSubmit}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-lg font-UrbanistBold">
            Continue
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignUpReview;
