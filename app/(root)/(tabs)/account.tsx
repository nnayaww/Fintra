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
  Share,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import {
  ResponsiveSafeArea,
  ScreenContainer,
  ResponsiveButton,
  ResponsiveModal,
  Heading1,
  Heading2,
  Heading3,
  BodyText,
  SmallText,
} from "@/components/ResponsiveComponents";
import { globalStyles } from "@/lib/globalStyles";
import { wp, hp, getIconSize } from "@/lib/responsive";

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

  const iconSizes = getIconSize();

  const MenuItem = ({ icon, title, onPress, rightText, isLogout = false }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyles.listItem,
        {
          paddingHorizontal: wp(5),
          paddingVertical: hp(2),
          backgroundColor: 'transparent',
          borderBottomWidth: 0,
        }
      ]}
    >
      <View style={{ marginRight: wp(4) }}>
        {typeof icon === 'string' ? (
          <MaterialCommunityIcons
            name={icon}
            size={iconSizes.medium}
            color={isLogout ? "#f54f4f" : (theme === "dark" ? "#a3a3a3" : "#64748b")}
          />
        ) : (
          icon
        )}
      </View>
      <View style={{ flex: 1 }}>
        <BodyText
          style={{
            fontWeight: 'bold',
            color: isLogout ? "#f54f4f" : (theme === "dark" ? "#fff" : "#000"),
          }}
        >
          {title}
        </BodyText>
      </View>
      {rightText && (
        <SmallText style={{ marginRight: wp(2) }}>
          {rightText}
        </SmallText>
      )}
      {!isLogout && (
        <MaterialCommunityIcons
          name="chevron-right"
          size={iconSizes.medium}
          color={theme === "dark" ? "#fff" : "#0D0D0D"}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <ResponsiveSafeArea>
      <ScreenContainer scrollable scrollProps={{
        keyboardShouldPersistTaps: "handled",
        onScrollBeginDrag: Keyboard.dismiss,
        contentContainerStyle: { paddingBottom: hp(3) }
      }}>
        {/* Header */}
        <View
          style={[
            globalStyles.screenPadding,
            {
              paddingTop: hp(6),
              paddingBottom: hp(3),
              backgroundColor: theme === "dark" ? "#23262F" : "#ffffff",
              marginHorizontal: -wp(5),
            }
          ]}
        >
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: hp(2),
            paddingHorizontal: wp(5),
          }}>
            <Image
              source={theme === "dark" ? images.GreenLogo : images.BlackLogo}
              style={{ width: wp(12), height: hp(5) }}
              resizeMode="contain"
            />
            <Heading1>Account</Heading1>
            <View style={{ width: wp(12) }} />
          </View>

          {/* Profile Section */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(4),
            paddingHorizontal: wp(5),
          }}>
            <View
              style={{
                width: wp(20),
                height: wp(20),
                borderRadius: wp(10),
                backgroundColor: theme === "dark" ? "#374151" : "#F6F8FA",
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {profileImage ? (
                <>
                  <Image
                    source={{ uri: profileImage }}
                    style={{ 
                      width: wp(20), 
                      height: wp(20), 
                      borderRadius: wp(10) 
                    }}
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      top: -wp(2),
                      right: -wp(1.5),
                      backgroundColor: theme === "dark" ? "#000" : "#fff",
                      borderRadius: wp(3),
                      padding: wp(0.5),
                      elevation: 2,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="close-circle"
                      size={iconSizes.medium}
                      color="#E53E3E"
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <FontAwesome5
                  name="user-alt"
                  size={iconSizes.large}
                  color={theme === "dark" ? "#a3a3a3" : "#9ca3af"}
                />
              )}
            </View>
            
            <View style={{ flex: 1, marginLeft: wp(5) }}>
              <Heading3>{fullName || 'User Name'}</Heading3>
              <SmallText style={{ marginTop: hp(0.5) }}>
                {email || 'user@example.com'}
              </SmallText>
            </View>
            
            <TouchableOpacity
              onPress={() => setshowQRCodeModal(true)}
              style={{ padding: wp(2) }}
            >
              <MaterialCommunityIcons
                name="qrcode"
                size={iconSizes.large}
                color={theme === "dark" ? "#fff" : "#000"}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Menu Sections */}
        <View style={{ marginTop: hp(2) }}>
          {/* General Section */}
          <View style={[
            globalStyles.screenPadding,
            {
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: hp(2),
            }
          ]}>
            <Heading3 style={{ color: theme === "dark" ? "#a3a3a3" : "#8f949b" }}>
              General
            </Heading3>
            <View style={{
              flex: 1,
              height: 1,
              backgroundColor: theme === "dark" ? "#444" : "#e6e6e6",
              marginLeft: wp(4),
            }} />
          </View>
          
          <MenuItem
            icon={<FontAwesome name="credit-card" size={iconSizes.medium} color={theme === "dark" ? "#a3a3a3" : "#64748b"} />}
            title="Payment Methods"
            onPress={() => router.push("/(root)/(account)/(payment-methods)/payment-methods")}
          />
          <MenuItem
            icon="account"
            title="Personal Info"
            onPress={() => router.push("/(root)/(account)/(settings)/personal-info")}
          />
          <MenuItem
            icon={<Image source={icons.bell} style={{ width: wp(7), height: wp(7) }} />}
            title="Notification"
            onPress={() => router.push("/(root)/(account)/(settings)/notification-settings")}
          />
          <MenuItem
            icon={<Octicons name="shield-check" size={iconSizes.medium} color={theme === "dark" ? "#a3a3a3" : "#64748b"} />}
            title="Security"
            onPress={() => router.push("/(root)/(account)/(settings)/security")}
          />
          <MenuItem
            icon="text-box-outline"
            title="Language"
            rightText="English (US)"
            onPress={() => router.push("/(root)/(account)/(settings)/language")}
          />
          <View style={globalStyles.screenPadding}>
            <ThemeToggleButton />
          </View>
          
          {/* About Section */}
          <View style={[
            globalStyles.screenPadding,
            {
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: hp(2),
              marginBottom: hp(2),
            }
          ]}>
            <Heading3 style={{ color: theme === "dark" ? "#a3a3a3" : "#8f949b" }}>
              About
            </Heading3>
            <View style={{
              flex: 1,
              height: 1,
              backgroundColor: theme === "dark" ? "#444" : "#e6e6e6",
              marginLeft: wp(4),
            }} />
          </View>
          
          <MenuItem
            icon={<Feather name="file-text" size={iconSizes.medium} color={theme === "dark" ? "#a3a3a3" : "#64748b"} />}
            title="Help Center"
            onPress={() => router.push("/(root)/(account)/(settings)/help-center")}
          />
          <MenuItem
            icon="lock-outline"
            title="Privacy Policy"
            onPress={() => router.push("/(root)/(account)/(settings)/privacy-policy")}
          />
          <MenuItem
            icon={<Entypo name="info" size={iconSizes.medium} color={theme === "dark" ? "#a3a3a3" : "#64748b"} />}
            title="About FinTra"
            onPress={() => router.push("/(root)/(account)/(settings)/about-FinTra")}
          />
          <MenuItem
            icon={<Ionicons name="log-out-outline" size={iconSizes.large} color="#f54f4f" />}
            title="Logout"
            onPress={() => setshowLogoutModal(true)}
            isLogout
          />
        </View>
      </ScreenContainer>

      {/* QR Code Modal */}
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
            height: hp(64),
            width: "100%",
            backgroundColor: theme === "dark" ? "#374151" : "white",
            borderTopLeftRadius: wp(5),
            borderTopRightRadius: wp(5),
            paddingVertical: hp(1),
            paddingHorizontal: wp(5),
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: wp(10),
              height: hp(0.4),
              backgroundColor: theme === "dark" ? "#6b7280" : "#d1d5db",
              borderRadius: wp(0.8),
              alignSelf: "center",
              marginTop: hp(1),
            }}
          />
          
          <View style={{ marginTop: hp(2) }}>
            <Heading2>My QR Code</Heading2>
          </View>
          
          <View style={{
            width: "100%",
            height: 1,
            backgroundColor: theme === "dark" ? "#4b5563" : "#e5e7eb",
            marginTop: hp(2),
          }} />
          
          <View
            style={{
              width: "100%",
              height: hp(36),
              borderWidth: 1,
              borderColor: theme === "dark" ? "#4b5563" : "#e5e7eb",
              marginTop: hp(2),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image 
              source={images.QRCode} 
              style={{ 
                width: wp(80), 
                height: hp(30) 
              }} 
              resizeMode="contain"
            />
          </View>
          
          <View style={{
            flexDirection: 'row',
            width: '100%',
            gap: wp(4),
            marginTop: hp(2),
          }}>
            <ResponsiveButton
              title="Save"
              variant="secondary"
              onPress={() => setshowQRCodeModal(false)}
              style={{ flex: 1 }}
            />
            <ResponsiveButton
              title="Share"
              onPress={handleShare}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </Modal>

      {/* Logout Modal */}
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
            height: hp(35),
            width: "100%",
            backgroundColor: theme === "dark" ? "#374151" : "white",
            borderTopLeftRadius: wp(5),
            borderTopRightRadius: wp(5),
            paddingVertical: hp(1),
            paddingHorizontal: wp(5),
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: wp(10),
              height: hp(0.4),
              backgroundColor: theme === "dark" ? "#6b7280" : "#d1d5db",
              borderRadius: wp(0.8),
              alignSelf: "center",
              marginTop: hp(1),
            }}
          />
          
          <View style={{ marginTop: hp(2) }}>
            <Heading2 style={{ color: "#f54f4f" }}>Logout</Heading2>
          </View>
          
          <View style={{
            width: "100%",
            height: 1,
            backgroundColor: theme === "dark" ? "#4b5563" : "#e5e7eb",
            marginTop: hp(2),
          }} />
          
          <View style={{ marginTop: hp(4) }}>
            <BodyText style={{ textAlign: 'center' }}>
              Are you sure you want to log out?
            </BodyText>
          </View>
          
          <View style={{
            flexDirection: 'row',
            width: '100%',
            gap: wp(4),
            position: "absolute",
            bottom: hp(4),
            paddingHorizontal: wp(5),
          }}>
            <ResponsiveButton
              title="Cancel"
              variant="secondary"
              onPress={() => setshowLogoutModal(false)}
              style={{ flex: 1 }}
            />
            <ResponsiveButton
              title="Yes, Logout"
              onPress={() => {
                setshowLogoutModal(false);
                router.push("/(auth)/sign-in");
              }}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </Modal>
    </ResponsiveSafeArea>
  );
};

export default Account;

