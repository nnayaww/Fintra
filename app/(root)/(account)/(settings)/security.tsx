import { useTheme } from "@/lib/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Switch } from "react-native-switch";

interface SecurityOption {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const SecuritySwitch: React.FC<SecurityOption> = ({
  title,
  description,
  value,
  onValueChange,
}) => {
  const { theme } = useTheme();
  return (
    <View className="flex gap-2">
      <View className="flex-row justify-between items-center">
        <Text
          className={`font-UrbanistSemiBold ${
            theme === "dark" ? "text-dark-primary" : "text-primary"
          }`}
          style={{ fontSize: 19, width: "70%" }}
        >
          {title}
        </Text>
        <Switch
          value={value}
          onValueChange={onValueChange}
          disabled={false}
          circleSize={28}
          circleBorderWidth={0}
          barHeight={32}
          backgroundActive={"#82E394"}
          backgroundInactive={"#e6e6e6"}
          circleActiveColor={"#fff"}
          circleInActiveColor={"#fff"}
          changeValueImmediately={true}
          innerCircleStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
          renderActiveText={false}
          renderInActiveText={false}
        />
      </View>
      <Text
        className={`font-UrbanistRegular ${
          theme === "dark" ? "text-dark-secondary" : "text-secondary"
        }`}
        style={{ fontSize: 14, marginTop: -5 }}
      >
        {description}
      </Text>
    </View>
  );
};

const Security = () => {
  const [isRememberMeEnabled, setIsRememberMeEnabled] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isPINEnabled, setIsPINEnabled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const loadSecuritySettings = async () => {
      const rememberMe = await AsyncStorage.getItem("rememberMe");
      const biometric = await AsyncStorage.getItem("biometricEnabled");
      const pin = await AsyncStorage.getItem("pinEnabled");

      setIsRememberMeEnabled(rememberMe === "true");
      setIsBiometricEnabled(biometric === "true");
      setIsPINEnabled(pin === "true");
    };

    loadSecuritySettings();
  }, []);

  const handleRememberMe = async (value: boolean) => {
    setIsRememberMeEnabled(value);
    await AsyncStorage.setItem("rememberMe", value.toString());
  };

  const handleBiometric = async (value: boolean) => {
    setIsBiometricEnabled(value);
    await AsyncStorage.setItem("biometricEnabled", value.toString());
  };

  const handlePIN = async (value: boolean) => {
    setIsPINEnabled(value);
    await AsyncStorage.setItem("pinEnabled", value.toString());
    if (value) {
      router.push("/(auth)/SignUp-SetPINCode");
    }
  };

  const securityOptions: SecurityOption[] = [
    {
      title: "Remember Me",
      description: "Stay signed in until you choose to log out",
      value: isRememberMeEnabled,
      onValueChange: handleRememberMe,
    },
    {
      title: "Biometric Authentication",
      description: "Use fingerprint or face recognition to secure your account",
      value: isBiometricEnabled,
      onValueChange: handleBiometric,
    },
    {
      title: "PIN Code Lock",
      description: "Secure your account with a 4-digit PIN code",
      value: isPINEnabled,
      onValueChange: handlePIN,
    },
  ];

  return (
    <View
      className={`flex-1 p-5 ${
        theme === "dark" ? "bg-dark-background" : "bg-white"
      }`}
    >
      <View className="flex-row items-center mt-3">
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color={theme === "dark" ? "#fff" : "#0D0D0D"}
            style={{ padding: 6, marginTop: 22 }}
          />
        </TouchableOpacity>
        <Text
          className={`font-UrbanistBold text-3xl mt-5 ${
            theme === "dark" ? "text-dark-primary" : "text-primary"
          }`}
          style={{ marginHorizontal: 80 }}
        >
          Security
        </Text>
      </View>
      <View className="flex p-2 mt-5" style={{ gap: 30 }}>
        {securityOptions.map((option, index) => (
          <SecuritySwitch key={index} {...option} />
        ))}
        <TouchableOpacity
          className={`flex items-center justify-center p-5 border rounded-full mt-4 ${
            theme === "dark" ? "bg-dark-background" : "bg-white"
          }`}
          style={{
            borderStyle: "solid",
            borderWidth: 1.5,
            borderColor: "#82E394",
          }}
          onPress={() => router.push("/(auth)/create-new-password")}
        >
          <Text
            className={`font-UrbanistSemiBold text-buttontext ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
          >
            Change Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Security;

