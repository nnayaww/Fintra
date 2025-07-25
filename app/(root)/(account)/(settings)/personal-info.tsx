import { useTheme } from "@/lib/ThemeContext";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { router } from "expo-router";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CountryPicker, {
  Country,
  CountryCode,
  getCallingCode,
} from "react-native-country-picker-modal";
import PhoneInput from "react-native-phone-number-input";

const PhoneInputAny = PhoneInput as any;
const { width } = Dimensions.get("window");

const PersonalInfo = () => {
  const [FullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [FullNameFocused, setFullNameFocused] = useState(false);
  const [FullNameError, setFullNameError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("GH");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [country, setCountry] = useState<Country>({
    cca2: "GH",
    callingCode: ["233"],
    region: "Africa",
    subregion: "Western Africa",
    currency: ["GHS"],
    flag: "🇬🇭",
    name: "Ghana",
  });
  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const phoneInput = useRef<PhoneInput>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchUserData = async () => {
      const userFullName = await AsyncStorage.getItem("fullName");
      const userEmail = await AsyncStorage.getItem("email");
      const userPhone = await AsyncStorage.getItem("phone");

      if (userFullName) setFullName(userFullName);
      if (userEmail) setEmail(userEmail);
      if (userPhone) setPhoneNumber(userPhone);
    };
    fetchUserData();
  }, []);

  const formatDate = (date: Date) => {
    if (isNaN(date.getTime())) return "";
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      let location = await Location.getCurrentPositionAsync({});
      let geocode = await Location.reverseGeocodeAsync(location.coords);
      if (geocode && geocode.length > 0 && geocode[0].isoCountryCode) {
        const cca2 = geocode[0].isoCountryCode as CountryCode;
        const callingCode = await getCallingCode(cca2);
        setCountry((prev) => ({
          ...prev,
          cca2,
          callingCode: [callingCode],
        }));
      }
    })();
  }, []);

  const handleSave = async () => {
    let valid = true;

    if (!FullName.trim()) {
      setFullNameError("This field is required");
      valid = false;
    } else if (!/^[A-Za-z\s]+$/.test(FullName.trim())) {
      setFullNameError("Name can only contain letters and spaces");
      valid = false;
    } else {
      setFullNameError("");
    }

    if (!phoneNumber.trim()) {
      setPhoneError("Phone number is required");
      valid = false;
    } else if (!/^\d+$/.test(phoneNumber.trim())) {
      setPhoneError("Phone number must contain only digits");
      valid = false;
    } else {
      const e164Number = `+${country.callingCode[0]}${phoneNumber}`;
      const phoneNumberObj = parsePhoneNumberFromString(
        e164Number,
        country.cca2 as any
      );
      if (!phoneNumberObj || !phoneNumberObj.isValid()) {
        setPhoneError("Invalid phone number format");
        valid = false;
      } else {
        setPhoneError("");
      }
    }

    if (!valid) return;

    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");

      if (!userId || !token) return;

      const [firstName, ...lastName] = FullName.split(" ");
      const response = await fetch(
        `https://fintra-1.onrender.com/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName.join(" "),
            phone: phoneNumber,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update user information");
      }

      await AsyncStorage.setItem("fullName", FullName);
      await AsyncStorage.setItem("phone", phoneNumber);

      router.push("/(root)/(tabs)/account");
    } catch (error) {
      console.error("Failed to save user data:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        className={`flex-1 ${
          theme === "dark" ? "bg-dark-background" : "bg-white"
        }`}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 20,
              paddingBottom: 170,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            onScrollBeginDrag={Keyboard.dismiss}
          >
            <View className="flex-row items-center mt-3">
              <TouchableOpacity onPress={() => router.back()}>
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
                style={{ marginLeft: width > 360 ? 55 : 30 }}
              >
                Personal Info
              </Text>
            </View>

            <View className="flex" style={{ gap: 30 }}>
              <View className="flex items-center" style={{ marginTop: 40 }}>
                <View
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: "#F6F8FA",
                    marginTop: -14,
                  }}
                  className="rounded-full flex items-center justify-center"
                >
                  {profileImage ? (
                    <>
                      <Image
                        source={{ uri: profileImage }}
                        style={{ width: 100, height: 100, borderRadius: 50 }}
                        resizeMode="cover"
                      />
                      <TouchableOpacity
                        style={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          backgroundColor: "#fff",
                          borderRadius: 12,
                          padding: 2,
                          elevation: 2,
                        }}
                        onPress={() => setProfileImage(null)}
                      >
                        <MaterialCommunityIcons
                          name="close-circle"
                          size={24}
                          color="#E53E3E"
                        />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <FontAwesome5 name="user-alt" size={24} color="#898989" />
                  )}
                </View>
                <TouchableOpacity
                  className="absolute"
                  style={{ right: width > 360 ? 104 : 90, bottom: -2 }}
                  onPress={pickImage}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons
                    name="pencil-box"
                    size={32}
                    color="#82E394"
                  />
                </TouchableOpacity>
              </View>

              <View className="mt-5">
                <Text
                  className={`text-2xl font-UrbanistSemiBold ${
                    theme === "dark" ? "text-dark-primary" : "text-primary"
                  }`}
                >
                  Full Name
                </Text>
                <TextInput
                  value={FullName}
                  onChangeText={(text) => {
                    setFullName(text);
                    if (FullNameError) setFullNameError("");
                  }}
                  placeholder="Full Name"
                  placeholderTextColor={theme === "dark" ? "#B0B0B0" : "#9CA3AF"}
                  className={`text-xl font-UrbanistSemiBold border-none rounded-lg w-full p-5 mt-3 focus:outline-none focus:border-blue-400 ${
                    theme === "dark"
                      ? "bg-[#23262F] text-white"
                      : "bg-[#F6F8FA] text-primary"
                  }`}
                  onFocus={() => setFullNameFocused(true)}
                  onBlur={() => setFullNameFocused(false)}
                />
                {FullNameError ? (
                  <Text
                    style={{
                      color: "#E53E3E",
                      marginLeft: 8,
                      marginTop: 4,
                      fontSize: width > 360 ? 16 : 14,
                      fontFamily: "Urbanist-Medium",
                    }}
                  >
                    {FullNameError}
                  </Text>
                ) : null}
              </View>

              <View className="relative">
                {email.length === 0 && (
                  <MaterialIcons
                    name="email"
                    size={24}
                    color={emailFocused ? "#0D0D0D" : "#9CA3AF"}
                    style={{
                      position: "absolute",
                      left: 20,
                      top: 57,
                      zIndex: 1,
                    }}
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
                  placeholder="         user@example.com"
                  placeholderTextColor={theme === "dark" ? "#B0B0B0" : "#9CA3AF"}
                  selectTextOnFocus={false}
                  className={`text-xl font-UrbanistSemiBold border-none rounded-lg w-full p-5 mt-3 focus:outline-none focus:border-blue-400 ${
                    theme === "dark"
                      ? "bg-[#23262F] text-white"
                      : "bg-[#F6F8FA] text-primary"
                  }`}
                  editable={false}
                />
              </View>

              <View>
                <Text
                  className={`text-2xl font-UrbanistSemiBold ${
                    theme === "dark" ? "text-dark-primary" : "text-primary"
                  }`}
                >
                  Phone Number
                </Text>
                <View
                  className={`flex-row items-center rounded-lg h-14 mt-3 ${
                    theme === "dark" ? "bg-dark-secondary" : "bg-[#F6F8FA]"
                  }`}
                >
                  <TouchableOpacity
                    onPress={() => setShowCountryPicker(true)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 10,
                    }}
                    activeOpacity={0.7}
                  >
                    <CountryPicker
                      countryCode={country.cca2}
                      withFlag
                      withCallingCode
                      withFilter
                      withAlphaFilter
                      onSelect={setCountry}
                      visible={showCountryPicker}
                      onClose={() => setShowCountryPicker(false)}
                      withCallingCodeButton={false}
                    />
                    <Feather
                      name="chevron-down"
                      size={24}
                      color={theme === "dark" ? "#fff" : "#0D0D0D"}
                      style={{ marginLeft: 2 }}
                    />
                    <Text
                      className={`ml-3 text-lg font-UrbanistSemiBold ${
                        theme === "dark" ? "text-dark-primary" : "text-primary"
                      }`}
                    >
                      +{country.callingCode[0]}
                    </Text>
                  </TouchableOpacity>
                  <TextInput
                    className={`flex-1 text-lg font-UrbanistSemiBold py-2.5 px-2.5 bg-transparent ml-[-14] ${
                      theme === "dark" ? "text-white" : "text-primary"
                    }`}
                    keyboardType="phone-pad"
                    placeholder="  Phone Number"
                    placeholderTextColor={theme === "dark" ? "#B0B0B0" : "#9CA3AF"}
                    value={phoneNumber}
                    onChangeText={(text) => {
                      const digitsOnly = text.replace(/\D/g, "");
                      setPhoneNumber(digitsOnly);
                      if (phoneError) setPhoneError("");
                    }}
                    editable={true}
                  />
                </View>
                {phoneError ? (
                  <Text
                    style={{
                      color: "#E53E3E",
                      marginLeft: 8,
                      marginTop: 4,
                      fontSize: width > 360 ? 16 : 14,
                      fontFamily: "Urbanist-Medium",
                    }}
                  >
                    {phoneError}
                  </Text>
                ) : null}
              </View>
            </View>

            <View style={{ marginTop: 80  }}>
          <TouchableOpacity
            className="bg-general flex items-center justify-center p-5 border-none rounded-full"
            onPress={handleSave}
          >
            <Text className="font-UrbanistSemiBold text-buttontext text-primary">
              Save
            </Text>
          </TouchableOpacity>
        </View>
          </ScrollView>
        </KeyboardAvoidingView>

        
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PersonalInfo;
