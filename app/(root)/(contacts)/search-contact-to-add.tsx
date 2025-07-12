import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

export default function SearchContactToAdd() {
  const { AccountHolderName, email } = useLocalSearchParams();
  const [contactImage, setContactImage] = useState<string | null>(null);
  const [showSavedToContactsModal, setshowSavedToContactsModal] =
    useState(false);

  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex-row items-center mt-3">
        <TouchableOpacity
          onPress={() => {
            router.back();
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
          className="font-UrbanistBold text-primary mt-5"
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
          className="rounded-full flex items-center justify-center bg-[#F6F8FA]"
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
            <FontAwesome5 name="user-alt" size={32} color="#9CA3AF" />
          )}
        </View>
        <View className="flex items-center gap-4">
          <Text className="font-UrbanistSemiBold" style={{ fontSize: 22 }}>
            {AccountHolderName}
          </Text>
          <Text className="font-UrbanistMedium" style={{ fontSize: 19 }}>
            {email}
          </Text>
          <Text
            className="font-UrbanistMedium text-secondary"
            style={{ fontSize: 18 }}
          >
            FinTra Account
          </Text>
          <Text
            className="font-UrbanistMedium text-secondary mt-8"
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
          className="bg-white flex-1 items-center justify-center p-5 border-[1.5px] border-general rounded-full"
        >
          <Text className="font-UrbanistSemiBold text-xl text-primary">
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            setshowSavedToContactsModal(true)
          } /*Include a condition to update the database with the new contact when pressed*/
          className="bg-general flex-1 items-center justify-center p-5 border-none rounded-full"
        >
          <Text className="font-UrbanistSemiBold text-xl text-primary">
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
            backgroundColor: "white",
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
              backgroundColor: "#ccc",
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
                borderColor: "#0D0D0D",
              }}
              className="rounded-full border flex items-center justify-center"
            >
              <FontAwesome6 name="check" size={34} color="#0D0D0D" />
            </View>
            <Text
              className="font-UrbanistSemiBold self-center mt-4 text-primary"
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
