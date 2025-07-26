import { useSignUp } from "@/context/SignUpContext";
import { useTheme } from "@/lib/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  Keyboard,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";

const SignUpCompleteUserProfile = () => {
  const { theme } = useTheme();
  const { phone, dob, country, updateForm } = useSignUp();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const shakeAnim = new Animated.Value(0);

  const handleValidation = () => {
    const newErrors: typeof errors = {};
    if (!phone) newErrors.phone = "Phone number is required";
    if (!dob) newErrors.dob = "Date of birth is required";
    if (!country) newErrors.country = "Country is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) triggerShake();
    return Object.keys(newErrors).length === 0;
  };

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -6, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const formatDate = (date: Date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleSubmit = () => {
    if (!handleValidation()) return;
    router.push("/(auth)/SignUp-Review");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView
        className={`flex-1 px-6 pt-16 gap-6 ${
          theme === "dark" ? "bg-dark-background" : "bg-white"
        }`}
      >
       <View style={{ flexDirection: 'row', gap: 10 }}>
         <TouchableOpacity onPress={router.back}>
            <Ionicons
              name="arrow-back"
              size={28}
              color={theme === "dark" ? "#fff" : "#0D0D0D"}
              style={{ padding: 6, }}
            />
          </TouchableOpacity>
        <Text
          className={`text-3xl  mt-1 font-UrbanistBold ${
            theme === "dark" ? "text-dark-primary" : "text-primary"
          }`}
        >
          Complete your profile 📝
        </Text>
       </View>

        {/* Country Picker */}
        <View style={{marginTop: 20, marginBottom: 30}} >
          <Text
            className={`text-2xl font-UrbanistSemiBold mb-2 ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
          >
            Country
          </Text>
          <CountryPicker
            withFilter
            withFlag
            withCountryNameButton
            withAlphaFilter
            withCallingCodeButton
            countryCode={country as any}
            onSelect={(country) => {
              updateForm({ country: country.cca2 });
              setErrors((prev) => ({ ...prev, country: "" }));
            }}
            theme={{
              backgroundColor: theme === "dark" ? "#1A1A1A" : "#fff",
              onBackgroundTextColor: theme === "dark" ? "#fff" : "#000",
            }}
          />
          {errors.country && <Text className="text-red-500 mt-1">{errors.country}</Text>}
        </View>

        {/* Phone Number */}
        <View style={{ marginBottom: 30}}>
          <Text
            className={`text-2xl font-UrbanistSemiBold mb-2 ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
          >
            Phone Number
          </Text>
          <TextInput
            value={phone}
            onChangeText={(text) => {
              updateForm({ phone: text });
              setErrors((prev) => ({ ...prev, phone: "" }));
            }}
            keyboardType="phone-pad"
            placeholder="Enter phone number"
            placeholderTextColor={theme === "dark" ? "#B0B0B0" : "#9CA3AF"}
            className={`text-xl font-UrbanistSemiBold border-none rounded-lg w-full p-5 mt-3 focus:outline-none focus:border-blue-400 ${
              theme === "dark"
                ? "bg-[#23262F] text-white"
                : "bg-[#F6F8FA] text-primary"
            }`}
          />
          {errors.phone && <Text className="text-red-500 mt-1">{errors.phone}</Text>}
        </View>

        {/* Date of Birth */}
        <View className="relative">
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={{ position: "absolute", right: 24, top: 55, zIndex: 1 }}
            activeOpacity={0.7}
          >
            <FontAwesome5
              name="calendar-alt"
              size={24}
              color={theme === "dark" ? "#fff" : "#0D0D0D"}
            />
          </TouchableOpacity>
          <Text
            className={`text-2xl font-UrbanistSemiBold ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
          >
            Date of Birth
          </Text>
          <TextInput
            value={dob ? formatDate(new Date(dob)) : ""}
            editable={false}
            placeholder="mm/dd/yyyy"
            placeholderTextColor={theme === "dark" ? "#B0B0B0" : "#9CA3AF"}
            className={`text-xl font-UrbanistSemiBold border-none rounded-lg w-full p-5 mt-3 ${
              theme === "dark"
                ? "bg-[#23262F] text-white"
                : "bg-[#F6F8FA] text-primary"
            }`}
          />
          {dateOfBirthError && (
            <Animated.Text
              style={{
                transform: [{ translateX: shakeAnim }],
                color: "#E53E3E",
                marginLeft: 8,
                marginTop: 8,
                fontSize: 16,
                fontFamily: "Urbanist-Medium",
              }}
            >
              {dateOfBirthError}
            </Animated.Text>
          )}
          {showDatePicker && (
            <DateTimePicker
              value={dob ? new Date(dob) : new Date()}
              mode="date"
              display="default"
              onChange={(_, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate && !isNaN(selectedDate.getTime())) {
                  updateForm({ dob: selectedDate.toISOString() });
                  setDateOfBirthError("");
                }
              }}
              maximumDate={new Date()}
            />
          )}
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          // className="mt-auto bg-primary py-4 rounded-xl mb-6"
          // className="mt-20 bg-primary py-4 rounded-xl"
          style={{backgroundColor: 'black', paddingTop: 10, paddingBottom: 10, borderWidth:1, borderColor: "transparent", borderRadius: 6, marginTop: 100}}
        >
          <Text className="text-center text-white text-xl font-UrbanistBold">
            Continue
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default SignUpCompleteUserProfile;
