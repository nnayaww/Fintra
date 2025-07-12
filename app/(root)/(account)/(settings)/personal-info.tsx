import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { router } from "expo-router";
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

const PersonalInfo = () => {
  const [FullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [emailError, setEmailError] = useState("");
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

    // FullName validation
    if (!FullName.trim()) {
      setFullNameError("This field is required");
      valid = false;
    } else if (!/^[A-Za-z\s]+$/.test(FullName.trim())) {
      setFullNameError("Name can only contain letters and spaces");
      valid = false;
    } else {
      setFullNameError("");
    }

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
    if (valid) {
      router.replace("/(root)/(tabs)/account");
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
            <View className="flex-row items-center mt-3">
              <TouchableOpacity
                onPress={() => {
                  router.replace("/(root)/(tabs)/account");
                }}
              >
                <Ionicons
                  name="arrow-back"
                  size={28}
                  color="#0D0D0D"
                  style={{ padding: 6, marginTop: 22 }}
                />
              </TouchableOpacity>
              <Text
                className="font-UrbanistBold text-3xl text-primary mt-5"
                style={{ marginHorizontal: 55 }}
              >
                Personal Info
              </Text>
            </View>
            <View className="flex" style={{ gap: 30 }}>
              <View className="flex items-center" style={{ marginTop: 40 }}>
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
              <View className="mt-5">
                <Text className="text-2xl font-UrbanistSemiBold">
                  Full Name
                </Text>
                <TextInput
                  value={FullName}
                  onChangeText={(text) => {
                    setFullName(text);
                    if (FullNameError) setFullNameError("");
                  }}
                  placeholder="Full Name"
                  placeholderTextColor="#9CA3AF"
                  className="text-xl font-UrbanistSemiBold border-none rounded-lg w-full p-5 bg-[#F6F8FA] text-primary mt-3 opacity-4 focus:outline-none focus:border-blue-400"
                  onFocus={() => setFullNameFocused(true)}
                  onBlur={() => setFullNameFocused(false)}
                />
                {FullNameError ? (
                  <Text
                    style={{
                      color: "#E53E3E",
                      marginLeft: 8,
                      marginTop: 4,
                      fontSize: 16,
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
                <Text className="text-2xl font-UrbanistSemiBold">Email</Text>
                <TextInput
                  /* value={user.email} user's email from signup */
                  placeholder="         user@example.com"
                  placeholderTextColor="#9CA3AF"
                  selectTextOnFocus={false}
                  className="text-xl font-UrbanistSemiBold border-none rounded-lg w-full p-5 bg-[#F6F8FA] text-primary mt-3 opacity-4 focus:outline-none focus:border-blue-400"
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
                  keyboardType="numeric"
                  placeholder="mm/dd/yyyy"
                  placeholderTextColor="#9CA3AF"
                  className="text-xl font-UrbanistSemiBold border-none rounded-lg w-full p-5 bg-[#F6F8FA] text-primary mt-3 opacity-4 focus:outline-none focus:border-blue-400"
                  editable={false}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View
          style={{
            position: "absolute",
            left: 20,
            right: 20,
            bottom: 40,
          }}
        >
          <TouchableOpacity
            className="bg-general flex items-center justify-center p-5 border-none rounded-full"
            onPress={handleErrors}
          >
            <Text className="font-UrbanistSemiBold text-buttontext text-primary">
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PersonalInfo;
