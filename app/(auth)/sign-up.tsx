/* eslint-disable react-hooks/rules-of-hooks */
import { useTheme } from "@/lib/ThemeContext";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { useSignUp } from "@/context/SignUpContext";


import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

const signUp = () => {
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [termsError, setTermsError] = useState("");
  const { theme } = useTheme();
  const { email, setEmail, password, setPassword } = useSignUp();

  const handleSignUp = () => {
    let valid = true;
    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }
    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      valid = false;
    } else if (
      !/(?=.*[0-9])(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).+/.test(password)
    ) {
      setPasswordError(
        "Password must include at least 1 number and 1 special character"
      );
      valid = false;
    } else {
      setPasswordError("");
    }
    if (!agree) {
      setTermsError("Terms and Policy not accepted");
      valid = false;
    } else {
      setTermsError("");
    }

    if (valid) {
      router.push("/(auth)/SignUp-SelectAccountType");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            className={`flex-1 p-5 gap-10 ${
              theme === "dark" ? "bg-dark-background" : "bg-white"
            }`}
          >
            <TouchableOpacity
              onPress={() => {
                // if (router.canGoBack()) {
                  router.back();
                // } else {
                //   router.replace("/(root)/(tabs)/home");
                // }
              }}
            >
              <Ionicons
                name="arrow-back"
                size={28}
                color={theme === "dark" ? "#fff" : "#0D0D0D"}
                style={{ padding: 6, marginTop: 22 }}
              />
            </TouchableOpacity>
            <View>
              <Text
                className={`font-UrbanistBold text-3xl ${
                  theme === "dark" ? "text-dark-primary" : "text-primary"
                }`}
              >
                Create Account 👨‍💻
              </Text>
              <Text
                className={`font-UrbanistMedium text-lg mt-5 ${
                  theme === "dark" ? "text-dark-secondary" : "text-secondary"
                }`}
              >
                Please enter your email & password to sign up.
              </Text>
            </View>
            {/* FORM FIELDS START */}
            <View>
              {/* Email Field */}
              {email.length === 0 && (
                <MaterialIcons
                  name="email"
                  size={24}
                  color={theme === "dark" ? "#A0A0A0" : "#9CA3AF"}
                  style={{ position: "absolute", left: 20, top: 57, zIndex: 1 }}
                />
              )}
              <Text
                className={`text-2xl font-UrbanistSemiBold ${
                  theme === "dark" ? "text-dark-primary" : "text-primary"
                }`}
              >
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) setEmailError("");
                }}
                placeholder="         Email"
                placeholderTextColor="#9CA3AF"
                className={`text-xl font-UrbanistSemiBold border-none rounded-lg w-full p-5 mt-3 opacity-4 focus:outline-none focus:border-blue-400 ${
                  theme === "dark"
                    ? "bg-dark-secondary text-dark-primary"
                    : "bg-[#F6F8FA] text-primary"
                }`}
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
            <View className=" relative -mt-2">
              {/* Password Field */}
              {password.length === 0 && (
                <Fontisto
                  name="locked"
                  size={20}
                  color={theme === "dark" ? "#A0A0A0" : "#9CA3AF"}
                  style={{ position: "absolute", left: 24, top: 57, zIndex: 1 }}
                />
              )}
              <Text
                className={`text-2xl font-UrbanistSemiBold ${
                  theme === "dark" ? "text-dark-primary" : "text-primary"
                }`}
              >
                Password
              </Text>
              <TextInput
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) setPasswordError("");
                }}
                placeholder="         Password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={showPassword}
                className={`text-xl font-UrbanistSemiBold border-none rounded-lg p-5 mt-3 opacity-4 focus:outline-none focus:border-blue-400 ${
                  theme === "dark"
                    ? "bg-dark-secondary text-dark-primary"
                    : "bg-[#F6F8FA] text-primary"
                }`}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={26}
                  color={theme === "dark" ? "#A0A0A0" : "#9CA3AF"}
                  style={{ position: "absolute", right: 20, bottom: 14, zIndex: 1 }}
                />
              </TouchableOpacity>
              {passwordError ? (
                <Text
                  style={{
                    color: "#E53E3E",
                    marginLeft: 8,
                    marginTop: 4,
                    fontSize: 16,
                    fontFamily: "Urbanist-Medium",
                  }}
                >
                  {passwordError}
                </Text>
              ) : null}
            </View>
            <View className="flex-row items-center justify-start -mt-2 gap-2">
              <TouchableOpacity
                onPress={() => {
                  setAgree(!agree);
                  if (termsError && !agree) setTermsError("");
                }}
                className={`w-6 h-6 rounded border items-center mr-2 justify-center ${
                  theme === "dark" ? "border-general bg-dark-background" : "border-[#196126] bg-white"
                }`}
              >
                {agree && (
                  <View className="w-6 h-6 rounded flex justify-center items-center bg-general">
                    <Ionicons name="checkmark-sharp" size={12} color="#0D0D0D" />
                  </View>
                )}
              </TouchableOpacity>
              <Text
                className={`text-xl font-UrbanistSemiBold ${
                  theme === "dark" ? "text-dark-primary" : "text-primary"
                }`}
              >
                I agree to FinTra{" "}
                <Link
                  href={"/(auth)/terms-and-policy"}
                  className="text-[#196126] font-UrbanistSemiBold text-xl"
                >
                  Terms & Policy.
                </Link>
              </Text>
            </View>
            {termsError ? (
              <Text
                style={{
                  color: "#E53E3E",
                  marginLeft: 8,
                  marginTop: -22,
                  fontSize: 16,
                  fontFamily: "Urbanist-Medium",
                }}
              >
                {termsError}
              </Text>
            ) : null}
            <View
              className={`w-full h-[1px] ${
                theme === "dark" ? "bg-dark-secondary" : "bg-gray-300"
              }`}
            ></View>
            <View className="flex flex-row justify-center items-center">
              <Text
                className={`font-UrbanistMedium text-subtext ${
                  theme === "dark" ? "text-dark-secondary" : "text-secondary"
                }`}
              >
                Already have an account?{"  "}
              </Text>
              <Link href="/(auth)/sign-in">
                <Text className="text-[#196126] font-UrbanistBold text-subtext">
                  Sign in
                </Text>
              </Link>
            </View>
            {/* Sign Up Button INSIDE the form, moves with keyboard */}
            <View style={{ marginTop: 24 }}>
              <TouchableOpacity
                className="bg-general flex items-center justify-center p-5 border-none rounded-full"
                onPress={handleSignUp}
              >
                <Text
                  className={`font-UrbanistSemiBold text-buttontext ${
                    theme === "dark" ? "text-dark-primary" : "text-primary"
                  }`}
                >
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default signUp;