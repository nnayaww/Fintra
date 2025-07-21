import { useTheme } from "@/lib/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
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
import { useSignUp } from "@/context/SignUpContext";

const SignUpFullName = () => {
  const { theme } = useTheme();
  const { updateForm } = useSignUp();

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
  });

  const validateName = (name: string) => /^[A-Za-z\s]+$/.test(name.trim());

  const handleContinue = () => {
    let valid = true;
    const newErrors = { firstName: "", lastName: "" };

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
      valid = false;
    } else if (!validateName(firstName)) {
      newErrors.firstName = "Only letters and spaces allowed";
      valid = false;
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
      valid = false;
    } else if (!validateName(lastName)) {
      newErrors.lastName = "Only letters and spaces allowed";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      updateForm({
        first_name: firstName.trim(),
        middle_name: middleName.trim(),
        last_name: lastName.trim(),
      });

      router.push("/(auth)/SignUp-SelectCountry");
    }
  };

  const inputStyle = `text-xl font-UrbanistSemiBold border-none rounded-lg w-full p-5 mt-3 ${
    theme === "dark"
      ? "bg-dark-secondary text-dark-primary"
      : "bg-[#F6F8FA] text-primary"
  }`;

  const labelStyle = `text-2xl font-UrbanistSemiBold ${
    theme === "dark" ? "text-dark-primary" : "text-primary"
  }`;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        className={`flex-1 p-5 gap-10 ${
          theme === "dark" ? "bg-dark-background" : "bg-white"
        }`}
      >
        {/* Progress Header */}
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
              width: "24%",
              height: 12,
              borderRadius: 9999,
              marginTop: 22,
              position: "absolute",
              left: 75,
            }}
          />
        </View>

        {/* Title */}
        <View className="gap-10">
          <Text className={`font-UrbanistBold text-3xl ${theme === "dark" ? "text-dark-primary" : "text-primary"}`} style={{ lineHeight: 40 }}>
            What is your name? 👤
          </Text>
          <Text className={`font-UrbanistMedium text-lg -mt-2 ${theme === "dark" ? "text-dark-secondary" : "text-secondary"}`}>
            Enter your full legal name according to your ID.
          </Text>
        </View>

        {/* Input Fields */}
        <View className="gap-6">
          {/* First Name */}
          <View>
            <Text className={labelStyle}>First Name</Text>
            <TextInput
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              placeholder="First Name"
              placeholderTextColor="#9CA3AF"
              className={inputStyle}
            />
            {errors.firstName ? (
              <Text style={{ color: "#E53E3E", marginLeft: 8, marginTop: 4, fontSize: 16, fontFamily: "Urbanist-Medium" }}>
                {errors.firstName}
              </Text>
            ) : null}
          </View>

          {/* Middle Name (Optional) */}
          <View>
            <Text className={labelStyle}>Middle Name (optional)</Text>
            <TextInput
              value={middleName}
              onChangeText={(text) => setMiddleName(text)}
              placeholder="Middle Name"
              placeholderTextColor="#9CA3AF"
              className={inputStyle}
            />
          </View>

          {/* Last Name */}
          <View>
            <Text className={labelStyle}>Last Name</Text>
            <TextInput
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              placeholder="Last Name"
              placeholderTextColor="#9CA3AF"
              className={inputStyle}
            />
            {errors.lastName ? (
              <Text style={{ color: "#E53E3E", marginLeft: 8, marginTop: 4, fontSize: 16, fontFamily: "Urbanist-Medium" }}>
                {errors.lastName}
              </Text>
            ) : null}
          </View>
        </View>

        {/* Continue Button */}
        <View style={{ position: "absolute", left: 20, right: 20, bottom: 48 }}>
          <TouchableOpacity
            className="bg-general flex items-center justify-center p-5 border-none rounded-full"
            onPress={handleContinue}
          >
            <Text
              className={`font-UrbanistSemiBold text-buttontext ${
                theme === "dark" ? "text-dark-primary" : "text-primary"
              }`}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUpFullName;
