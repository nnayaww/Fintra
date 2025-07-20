import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/lib/ThemeContext";
import { useSignUp } from "./context/SignUpContext";

const SignUpSelectAccountType = () => {
  const { theme } = useTheme();
  const { updateForm } = useSignUp();

  const handleAccountTypeSelection = (type: "personal" | "business") => {
    updateForm({ account_type: type });
    router.push("/(auth)/SignUp-FullName");
  };

  return (
    <View
      className={`flex-1 p-5 gap-10 ${
        theme === "dark" ? "bg-dark-background" : "bg-white"
      }`}
    >
      {/* Progress bar and back button */}
      <View className="flex-row items-center gap-10">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={28}
            color={theme === "dark" ? "#fff" : "#0D0D0D"}
            style={{ padding: 6, marginTop: 22 }}
          />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: theme === "dark" ? "#444" : "#e5eaf0",
            width: "60%",
            height: 12,
            borderRadius: 9999,
            marginTop: 22,
          }}
        />
        <View
          style={{
            backgroundColor: "#82E394",
            width: "12%",
            height: 12,
            borderRadius: 9999,
            marginTop: 22,
            position: "absolute",
            left: 75,
          }}
        />
      </View>

      {/* Title */}
      <View className="flex gap-10">
        <Text
          style={{ lineHeight: 40 }}
          className={`font-UrbanistBold text-3xl ${
            theme === "dark" ? "text-dark-primary" : "text-primary"
          }`}
        >
          What kind of account do you want to open? 💳
        </Text>
        <Text
          className={`font-UrbanistMedium text-lg -mt-2 ${
            theme === "dark" ? "text-dark-secondary" : "text-secondary"
          }`}
        >
          You can always add another account later.
        </Text>
      </View>

      {/* Personal Account Option */}
      <TouchableOpacity
        className="flex-row justify-between"
        onPress={() => handleAccountTypeSelection("personal")}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderColor: theme === "dark" ? "#444" : "#e5eaf0",
            borderRadius: 9999,
            borderWidth: 2,
          }}
          className="flex items-center justify-center"
        >
          <FontAwesome5
            name="user-alt"
            size={24}
            color={theme === "dark" ? "#fff" : "#196126"}
          />
        </View>
        <View className="flex-row items-center" style={{ paddingLeft: 10 }}>
          <View style={{ width: "80%" }}>
            <Text
              className={`font-UrbanistBold text-xl ${
                theme === "dark" ? "text-dark-primary" : "text-primary"
              }`}
              style={{ fontSize: 19 }}
            >
              Personal Account
            </Text>
            <Text
              className={`font-UrbanistMedium text-lg ${
                theme === "dark" ? "text-dark-secondary" : "text-secondary"
              }`}
              style={{ marginTop: 6, lineHeight: 26 }}
            >
              Shop, send and receive money around the world at lower costs.
            </Text>
          </View>
          <MaterialCommunityIcons
            name="greater-than"
            size={26}
            color={theme === "dark" ? "#A0A0A0" : "#616161"}
            style={{ paddingLeft: 8 }}
          />
        </View>
      </TouchableOpacity>

      {/* Business Account Option */}
      <TouchableOpacity
        className="flex-row justify-between"
        onPress={() => handleAccountTypeSelection("business")}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderColor: theme === "dark" ? "#444" : "#e5eaf0",
            borderRadius: 9999,
            borderWidth: 2,
          }}
          className="flex items-center justify-center"
        >
          <FontAwesome
            name="briefcase"
            size={24}
            color={theme === "dark" ? "#fff" : "#196126"}
          />
        </View>
        <View className="flex-row items-center" style={{ paddingLeft: 10 }}>
          <View style={{ width: "80%" }}>
            <Text
              className={`font-UrbanistBold text-xl ${
                theme === "dark" ? "text-dark-primary" : "text-primary"
              }`}
              style={{ fontSize: 19 }}
            >
              Business Account
            </Text>
            <Text
              className={`font-UrbanistMedium text-lg ${
                theme === "dark" ? "text-dark-secondary" : "text-secondary"
              }`}
              style={{ marginTop: 6, lineHeight: 26 }}
            >
              Grow your business with more advanced features.
            </Text>
          </View>
          <MaterialCommunityIcons
            name="greater-than"
            size={26}
            color={theme === "dark" ? "#A0A0A0" : "#616161"}
            style={{ paddingLeft: 8 }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpSelectAccountType;
