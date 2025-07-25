import { useTheme } from "@/lib/ThemeContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Keyboard,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

const AddNewContact = () => {
  const [AccountHolderName, setAccountHolderName] = useState("");
  const [AccountHolderNameFocused, setAccountHolderNameFocused] =
    useState(false);
  const [AccountHolderNameError, setAccountHolderNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (showModal) {
      timeout = setTimeout(() => {
        setShowModal(false);
        router.push({
          pathname: "/(root)/(contacts)/search-contact-to-add",
          params: { AccountHolderName, email },
        });
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [showModal]);

  const handleSearchContact = () => {
    let valid = true;

    // AccountHolderName validation
    if (!AccountHolderName.trim()) {
      setAccountHolderNameError("This field is required");
      valid = false;
    } else if (!/^[A-Za-z\s]+$/.test(AccountHolderName.trim())) {
      setAccountHolderNameError("Name can only contain letters and spaces");
      valid = false;
    } else {
      setAccountHolderNameError("");
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
      // Email format check
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    if (valid) {
      setShowModal(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        className={`flex-1 p-5 ${
          theme === "dark" ? "bg-dark-background" : "bg-white"
        }`}
      >
        <View className="flex-row items-center mt-3">
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
          <Text
            className={`font-UrbanistBold mt-5 ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ marginHorizontal: 40, fontSize: 24 }}
          >
            Add New Contact
          </Text>
        </View>
        <View className="mt-3">
          <View style={{ marginTop: 30 }}>
            <Text
              className={`text-2xl font-UrbanistSemiBold ${
                theme === "dark" ? "text-dark-primary" : "text-primary"
              }`}
            >
              Account Holder Name
            </Text>
            <TextInput
              value={AccountHolderName}
              onChangeText={(text) => {
                setAccountHolderName(text);
                if (AccountHolderNameError) setAccountHolderNameError("");
              }}
              placeholder="Account Holder Name"
              placeholderTextColor={theme === "dark" ? "#B0B0B0" : "#9CA3AF"}
              className={`text-xl font-UrbanistSemiBold border-none rounded-lg w-full p-5 mt-3 focus:outline-none focus:border-blue-400 ${
                theme === "dark"
                  ? "bg-[#23262F] text-white"
                  : "bg-[#F6F8FA] text-primary"
              }`}
              onFocus={() => setAccountHolderNameFocused(true)}
              onBlur={() => setAccountHolderNameFocused(false)}
            />
            {AccountHolderNameError ? (
              <Text
                style={{
                  color: "#E53E3E",
                  marginLeft: 8,
                  marginTop: 4,
                  fontSize: 16,
                  fontFamily: "Urbanist-Medium",
                }}
              >
                {AccountHolderNameError}
              </Text>
            ) : null}
          </View>
          <View className="relative mt-8">
            {email.length === 0 && (
              <MaterialIcons
                name="email"
                size={24}
                color={theme === "dark" ? "#A0A0A0" : "#9CA3AF"}
                style={{
                  position: "absolute",
                  left: 20,
                  top: 64,
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
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) setEmailError("");
              }}
              placeholder="         Email"
              placeholderTextColor={theme === "dark" ? "#B0B0B0" : "#9CA3AF"}
              className={`text-xl font-UrbanistSemiBold border-none rounded-lg w-full p-5 mt-3 focus:outline-none focus:border-blue-400 ${
                theme === "dark"
                  ? "bg-[#23262F] text-white"
                  : "bg-[#F6F8FA] text-primary"
              }`}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />
            {emailError ? (
              <Text
                style={{
                  color: "#E53E3E",
                  marginLeft: 8,
                  marginTop: 4,
                  fontSize: 16,
                  fontFamily: "Urbanist-Medium",
                }}
              >
                {emailError}
              </Text>
            ) : null}
          </View>
        </View>
        <View
          className="flex-row gap-4 items-center"
          style={{ position: "absolute", right: 20, left: 20, bottom: 46 }}
        >
          <TouchableOpacity
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace("/(root)/(tabs)/home");
              }
            }}
            className={`flex-1 items-center justify-center p-5 border-[1.5px] border-general rounded-full ${
              theme === "dark" ? "bg-dark-background" : "bg-white"
            }`}
          >
            <Text
              className={`font-UrbanistSemiBold text-xl ${
                theme === "dark" ? "text-dark-primary" : "text-primary"
              }`}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSearchContact}
            className="bg-general flex-1 items-center justify-center p-5 border-none rounded-full"
          >
            <Text
              className={`font-UrbanistSemiBold text-xl ${
                theme === "dark" ? "text-dark-primary" : "text-primary"
              }`}
            >
              Search Contact
            </Text>
          </TouchableOpacity>
        </View>

        <Modal visible={showModal} transparent animationType="fade">
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.4)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: "60%",
                width: "80%",
                backgroundColor: theme === "dark" ? "#333" : "white",
                borderRadius: 20,
                padding: 20,
              }}
              className="flex items-center gap-10"
            >
              <View>
                <View
                  style={{
                    width: 170,
                    height: 170,
                    backgroundColor: "#82E394",
                    marginTop: 14,
                  }}
                  className="rounded-full flex items-center justify-center"
                >
                  <FontAwesome5
                    name="user-alt"
                    size={50}
                    color={theme === "dark" ? "#fff" : "#0D0D0D"}
                  />
                </View>
                <View
                  className="rounded-full"
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: "#82E394",
                    position: "absolute",
                    bottom: 40,
                    left: -24,
                  }}
                ></View>
                <View
                  className="rounded-full"
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor: "#82E394",
                    position: "absolute",
                    bottom: -8,
                    left: 20,
                  }}
                ></View>
                <View
                  className="rounded-full"
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: "#82E394",
                    position: "absolute",
                    top: 10,
                    left: -20,
                  }}
                ></View>
                <View
                  className="rounded-full"
                  style={{
                    width: 14,
                    height: 14,
                    backgroundColor: "#82E394",
                    position: "absolute",
                    top: 28,
                    right: -20,
                  }}
                ></View>
                <View
                  className="rounded-full"
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: "#82E394",
                    position: "absolute",
                    top: -1,
                    right: 80,
                  }}
                ></View>
                <View
                  className="rounded-full"
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: "#82E394",
                    position: "absolute",
                    bottom: -1,
                    right: 2,
                  }}
                ></View>
                <View
                  className="rounded-full"
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: "#82E394",
                    position: "absolute",
                    bottom: 50,
                    right: -18,
                  }}
                ></View>
              </View>
              <View style={{ marginTop: -10 }}>
                <Text
                  className={`font-UrbanistBold ${
                    theme === "dark" ? "text-dark-primary" : "text-primary"
                  }`}
                  style={{ fontSize: 34 }}
                >
                  Searching Contact...
                </Text>
              </View>
              <View style={{ marginTop: -10 }}>
                <Text
                  className={`text-center font-UrbanistMedium text-lg ${
                    theme === "dark" ? "text-dark-secondary" : "text-secondary"
                  }`}
                  style={{ lineHeight: 28 }}
                >
                  Please wait while we search for the contact.
                </Text>
                <ActivityIndicator
                  size={65}
                  color="#82E394"
                  style={{ marginTop: 24 }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddNewContact;