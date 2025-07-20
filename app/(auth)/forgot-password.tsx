import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useState } from "react";
import {
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

const forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleErrors = () => {
    let valid = true;
    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
      // Email format check: abc@xyz.com
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }
    if (valid) {
      router.replace("/(auth)/code-verification");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-white p-5 gap-10">
        <View className="flex-row items-center gap-10">
          <TouchableOpacity
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace("/(root)/(tabs)/home");
              }
            }}
          >
            <Ionicons
              name="arrow-back"
              size={28}
              color="#0D0D0D"
              style={{ padding: 6, marginTop: 22 }}
            />
          </TouchableOpacity>
        </View>
        <View className="flex gap-10">
          <Text
            style={{ lineHeight: 40 }}
            className="font-UrbanistBold text-primary text-3xl"
          >
            Reset your password 🔑
          </Text>
          <Text className="font-UrbanistMedium text-secondary text-lg -mt-2">
            Please enter your email and we will send an OTP code in the next
            step to reset your password.
          </Text>
        </View>
        <View className="relative">
          {email.length === 0 && (
            <MaterialIcons
              name="email"
              size={24}
              color={emailFocused ? "#0D0D0D" : "#9CA3AF"}
              style={{ position: "absolute", left: 20, top: 57, zIndex: 1 }}
            />
          )}
          <Text className="text-2xl font-UrbanistSemiBold">Email</Text>
          <TextInput
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) setEmailError("");
            }}
            placeholder="         Email"
            placeholderTextColor="#9CA3AF"
            className="text-xl font-UrbanistSemiBold border-none rounded-lg w-full p-5 bg-[#F6F8FA] text-primary mt-3 opacity-4 focus:outline-none focus:border-blue-400"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
          {emailError ? (
            <Text
              style={{
                color: "#E53E3E",
                marginLeft: 8,
                marginTop: 4,
                fontSize: 16,
                fontFamily: "Urbanist-Medium",
              }}
            >
              {emailError}
            </Text>
          ) : null}
        </View>
        <View
          style={{
            position: "absolute",
            left: 20,
            right: 20,
            bottom: 48,
          }}
        >
          <TouchableOpacity
            className="bg-general flex items-center justify-center p-5 border-none rounded-full"
            onPress={handleErrors}
          >
            <Text className="font-UrbanistSemiBold text-buttontext text-primary">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default forgotpassword;
