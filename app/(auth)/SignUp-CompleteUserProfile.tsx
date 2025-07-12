import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { router, useLocalSearchParams } from "expo-router";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import React, { useRef, useState } from "react";
import {
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

const SignUpCompleteUserProfile = () => {
  const [FullName, setFullName] = useState("");
  const [FullNameFocused, setFullNameFocused] = useState(false);
  const [FullNameError, setFullNameError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("GH");
  const [DateofBirth, setDateofBirth] = useState<Date | null>(null);
  const [DateofBirthFocused, setDateofBirthFocused] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateOfBirthError, setDateOfBirthError] = useState("");
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
  const { name, userEmail } = useLocalSearchParams();
  const displayName = Array.isArray(name) ? name[0] : name;

  // Helper to format date as mm/dd/yyyy
  const formatDate = (date: Date) => {
    if (isNaN(date.getTime())) return ""; // Return empty string if invalid date
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  const pickImage = async () => {
    // Ask for permission
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }
    // Launch image picker
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

  const handleErrors = () => {
    let valid = true;

    // Phone number validation
    if (!phoneNumber.trim()) {
      setPhoneError("Phone number is required");
      valid = false;
    } else if (!/^\d+$/.test(phoneNumber.trim())) {
      setPhoneError("Phone number must contain only digits");
      valid = false;
    } else {
      // Prepend country code and format to E.164
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
        // Optionally, store the E.164 format for backend use:
        // setPhoneNumber(phoneNumberObj.number);
      }
    }

    // Date of Birth validation
    if (!DateofBirth) {
      setDateOfBirthError("Please select your date of birth");
      valid = false;
    } else {
      // Calculate age
      const today = new Date();
      let age = today.getFullYear() - DateofBirth.getFullYear();
      const m = today.getMonth() - DateofBirth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < DateofBirth.getDate())) {
        age--;
      }
      if (age < 18) {
        setDateOfBirthError(
          "Access is restricted to users 18 years and above, in compliance with legal and banking regulations"
        );
        valid = false;
      } else {
        setDateOfBirthError("");
      }
    }

    if (valid) {
      router.push({
        pathname: "/(auth)/SignUp-SetPINCode",
        params: {
          name,
          userEmail,
          userDateofBirth: DateofBirth ? DateofBirth.toISOString() : null,
        },
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: 20, paddingBottom: 170 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            onScrollBeginDrag={Keyboard.dismiss}
          >
            <View className="flex-row items-center gap-10">
              <TouchableOpacity
                onPress={() => {
                  router.push("/(auth)/SignUp-IDCardPhoto");
                }}
              >
                <Ionicons
                  name="arrow-back"
                  size={28}
                  color="#0D0D0D"
                  style={{ padding: 6, marginTop: 22 }}
                />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: "#e5eaf0",
                  width: "60%",
                  height: 12,
                  borderRadius: 9999,
                  marginTop: 22,
                }}
              ></View>
              <View
                style={{
                  backgroundColor: "#82E394",
                  width: "60%",
                  height: 12,
                  borderRadius: 9999,
                  marginTop: 22,
                  position: "absolute",
                  left: 75,
                }}
              ></View>
            </View>
            <View className="flex" style={{ gap: 40 }}>
              <View className="flex" style={{ gap: 30, marginTop: 30 }}>
                <Text
                  style={{ lineHeight: 40 }}
                  className="font-UrbanistBold text-primary text-3xl"
                >
                  Last step, complete your profile 👤
                </Text>
                <Text
                  className="font-UrbanistMedium text-secondary text-lg -mt-2"
                  style={{ width: 320 }}
                >
                  Don't worry, your data remains safe and private. Only you can
                  see it.
                </Text>
              </View>
              <View className="flex items-center" style={{ marginTop: -10 }}>
                <View
                  style={{
                    width: 120,
                    height: 120,
                    backgroundColor: "#F6F8FA",
                    marginTop: -14,
                  }}
                  className="rounded-full flex items-center justify-center"
                >
                  {profileImage ? (
                    <>
                      <Image
                        source={{ uri: profileImage }}
                        style={{ width: 120, height: 120, borderRadius: 60 }}
                        resizeMode="cover"
                      />
                      {/* Remove button (shows only when image is set) */}
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
                  style={{ right: 114, bottom: -2 }}
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
              <View>
                <Text className="text-2xl font-UrbanistSemiBold">
                  Full Name
                </Text>
                <TextInput
                  value={displayName}
                  onChangeText={() => {}}
                  placeholder="Full Name"
                  placeholderTextColor="#9CA3AF"
                  className="text-xl font-UrbanistSemiBold border-none rounded-lg w-full p-5 bg-[#F6F8FA] text-primary mt-3 opacity-4 focus:outline-none focus:border-blue-400"
                  onFocus={() => setFullNameFocused(true)}
                  onBlur={() => setFullNameFocused(false)}
                  editable={false}
                />
              </View>
              <View>
                <Text className="text-2xl font-UrbanistSemiBold">
                  Phone Number
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#F6F8FA",
                    borderRadius: 12,
                    height: 56,
                    marginTop: 12,
                  }}
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
                      color="#0D0D0D"
                      style={{ marginLeft: 2 }}
                    />
                    <Text
                      style={{
                        marginLeft: 12,
                        fontSize: 18,
                        fontFamily: "Urbanist-SemiBold",
                      }}
                    >
                      +{country.callingCode[0]}
                    </Text>
                  </TouchableOpacity>
                  <TextInput
                    style={{
                      flex: 1,
                      fontSize: 18,
                      fontFamily: "Urbanist-SemiBold",
                      color: "#0D0D0D",
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      backgroundColor: "transparent",
                      marginLeft: -14,
                    }}
                    keyboardType="phone-pad"
                    placeholder="  Phone Number"
                    placeholderTextColor="#9CA3AF"
                    value={phoneNumber}
                    onChangeText={(text) => {
                      // Remove all non-digit characters
                      const digitsOnly = text.replace(/\D/g, "");
                      setPhoneNumber(digitsOnly);
                      if (phoneError) setPhoneError("");
                    }}
                  />
                </View>
                {phoneError ? (
                  <Text
                    style={{
                      color: "#E53E3E",
                      marginLeft: 8,
                      marginTop: 4,
                      fontSize: 16,
                      fontFamily: "Urbanist-Medium",
                    }}
                  >
                    {phoneError}
                  </Text>
                ) : null}
              </View>
              <View className="relative">
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  style={{
                    position: "absolute",
                    right: 24,
                    top: 55,
                    zIndex: 1,
                  }}
                  activeOpacity={0.7}
                >
                  <FontAwesome5 name="calendar-alt" size={24} color="#0D0D0D" />
                </TouchableOpacity>
                <Text className="text-2xl font-UrbanistSemiBold">
                  Date of Birth
                </Text>
                <TextInput
                  value={DateofBirth ? formatDate(DateofBirth) : ""}
                  onChangeText={() => {}} // keep empty or remove, since input is not editable
                  keyboardType="numeric"
                  placeholder="mm/dd/yyyy"
                  placeholderTextColor="#9CA3AF"
                  className="text-xl font-UrbanistSemiBold border-none rounded-lg w-full p-5 bg-[#F6F8FA] text-primary mt-3 opacity-4 focus:outline-none focus:border-blue-400"
                  editable={false}
                />
                {dateOfBirthError ? (
                  <Text
                    style={{
                      color: "#E53E3E",
                      marginLeft: 8,
                      marginTop: 8,
                      fontSize: 16,
                      fontFamily: "Urbanist-Medium",
                    }}
                  >
                    {dateOfBirthError}
                  </Text>
                ) : null}
                {showDatePicker && (
                  <DateTimePicker
                    value={DateofBirth || new Date()}
                    mode="date"
                    display="default"
                    onChange={(_, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate && !isNaN(selectedDate.getTime())) {
                        setDateofBirth(selectedDate);
                        setDateOfBirthError("");
                      }
                    }}
                    maximumDate={new Date()}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
            onPress={handleErrors}
          >
            <Text className="font-UrbanistSemiBold text-buttontext text-primary">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUpCompleteUserProfile;
