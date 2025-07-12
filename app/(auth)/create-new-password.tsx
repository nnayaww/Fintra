import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const createNewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (showModal) {
      timeout = setTimeout(() => {
        setShowModal(false);
        router.replace("/(root)/(tabs)/home");
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [showModal]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-white p-5 gap-10">
        <TouchableOpacity
          onPress={() => {
            router.replace("/(auth)/code-verification");
          }}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#0D0D0D"
            style={{ padding: 6, marginTop: 22 }}
          />
        </TouchableOpacity>
        <View>
          <Text className="font-UrbanistBold text-primary text-3xl">
            Create new password 🔒
          </Text>
          <Text className="font-UrbanistMedium text-secondary text-lg mt-7">
            Create your new password. If you forget it, then you have to do
            forgot password.
          </Text>
        </View>
        <View className=" relative -mt-1">
          {password.length === 0 && (
            <Fontisto
              name="locked"
              size={20}
              color={passwordFocused ? "#0D0D0D" : "#9CA3AF"}
              style={{ position: "absolute", left: 24, top: 57, zIndex: 1 }}
            />
          )}
          <Text className="text-2xl font-UrbanistSemiBold">New Password</Text>
          <TextInput
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError("");
            }}
            placeholder="         Password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={showPassword}
            className="text-xl font-UrbanistSemiBold border-none rounded-lg p-5 bg-[#F6F8FA] text-primary mt-3 opacity-4 focus:outline-none focus:border-blue-400"
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={26}
              color={passwordFocused ? "#0D0D0D" : "#9CA3AF"}
              style={{ position: "absolute", right: 20, bottom: 14, zIndex: 1 }}
            />
          </TouchableOpacity>
        </View>
        {passwordError ? (
          <Text
            style={{
              color: "#E53E3E",
              marginLeft: 8,
              marginTop: -28,
              fontSize: 16,
              fontFamily: "Urbanist-Medium",
            }}
          >
            {passwordError}
          </Text>
        ) : null}
        <View className=" relative mt-2">
          {confirmPassword.length === 0 && (
            <Fontisto
              name="locked"
              size={20}
              color={confirmPasswordFocused ? "#0D0D0D" : "#9CA3AF"}
              style={{ position: "absolute", left: 24, top: 57, zIndex: 1 }}
            />
          )}
          <Text className="text-2xl font-UrbanistSemiBold">
            Confirm New Password
          </Text>
          <TextInput
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (confirmPasswordError) setConfirmPasswordError("");
            }}
            placeholder="         Confirm Password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={showConfirmPassword}
            className="text-xl font-UrbanistSemiBold border-none rounded-lg p-5 bg-[#F6F8FA] text-primary mt-3 opacity-4 focus:outline-none focus:border-blue-400"
            onFocus={() => setConfirmPasswordFocused(true)}
            onBlur={() => setConfirmPasswordFocused(false)}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-off" : "eye"}
              size={26}
              color={confirmPasswordFocused ? "#0D0D0D" : "#9CA3AF"}
              style={{ position: "absolute", right: 20, bottom: 14, zIndex: 1 }}
            />
          </TouchableOpacity>
          {confirmPasswordError ? (
            <Text
              style={{
                color: "#E53E3E",
                marginLeft: 8,
                marginTop: 4,
                fontSize: 16,
                fontFamily: "Urbanist-Medium",
              }}
            >
              {confirmPasswordError}
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
            onPress={() => {
              let valid = true;

              // Password validation
              if (!password) {
                setPasswordError("Password is required");
                valid = false;
              } else if (password.length < 8) {
                setPasswordError("Password must be at least 8 characters");
                valid = false;
              } else if (
                !/(?=.*[0-9])(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).+/.test(
                  password
                )
              ) {
                setPasswordError(
                  "Password must include at least 1 number and 1 special character"
                );
                valid = false;
              } else {
                setPasswordError("");
              }

              // Confirm password validation
              if (!confirmPassword) {
                setConfirmPasswordError("Please confirm your password");
                valid = false;
              } else if (password !== confirmPassword) {
                setConfirmPasswordError("Passwords do not match");
                valid = false;
              } else {
                setConfirmPasswordError("");
              }

              if (valid) {
                setShowModal(true);
              }
            }}
          >
            <Text className="font-UrbanistSemiBold text-buttontext text-primary">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
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
                backgroundColor: "white",
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
                  <Fontisto name="locked" size={50} color="#0D0D0D" />
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
              <View style={{ marginTop: -16 }}>
                <Text
                  className="text-3xl font-UrbanistBold text-primary text-center"
                  style={{ lineHeight: 38 }}
                >
                  Reset Password Successful!
                </Text>
              </View>
              <View style={{ marginTop: -24 }}>
                <Text
                  className="text-center font-UrbanistMedium text-secondary text-lg"
                  style={{ lineHeight: 28 }}
                >
                  Please wait...{"\n"}You will be directed to the homepage.
                </Text>
                <ActivityIndicator
                  size={65}
                  color="#82E394"
                  style={{ marginTop: 12 }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default createNewPassword;
