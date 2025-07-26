import { useTheme } from "@/lib/ThemeContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    SafeAreaView,
    Platform
} from "react-native";
import { wp, hp, rf, rs, getSafeAreaPadding, isSmallScreen, getButtonSize, getIconSize } from "@/lib/responsive";

const SignIn = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const safeArea = getSafeAreaPadding();
  const buttonSize = getButtonSize();
  const iconSizes = getIconSize();

  const { isNewUser } = useLocalSearchParams();
  const isNewUserBool = isNewUser === "true";

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (showModal) {
      timeout = setTimeout(() => {
        setShowModal(false);
        router.replace({
          pathname: "/(root)/(tabs)/home",
          params: { isNewUser: isNewUserBool ? "true" : "false" },
        });
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [showModal]);

const handleSignIn = async () => {
  console.log('Sign In Attempt:', { email, password });
  let valid = true;

  // --- Form validation logic (same as before) ---
  if (!email.trim()) {
    setEmailError("Email is required");
    valid = false;
  } else if (!/^[^\s@]+@[^-\s@]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
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
    valid = false; }
  // } else if (!/(?=.*[0-9])(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).+/.test(password)) {
  //   setPasswordError("Password must include at least 1 number and 1 special character");
  //   valid = false;} 
    else {
    setPasswordError("");
  }

  if (!valid) return;

  setLoading(true);
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch("https://fintra-1.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        password,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Server error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Backend login response:', data);

    // Store userId and email for top-up
    await AsyncStorage.setItem("userId", String(data.user.id));
    await AsyncStorage.setItem("email", data.user.email);
    await AsyncStorage.setItem("token", data.token);
    await AsyncStorage.setItem("fullName", `${data.user.first_name} ${data.user.last_name}`);
    await AsyncStorage.setItem("phone", data.user.phone); // Store phone number
    // const convertedBalance = (data.user.balance)/100
    // console.log("converted balance::", convertedBalance)
    // await AsyncStorage.setItem("balance", JSON.stringify(convertedBalance)); // Store balance as string
    
    // console.log('user balance from async storage:', await AsyncStorage.getItem('balance'))

    // ✅ Save to AsyncStorage if "Remember Me" is checked
    if (rememberMe) {
      await AsyncStorage.setItem("userToken", data.token);
      await AsyncStorage.setItem("userInfo", JSON.stringify(data.user));
      console.log('userInfo from async storage:',await AsyncStorage.getItem('userInfo'));
    }

    // Proceed to modal and redirect
    setShowModal(true);

  } catch (error: any) {
    console.error("Login error:", error);
    
    if (error.name === 'AbortError') {
      setPasswordError("Request timed out. Please check your connection and try again.");
    } else if (error.message?.includes('Network')) {
      setPasswordError("Network error. Please check your connection and try again.");
    } else if (error.message?.includes('credentials') || error.message?.includes('password') || error.message?.includes('email')) {
      setPasswordError("Invalid email or password. Please try again.");
    } else {
      setPasswordError(error.message || "Login failed. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme === "dark" ? "#181A20" : "#fff" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'ios' ? hp(5) : 0}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(3) }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                flex: 1,
                paddingHorizontal: wp(5),
                paddingTop: safeArea.top,
                gap: hp(3),
                backgroundColor: theme === "dark" ? "#181A20" : "#fff",
              }}
            >
            <View
  style={{
    flexDirection: "row",
    alignItems: "center",
    gap: wp(2), // spacing between arrow and text
    marginTop: hp(2),
    marginBottom: hp(2),
  }}
>
  <TouchableOpacity onPress={() => router.back()}>
    <Ionicons
      name="arrow-back"
      size={iconSizes.large}
      color={theme === "dark" ? "#fff" : "#0D0D0D"}
      style={{ padding: rs(8) }}
    />
  </TouchableOpacity>

  <View>
    <Text
      style={{
        fontWeight: "bold",
        marginTop: hp(2),
        
        fontSize: rf(isSmallScreen() ? 26 : 30),
        color: theme === "dark" ? "#fff" : "#0D0D0D",
      }}
    >
      Welcome back 👋
    </Text>
    <Text
      style={{
        fontWeight: "500",
        fontSize: rf(16),
        color: theme === "dark" ? "#A0A0A0" : "#666",
        lineHeight: rf(22),
      }}
    >
      Please enter your details to sign in.
    </Text>
  </View>
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
                placeholderTextColor={theme === "dark" ? "#B0B0B0" : "#9CA3AF"}
                className={`text-xl font-UrbanistSemiBold border-none rounded-lg w-full p-5 mt-3 focus:outline-none focus:border-blue-400 ${
                  theme === "dark"
                    ? "bg-[#23262F] text-white"
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
                placeholderTextColor={theme === "dark" ? "#B0B0B0" : "#9CA3AF"}
                secureTextEntry={!showPassword}
                className={`text-xl font-UrbanistSemiBold border-none rounded-lg p-5 mt-3 focus:outline-none focus:border-blue-400 ${
                  theme === "dark"
                    ? "bg-[#23262F] text-white"
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
            <View className="flex-row items-center justify-between -mt-2">
              <View className="flex-row items-center justify-center">
                <TouchableOpacity
                  onPress={() => setRememberMe(!rememberMe)}
                  className={`w-6 h-6 rounded border items-center mr-2 justify-center ${
                    theme === "dark" ? "border-general bg-dark-background" : "border-[#196126] bg-white"
                  }`}
                >
                  {rememberMe && (
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
                  Remember me
                </Text>
              </View>
              <Link
                href="/(auth)/forgot-password"
                className="font-UrbanistSemiBold text-xl text-[#196126]"
              >
                Forgot Password?
              </Link>
            </View>
            {/* FORM FIELDS END */}
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
                Don&apos;t have an account?{"  "}
              </Text>
              <Link href="/(auth)/sign-up">
                <Text className="text-[#196126] font-UrbanistBold text-subtext">
                  Sign up
                </Text>
              </Link>
            </View>
            {/* Sign In Button INSIDE the form, moves with keyboard */}
            <View style={{ marginTop: hp(3) }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#196126",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: hp(2),
                  borderRadius: rs(25),
                  minHeight: buttonSize.height,
                }}
                onPress={handleSignIn}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: buttonSize.fontSize,
                      color: "#fff",
                    }}
                  >
                    Sign in
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
        {/* Overlay Modal */}
        <Modal visible={showModal} transparent animationType="fade">
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.4)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: "60%",
                width: "80%",
                backgroundColor: theme === "dark" ? "#333" : "white",
                borderRadius: 20,
                padding: 20,
              }}
              className="flex items-center gap-10"
            >
              <View>
                <View
                  style={{
                    width: 170,
                    height: 170,
                    backgroundColor: "#82E394",
                    marginTop: 14,
                  }}
                  className="rounded-full flex items-center justify-center"
                >
                  <FontAwesome5
                    name="user-alt"
                    size={50}
                    color={theme === "dark" ? "#fff" : "#0D0D0D"}
                  />
                </View>
                <View
                  className="rounded-full"
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: "#82E394",
                    position: "absolute",
                    bottom: 40,
                    left: -24,
                  }}
                ></View>
                <View
                  className="rounded-full"
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor: "#82E394",
                    position: "absolute",
                    bottom: -8,
                    left: 20,
                  }}
                ></View>
                <View
                  className="rounded-full"
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: "#82E394",
                    position: "absolute",
                    top: 10,
                    left: -20,
                  }}
                ></View>
                <View
                  className="rounded-full"
                  style={{
                    width: 14,
                    height: 14,
                    backgroundColor: "#82E394",
                    position: "absolute",
                    top: 28,
                    right: -20,
                  }}
                ></View>
                <View
                  className="rounded-full"
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: "#82E394",
                    position: "absolute",
                    top: -1,
                    right: 80,
                  }}
                ></View>
                <View
                  className="rounded-full"
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: "#82E394",
                    position: "absolute",
                    bottom: -1,
                    right: 2,
                  }}
                ></View>
                <View
                  className="rounded-full"
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: "#82E394",
                    position: "absolute",
                    bottom: 50,
                    right: -18,
                  }}
                ></View>
              </View>
              <View style={{ marginTop: -10 }}>
                <Text
                  className={`text-3xl font-UrbanistBold ${
                    theme === "dark" ? "text-dark-primary" : "text-primary"
                  }`}
                >
                  Sign in Successful!
                </Text>
              </View>
              <View style={{ marginTop: -10 }}>
                <Text
                  className={`text-center font-UrbanistMedium text-lg ${
                    theme === "dark" ? "text-dark-secondary" : "text-secondary"
                  }`}
                  style={{ lineHeight: 28 }}
                >
                  Please wait...{"\n"}You will be directed to the homepage.
                </Text>
                <ActivityIndicator
                  size={65}
                  color="#82E394"
                  style={{ marginTop: 24 }}
                />
              </View>
            </View>
          </View>
        </Modal>
    </SafeAreaView>
  );
};

export default SignIn;