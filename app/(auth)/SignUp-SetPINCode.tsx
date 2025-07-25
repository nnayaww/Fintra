import { useTheme } from "@/lib/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";

const SignUpSetPINCode = () => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [anyFocused, setAnyFocused] = useState(false);
  const [pinError, setPinError] = useState("");
  const { theme } = useTheme();
  const { width } = useWindowDimensions();

  const handleChange = (text: string, idx: number) => {
    setPinError("");
    if (/^\d$/.test(text)) {
      const newPin = [...pin];
      newPin[idx] = text;
      setPin(newPin);
      if (idx < 3) {
        (inputs[idx + 1].current as any)?.focus();
      }
    } else if (text === "") {
      const newPin = [...pin];
      newPin[idx] = "";
      setPin(newPin);
    }
  };

  const handleFinish = () => {
    if (pin.some((digit) => digit === "")) {
      setPinError("PIN code is required");
      return;
    }
    setPinError("");
    router.push("/(auth)/SignUp-Successful");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          className={`flex-1 px-5 pt-10 ${
            theme === "dark" ? "bg-dark-background" : "bg-white"
          }`}
        >
          {/* Header */}
          <View className="flex-row items-center mb-8">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons
                name="arrow-back"
                size={28}
                color={theme === "dark" ? "#fff" : "#0D0D0D"}
                style={{ padding: 6 }}
              />
            </TouchableOpacity>
          </View>

          {/* Title & Description */}
          <View>
            <Text
              style={{ lineHeight: 38 }}
              className={`font-UrbanistBold text-3xl ${
                theme === "dark" ? "text-dark-primary" : "text-primary"
              }`}
            >
              Set your PIN code 🔐
            </Text>
            <Text
              className={`font-UrbanistMedium text-base mt-3 ${
                theme === "dark" ? "text-dark-secondary" : "text-secondary"
              }`}
            >
              Add a PIN to make your account more secure. You may be asked for
              a PIN when making a transaction.
            </Text>
          </View>

          {/* PIN Inputs */}
          <View className="mt-12 mb-6 flex-row justify-between">
            {pin.map((digit, idx) => (
              <TextInput
                key={idx}
                ref={inputs[idx]}
                value={digit}
                onChangeText={(text) => handleChange(text, idx)}
                keyboardType="numeric"
                secureTextEntry={!anyFocused}
                onFocus={() => setAnyFocused(true)}
                onBlur={() => setAnyFocused(false)}
                maxLength={1}
                returnKeyType="next"
                className={`text-center font-UrbanistSemiBold rounded-xl ${
                  theme === "dark"
                    ? "bg-[#23262F] text-white"
                    : "bg-[#F6F8FA] text-primary"
                }`}
                style={{
                  fontSize: 30,
                  width: width * 0.18,
                  height: width * 0.18,
                }}
                onKeyPress={({ nativeEvent }) => {
                  if (
                    nativeEvent.key === "Backspace" &&
                    pin[idx] === "" &&
                    idx > 0
                  ) {
                    (inputs[idx - 1].current as any)?.focus();
                    const newPin = [...pin];
                    newPin[idx - 1] = "";
                    setPin(newPin);
                  }
                }}
              />
            ))}
          </View>

          {/* Error Message */}
          {pinError ? (
            <Text
              style={{
                color: "#E53E3E",
                fontSize: 16,
                textAlign: "center",
                fontFamily: "Urbanist-Medium",
                marginTop: -8,
              }}
            >
              {pinError}
            </Text>
          ) : null}

          {/* Finish Button */}
          <View
            style={{
              position: "absolute",
              left: 20,
              right: 20,
              bottom: 40,
            }}
          >
            <TouchableOpacity
              className="bg-general flex items-center justify-center p-5 rounded-full"
              onPress={handleFinish}
            >
              <Text
                className={`font-UrbanistSemiBold text-buttontext ${
                  theme === "dark" ? "text-dark-primary" : "text-primary"
                }`}
              >
                Finish
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUpSetPINCode;
