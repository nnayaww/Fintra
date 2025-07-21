import { useTheme } from "@/lib/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

const codeVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const { theme } = useTheme();

  const handleChange = (text: string, idx: number) => {
    setOtpError("");
    if (/^\d$/.test(text)) {
      // Only allow single digit
      const newOtp = [...otp];
      newOtp[idx] = text;
      setOtp(newOtp);
      // Move to next input
      if (idx < 3) {
        (inputs[idx + 1].current as any)?.focus();
      }
    } else if (text === "") {
      // Allow backspace
      const newOtp = [...otp];
      newOtp[idx] = "";
      setOtp(newOtp);
    }
  };

  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const [otpError, setOtpError] = useState("");

  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      if (otp.join("") === "1234") {
        setOtpError("");
        router.replace("/(auth)/create-new-password");
      } else {
        setOtpError("Invalid OTP");
      }
    }
  }, [otp]);

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
            OTP code verification 🔐
          </Text>
          <Text
            className={`font-UrbanistMedium text-lg -mt-2 ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
          >
            We have sent an OTP code to your email. Please enter the OTP code
            below to verify.
          </Text>
          <View className="flex-row justify-between" style={{ marginTop: 50 }}>
            {otp.map((digit, idx) => (
              <TextInput
                key={idx}
                ref={inputs[idx]}
                value={digit}
                onChangeText={(text) => handleChange(text, idx)}
                keyboardType="number-pad"
                maxLength={1}
                className={`text-3xl text-center font-UrbanistSemiBold rounded-lg ${
                  theme === "dark"
                    ? "bg-[#23262F] text-white"
                    : "bg-[#F6F8FA] text-primary"
                }`}
                style={{ width: 80, height: 80 }}
                returnKeyType="next"
                onKeyPress={({ nativeEvent }) => {
                  if (
                    nativeEvent.key === "Backspace" &&
                    otp[idx] === "" &&
                    idx > 0
                  ) {
                    // Move focus to previous input and clear it
                    (inputs[idx - 1].current as any)?.focus();
                    const newOtp = [...otp];
                    newOtp[idx - 1] = "";
                    setOtp(newOtp);
                  }
                }}
              />
            ))}
          </View>
          {otpError ? (
            <Text
              style={{
                color: "#E53E3E",
                marginLeft: 8,
                marginTop: 8,
                fontSize: 18,
                fontFamily: "Urbanist-Medium",
                textAlign: "center",
              }}
            >
              {otpError}
            </Text>
          ) : null}
          <View className="flex items-center" style={{ marginTop: 16 }}>
            <Text
              className={`font-UrbanistMedium text-xl ${
                theme === "dark" ? "text-dark-primary" : "text-primary"
              }`}
            >
              Didn't receive email?
            </Text>
          </View>
          <View className="flex items-center" style={{ marginTop: -8 }}>
            <Text
              className={`font-UrbanistMedium text-xl ${
                theme === "dark" ? "text-dark-primary" : "text-primary"
              }`}
            >
              You can resend code in {timer} s
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default codeVerification;