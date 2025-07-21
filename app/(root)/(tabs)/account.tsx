import ThemeToggleButton from "@/components/ThemeToggleButton";
import { icons, images } from "@/constants";
import { useTheme } from "@/lib/ThemeContext";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";

const Account = () => {
  const { theme } = useTheme();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showQRCodeModal, setshowQRCodeModal] = useState(false);
  const [showLogoutModal, setshowLogoutModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userFullName = await AsyncStorage.getItem("fullName");
      const userEmail = await AsyncStorage.getItem("email");

      if (userFullName) setFullName(userFullName);
      if (userEmail) setEmail(userEmail);
    };
    fetchUserData();
  }, []);

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

  const handleShare = async () => {
    try {
      await Share.share({
        message: "Scan my QR code to connect with me on FinTra!",
        // If you want to share an image, you can use the 'url' property:
        url: "@/assets/images/QRCode.png",
      });
    } catch (error) {
      // Optionally handle error
    }
  };

  return (
    <View
      className={`flex-1 ${
        theme === "dark" ? "bg-dark-background" : "bg-white"
      }`}
    >
      <View
        className={`pt-12 pb-6 px-5 ${
          theme === "dark" ? "bg-[#23262F]" : "bg-white"
        }`}
    >
        <View className="flex-row px-5 mt-3">
        <Image
          source={theme === "dark" ? images.GreenLogo : images.BlackLogo}
          style={{ width: 50, height: 40, marginTop: 15, marginLeft: -14 }}
        />
        <Text
            className={`font-UrbanistBold text-3xl mt-5 ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
          style={{ marginHorizontal: 80 }}
        >
          Account
        </Text>
      </View>
        <View
          className="flex-row justify-between p-3"
          style={{ marginTop: 22 }}
        >
        <View
          style={{
            width: 78,
            height: 78,
            backgroundColor: theme === "dark" ? "#333" : "#F6F8FA",
          }}
          className="rounded-full flex items-center justify-center"
        >
          {profileImage ? (
            <>
              <Image
                source={{ uri: profileImage }}
                style={{ width: 78, height: 78, borderRadius: 60 }}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: -8,
                  right: -6,
                  backgroundColor: theme === "dark" ? "#000" : "#fff",
                  borderRadius: 12,
                  padding: 2,
                  elevation: 2,
                }}
              >
                <MaterialCommunityIcons
                  name="close-circle"
                  size={24}
                  color="#E53E3E"
                />
              </TouchableOpacity>
            </>
          ) : (
            <FontAwesome5
              name="user-alt"
              size={24}
              color={theme === "dark" ? "#A0A0A0" : "#9CA3AF"}
            />
          )}
        </View>
        <View className="flex-row items-center" style={{ paddingLeft: 20 }}>
          <View style={{ width: "80%" }}>
            <Text
                className={`font-UrbanistBold text-xl ${
                  theme === "dark" ? "text-dark-primary" : "text-primary"
                }`}
              style={{ fontSize: 19 }}
            >
                {fullName}
            </Text>
            <Text
                className={`font-UrbanistMedium text-lg ${
                  theme === "dark" ? "text-dark-secondary" : "text-secondary"
                }`}
              style={{ marginTop: 6, lineHeight: 26, width: "80%" }}
            >
                {email}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setshowQRCodeModal(true)}
            style={{ marginLeft: -10 }}
          >
            <MaterialCommunityIcons
              name="qrcode"
              size={32}
              color={theme === "dark" ? "#fff" : "black"}
            />
          </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={Keyboard.dismiss}
      >
        <View
          className="flex-row px-5 items-center gap-4"
          style={{ marginTop: 14 }}
        >
          <Text
            className={`font-UrbanistSemiBold text-xl ${theme === "dark" ? "text-dark-secondary" : "text-[#8f949b]"}`}
          >
            General
          </Text>
          <View
            className="h-[1px]"
            style={{
              width: "80%",
              backgroundColor: theme === "dark" ? "#444" : "#e6e6e6",
            }}
          ></View>
        </View>
        <View className="flex gap-4" style={{ marginTop: 16 }}>
          <TouchableOpacity
            className="flex-row justify-between items-center p-3 w-full"
            onPress={() =>
              router.push(
                "/(root)/(account)/(payment-methods)/payment-methods"
              )
            }
          >
            <FontAwesome
              name="credit-card"
              size={24}
              color={theme === "dark" ? "#A0A0A0" : "#616161"}
              style={{ marginTop: 2, marginLeft: 10 }}
            />
            <Text
              className={`font-UrbanistBold ${theme === "dark" ? "text-dark-primary" : "text-primary"}`}
              style={{ fontSize: 18, marginLeft: -94 }}
            >
              Payment Methods
            </Text>
            <MaterialCommunityIcons
              name="greater-than"
              size={25}
              color={theme === "dark" ? "#fff" : "#0D0D0D"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row justify-between items-center p-3 w-full"
            onPress={() =>
              router.push("/(root)/(account)/(settings)/personal-info")
            }
          >
            <FontAwesome5
              name="user"
              size={24}
              color={theme === "dark" ? "#A0A0A0" : "#616161"}
              style={{ marginTop: 2, marginLeft: 11 }}
            />
            <Text
              className={`font-UrbanistBold ${theme === "dark" ? "text-dark-primary" : "text-primary"}`}
              style={{ fontSize: 18, marginLeft: -132 }}
            >
              Personal Info
            </Text>
            <MaterialCommunityIcons
              name="greater-than"
              size={25}
              color={theme === "dark" ? "#fff" : "#0D0D0D"}
              style={{}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row justify-between items-center p-3 w-full"
            onPress={() =>
              router.push("/(root)/(account)/(settings)/notification-settings")
            }
          >
            <Image
              source={icons.bell}
              style={{ width: 28, height: 31, marginLeft: 7 }}
            />
            <Text
              className={`font-UrbanistBold ${theme === "dark" ? "text-dark-primary" : "text-primary"}`}
              style={{ fontSize: 18, marginLeft: -146 }}
            >
              Notification
            </Text>
            <MaterialCommunityIcons
              name="greater-than"
              size={25}
              color={theme === "dark" ? "#fff" : "#0D0D0D"}
              style={{}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row justify-between items-center p-3 w-full"
            onPress={() =>
              router.push("/(root)/(account)/(settings)/security")
            }
          >
            <Octicons
              name="shield-check"
              size={25}
              color={theme === "dark" ? "#A0A0A0" : "#616161"}
              style={{ marginTop: 2, marginLeft: 11 }}
            />
            <Text
              className={`font-UrbanistBold ${theme === "dark" ? "text-dark-primary" : "text-primary"}`}
              style={{ fontSize: 18, marginLeft: -172 }}
            >
              Security
            </Text>
            <MaterialCommunityIcons
              name="greater-than"
              size={25}
              color={theme === "dark" ? "#fff" : "#0D0D0D"}
              style={{}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row justify-between items-center p-3 w-full"
            onPress={() =>
              router.push("/(root)/(account)/(settings)/language")
            }
          >
            <MaterialCommunityIcons
              name="text-box-outline"
              size={28}
              color={theme === "dark" ? "#A0A0A0" : "#616161"}
              style={{ marginTop: 2, marginLeft: 8 }}
            />
            <Text
              className={`font-UrbanistBold ${theme === "dark" ? "text-dark-primary" : "text-primary"}`}
              style={{ fontSize: 18, marginLeft: -48 }}
            >
              Language
            </Text>
            <Text
              className={`font-UrbanistBold ${theme === "dark" ? "text-dark-secondary" : "text-[#8f949b]"}`}
              style={{ fontSize: 18, marginRight: -60 }}
            >
              English (US)
            </Text>
            <MaterialCommunityIcons
              name="greater-than"
              size={25}
              color={theme === "dark" ? "#fff" : "#0D0D0D"}
              style={{}}
            />
          </TouchableOpacity>
          <ThemeToggleButton />
        </View>
        <View
          className="flex-row px-5 items-center gap-4"
          style={{ marginTop: 14 }}
        >
          <Text
            className={`font-UrbanistSemiBold text-xl ${theme === "dark" ? "text-dark-secondary" : "text-[#8f949b]"}`}
          >
            About
          </Text>
          <View
            className="h-[1px]"
            style={{
              width: "84%",
              backgroundColor: theme === "dark" ? "#444" : "#e6e6e6",
            }}
          ></View>
        </View>
        <View className="flex gap-4" style={{ marginTop: 16 }}>
          <TouchableOpacity
            className="flex-row justify-between items-center p-3 w-full"
            onPress={() =>
              router.push("/(root)/(account)/(settings)/help-center")
            }
          >
            <Feather
              name="file-text"
              size={26}
              color={theme === "dark" ? "#A0A0A0" : "#616161"}
              style={{ marginTop: 2, marginLeft: 11 }}
            />
            <Text
              className={`font-UrbanistBold ${theme === "dark" ? "text-dark-primary" : "text-primary"}`}
              style={{ fontSize: 18, marginLeft: -140 }}
            >
              Help Center
            </Text>
            <MaterialCommunityIcons
              name="greater-than"
              size={25}
              color={theme === "dark" ? "#fff" : "#0D0D0D"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row justify-between items-center p-3 w-full"
            onPress={() =>
              router.push("/(root)/(account)/(settings)/privacy-policy")
            }
          >
            <MaterialCommunityIcons
              name="lock-outline"
              size={26}
              color={theme === "dark" ? "#A0A0A0" : "#616161"}
              style={{ marginTop: 2, marginLeft: 11 }}
            />
            <Text
              className={`font-UrbanistBold ${theme === "dark" ? "text-dark-primary" : "text-primary"}`}
              style={{ fontSize: 18, marginLeft: -130 }}
            >
              Privacy Policy
            </Text>
            <MaterialCommunityIcons
              name="greater-than"
              size={25}
              color={theme === "dark" ? "#fff" : "#0D0D0D"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row justify-between items-center p-3 w-full"
            onPress={() =>
              router.push("/(root)/(account)/(settings)/about-FinTra")
            }
          >
            <Entypo
              name="info"
              size={24}
              color={theme === "dark" ? "#A0A0A0" : "#616161"}
              style={{ marginTop: 2, marginLeft: 11 }}
            />
            <Text
              className={`font-UrbanistBold ${theme === "dark" ? "text-dark-primary" : "text-primary"}`}
              style={{ fontSize: 18, marginLeft: -138 }}
            >
              About FinTra
            </Text>
            <MaterialCommunityIcons
              name="greater-than"
              size={25}
              color={theme === "dark" ? "#fff" : "#0D0D0D"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row justify-between items-center p-3 w-full"
            onPress={() =>
              router.push("/(root)/analytics")
            }
          >
            <Feather
              name="bar-chart-2"
              size={26}
              color={theme === "dark" ? "#A0A0A0" : "#616161"}
              style={{ marginTop: 2, marginLeft: 10 }}
            />
            <Text
              className={`font-UrbanistBold ${theme === "dark" ? "text-dark-primary" : "text-primary"}`}
              style={{ fontSize: 18, marginLeft: -160 }}
            >
              Analytics
            </Text>
            <MaterialCommunityIcons
              name="greater-than"
              size={25}
              color={theme === "dark" ? "#fff" : "#0D0D0D"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setshowLogoutModal(true)}
            className="flex-row items-center p-3 w-full"
          >
            <Ionicons
              name="log-out-outline"
              size={34}
              color="#f54f4f"
              style={{ marginTop: 2, marginLeft: 10 }}
            />
            <Text
              className="font-UrbanistBold text-[#f54f4f]"
              style={{ fontSize: 19, marginLeft: 18 }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        isVisible={showQRCodeModal}
        onBackdropPress={() => setshowQRCodeModal(false)}
        onSwipeComplete={() => setshowQRCodeModal(false)}
        swipeDirection="down"
        style={{ justifyContent: "flex-end", margin: 0 }}
        propagateSwipe
      >
        <View
          style={{
            height: "64%",
            width: "100%",
            backgroundColor: theme === "dark" ? "#333" : "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
            alignItems: "center",
            gap: 10,
          }}
        >
          {/* Optional: Add a swipe indicator */}
          <View
            style={{
              width: 40,
              height: 3,
              backgroundColor: theme === "dark" ? "#666" : "#ccc",
              borderRadius: 3,
              alignSelf: "center",
            }}
          />
          {/* Your modal content */}
          <View style={{ marginTop: 10 }}>
            <Text
              style={{ fontSize: 24 }}
              className={`font-UrbanistBold ${theme === "dark" ? "text-dark-primary" : "text-primary"}`}
            >
              My QR Code
            </Text>
          </View>
          <View
            className="h-[1px]"
            style={{
              width: "100%",
              backgroundColor: theme === "dark" ? "#444" : "#e6e6e6",
              marginTop: 14,
            }}
          ></View>
          <View
            style={{
              width: "100%",
              height: "60%",
              borderStyle: "solid",
              borderColor: theme === "dark" ? "#444" : "#e6e6e6",
              borderWidth: 1,
              marginTop: 10,
            }}
            className="flex justify-center items-center"
          >
            <Image source={images.QRCode} style={{ width: 370, height: 290 }} />
          </View>
          <View className="flex-row w-full items-center gap-4 mt-4">
            <TouchableOpacity
              onPress={() => setshowQRCodeModal(false)}
              className={`flex-1 items-center justify-center py-5 border-[1.5px] border-general rounded-full ${
                theme === "dark" ? "bg-dark-background" : "bg-white"
              }`}
            >
              <Text
                className={`font-UrbanistSemiBold text-buttontext ${theme === "dark" ? "text-dark-primary" : "text-primary"}`}
              >
                Save
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleShare}
              className="bg-general flex-1 items-center justify-center py-5 border-none rounded-full"
            >
              <Text
                className={`font-UrbanistSemiBold text-buttontext ${theme === "dark" ? "text-dark-primary" : "text-primary"}`}
              >
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={showLogoutModal}
        onBackdropPress={() => setshowLogoutModal(false)}
        onSwipeComplete={() => setshowLogoutModal(false)}
        swipeDirection="down"
        style={{ justifyContent: "flex-end", margin: 0 }}
        propagateSwipe
      >
        <View
          style={{
            height: "35%",
            width: "100%",
            backgroundColor: theme === "dark" ? "#333" : "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
            alignItems: "center",
            gap: 10,
          }}
        >
          {/* Optional: Add a swipe indicator */}
          <View
            style={{
              width: 40,
              height: 3,
              backgroundColor: theme === "dark" ? "#666" : "#ccc",
              borderRadius: 3,
              alignSelf: "center",
            }}
          />
          {/* Your modal content */}
          <View style={{ marginTop: 10 }}>
            <Text
              style={{ fontSize: 24 }}
              className="font-UrbanistBold text-[#f54f4f]"
            >
              Logout
            </Text>
          </View>
          <View
            className="h-[1px]"
            style={{
              width: "100%",
              backgroundColor: theme === "dark" ? "#444" : "#e6e6e6",
              marginTop: 14,
            }}
          />
          <View style={{ marginTop: 26 }}>
            <Text
              className={`font-UrbanistSemiBold ${theme === "dark" ? "text-dark-primary" : "text-primary"}`}
              style={{ fontSize: 20 }}
            >
              Are you sure you want to log out?
            </Text>
          </View>
          <View
            className="flex-row w-full gap-4 mt-4"
            style={{ position: "absolute", bottom: 30 }}
          >
            <TouchableOpacity
              onPress={() => setshowLogoutModal(false)}
              className={`flex-1 items-center justify-center py-5 border-[1.5px] border-general rounded-full ${
                theme === "dark" ? "bg-dark-background" : "bg-white"
              }`}
            >
              <Text
                className={`font-UrbanistSemiBold text-buttontext ${theme === "dark" ? "text-dark-primary" : "text-primary"}`}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/(auth)/sign-in");
              }}
              className="bg-general flex-1 items-center justify-center py-5 border-none rounded-full"
            >
              <Text
                className={`font-UrbanistSemiBold text-buttontext ${theme === "dark" ? "text-dark-primary" : "text-primary"}`}
              >
                Yes, Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Account;

