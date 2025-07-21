import { useTheme } from "@/lib/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

const SignUpSetPINCode = () => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [anyFocused, setAnyFocused] = useState(false);
  const [pinError, setPinError] = useState(""); // Add error state
  const { theme } = useTheme();

  const handleChange = (text: string, idx: number) => {
    setPinError(""); // Clear error on input
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        className={`flex-1 p-5 gap-10 ${
          theme === "dark" ? "bg-dark-background" : "bg-white"
        }`}
      >
        <View className="flex-row items-center gap-10">
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
        </View>
        <View className="flex gap-10">
          <Text
            style={{ lineHeight: 40 }}
            className={`font-UrbanistBold text-3xl ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
          >
            Set your PIN code 🔐
          </Text>
          <Text
            className={`font-UrbanistMedium text-lg -mt-2 ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
          >
            Add a PIN to make your account more secure.You may be asked for a
            PIN when making a transaction.
          </Text>
          <View className="flex-row justify-between" style={{ marginTop: 50 }}>
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
                className={`text-center font-UrbanistSemiBold rounded-lg ${
                  theme === "dark"
                    ? "bg-[#23262F] text-white"
                    : "bg-[#F6F8FA] text-primary"
                }`}
                style={{
                  fontSize: 35,
                  width: 80,
                  height: 80,
                }}
                returnKeyType="next"
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
          {pinError ? (
            <Text
              style={{
                color: "#E53E3E",
                marginLeft: 8,
                marginTop: 8,
                fontSize: 17,
                fontFamily: "Urbanist-Medium",
                textAlign: "center",
              }}
            >
              {pinError}
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
  );
};

export default SignUpSetPINCode;
