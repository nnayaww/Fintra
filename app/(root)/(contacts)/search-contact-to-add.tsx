import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { saveContact } from "../../../utils/contactStorage"
import React, { useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { useTheme } from "@/lib/ThemeContext";

export default function SearchContactToAdd() {
  const { AccountHolderName, email } = useLocalSearchParams();
  const [contactImage, setContactImage] = useState<string | null>(null);
  const [showSavedToContactsModal, setshowSavedToContactsModal] =
    useState(false);
  const { theme } = useTheme();

  return (
    <View
      className={`flex-1 p-5 ${
        theme === "dark" ? "bg-dark-background" : "bg-white"
      }`}
    >
      <View className="flex-row items-center mt-3">
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/(root)/(tabs)/home");
            }
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
          style={{ marginHorizontal: 55, fontSize: 24 }}
        >
          Search Contact
        </Text>
      </View>
      <View
        className="flex-1 items-center justify-center gap-4"
        style={{ marginTop: "-35%" }}
      >
        <View
          className={`rounded-full flex items-center justify-center ${
            theme === "dark" ? "bg-dark-secondary" : "bg-[#F6F8FA]"
          }`}
          style={{ width: 110, height: 110 }}
        >
          {contactImage ? (
            <>
              <Image
                source={{ uri: contactImage }}
                style={{ width: 110, height: 110 }}
                resizeMode="cover"
              />
            </>
          ) : (
            <FontAwesome5
              name="user-alt"
              size={32}
              color={theme === "dark" ? "#A0A0A0" : "#9CA3AF"}
            />
          )}
        </View>
        <View className="flex items-center gap-4">
          <Text
            className={`font-UrbanistSemiBold ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ fontSize: 22 }}
          >
            {AccountHolderName}
          </Text>
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 19 }}
          >
            {email}
          </Text>
          <Text
            className={`font-UrbanistMedium mt-8 ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 18 }}
          >
            FinTra Account
          </Text>
          <Text
            className={`font-UrbanistMedium mt-8 ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 18 }}
          >
            This account is not in your contacts yet.
          </Text>
        </View>
      </View>
      <View
        className="flex-row gap-4 items-center"
        style={{ position: "absolute", right: 20, left: 20, bottom: 46 }}
      >
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/(root)/(contacts)/add-new-contact",
              params: {
                AccountHolderName,
                email,
              },
            });
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
          onPress={async () => {
            await saveContact({ name: AccountHolderName, email });
            setshowSavedToContactsModal(true);
          }}
          className="bg-general flex-1 items-center justify-center p-5 border-none rounded-full"
        >
          <Text
            className={`font-UrbanistSemiBold text-xl ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
          >
            Add to Contacts
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={showSavedToContactsModal}
        onBackdropPress={() => setshowSavedToContactsModal(false)}
        onSwipeComplete={() => setshowSavedToContactsModal(false)}
        swipeDirection="down"
        style={{ justifyContent: "flex-end", margin: 0 }}
        propagateSwipe
      >
        <View
          style={{
            height: "25%",
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
          <View className="mt-6 flex items-center">
            <View
              style={{
                width: 80,
                height: 80,
                backgroundColor: "#82E394",
                borderStyle: "solid",
                borderWidth: 2,
                borderColor: theme === "dark" ? "#fff" : "#0D0D0D",
              }}
              className="rounded-full border flex items-center justify-center"
            >
              <FontAwesome6
                name="check"
                size={34}
                color={theme === "dark" ? "#fff" : "#0D0D0D"}
              />
            </View>
            <Text
              className={`font-UrbanistSemiBold self-center mt-4 ${
                theme === "dark" ? "text-dark-primary" : "text-primary"
              }`}
              style={{ fontSize: 20 }}
            >
              Saved to contacts!
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}
