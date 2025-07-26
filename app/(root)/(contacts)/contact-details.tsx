/* eslint-disable react/jsx-no-duplicate-props */
import { icons } from "@/constants";
import { useTheme } from "@/lib/ThemeContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { getContacts, deleteContact } from "../../../utils/contactStorage";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react"; 
import type { Contact } from "../../../utils/contactStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Contacts() {
  const { name, email, favorite } = useLocalSearchParams();
  const [showDeleteContactModal, setshowDeleteContactModal] = useState(false);
  const [contactImage, setContactImage] = useState<string | null>(null);
  const { theme } = useTheme();
  const [contact, setContact] = useState<Contact | null>(null); 
  const [senderEmail, setSenderEmail] = useState('')

  useFocusEffect(
  useCallback(() => {
    const fetchContact = async () => {
      const contacts = await getContacts();
      const found = contacts.find((c) => c.email === email);
      if (found) {
        setContact(found);
      }
    };
    fetchContact();
  }, [email])
);

useEffect(()=>{
  const fetchUseremail = async() => {
    try {
      const userEmail = await AsyncStorage.getItem("email");
setSenderEmail(userEmail as string)
    } catch (error) {
      console.log(error);
      
    }
  }

  fetchUseremail()
   
},[])

  return (
    <View
      className={`flex-1 ${
        theme === "dark" ? "bg-dark-background" : "bg-white"
      }`}
    >
      <View
        className="flex-row justify-between items-center pt-5 pl-5 pr-5"
        style={{ marginTop: 28 }}
      >
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
            style={{ padding: 6 }}
          />
        </TouchableOpacity>
        <Text
          className={`font-UrbanistBold text-3xl ${
            theme === "dark" ? "text-dark-primary" : "text-primary"
          }`}
          style={{ marginLeft: -20 }}
        >
          Contacts
        </Text>
        <View>
          <Image
            source={favorite === "true" ? icons.star : icons.starOutline}
            tintColor={favorite === "true" ? "#FFA500" : (theme === "dark" ? "#fff" : "#0D0D0D")}
            style={{ height: 28, width: 28 }}
          />
        </View>
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
            {contact?.name}
          </Text>
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 19 }}
          >
            {contact?.email}
          </Text>
          <Text
            className={`font-UrbanistMedium mt-8 ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 18 }}
          >
            FinTra Account
          </Text>
          <TouchableOpacity
            onPress={() => {
            router.push({
              pathname: "/(root)/(contacts)/chat-screen",
              params: {
                senderEmail,
                name: contact?.name,
                email: contact?.email,
              },
            });
          }}
            className={`mt-4 items-center justify-center p-5 border-[1.5px] border-[#000000] rounded-full w-full ${
              theme === "dark" ? "bg-dark-background" : "bg-white"
            }`}
          >
            <Text
              className={`font-UrbanistSemiBold text-xl text-[#498b23]`}
            >
              Chat Contact
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setshowDeleteContactModal(true)}
            className={`mt-4 items-center justify-center p-5 border-[1.5px] border-[#f54f4f] rounded-full w-full ${
              theme === "dark" ? "bg-dark-background" : "bg-white"
            }`}
          >
            <Text
              className={`font-UrbanistSemiBold text-xl text-[#f54f4f]`}
            >
              Delete Contact
            </Text>
          </TouchableOpacity>
          
        </View>
      </View>
      <View
        className="flex-row gap-4 items-center"
        style={{ position: "absolute", right: 20, left: 20, bottom: 46 }}
      >
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/(root)/(contacts)/chat-screen",
              params: {
                name: contact?.name,
                email: contact?.email,
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
            Request Money
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/(root)/(home)/(send)/send-enter-amount",
              params: {
                name: contact?.name,
                email: contact?.email,
              },
            });
          }}
          className="bg-general flex-1 items-center justify-center p-5 border-none rounded-full"
        >
          <Text
            className={`font-UrbanistSemiBold text-xl ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
          >
            Send Money
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
  isVisible={showDeleteContactModal}
  onBackdropPress={() => setshowDeleteContactModal(false)}
  animationIn="zoomIn"
  animationOut="zoomOut"
  backdropTransitionOutTiming={0}
  style={{ justifyContent: "center", alignItems: "center", margin: 0 }}
>
  <View
    style={{
      width: "85%",
      backgroundColor: theme === "dark" ? "#333" : "white",
      borderRadius: 20,
      paddingVertical: 25,
      paddingHorizontal: 20,
      alignItems: "center",
    }}
  >
    <Text
      style={{ fontSize: 24 }}
      className={`font-UrbanistBold text-[#f54f4f]`}
    >
      Delete Contact
    </Text>

    <View
      className="h-[1px] mt-4"
      style={{
        width: "100%",
        backgroundColor: theme === "dark" ? "#444" : "#e6e6e6",
      }}
    />

    <Text
      className={`font-UrbanistSemiBold text-center mt-6 ${
        theme === "dark" ? "text-dark-primary" : "text-primary"
      }`}
      style={{ fontSize: 18 }}
    >
      Are you sure you want to delete this contact?
    </Text>

    <View className="flex-row gap-4 mt-6 w-full">
      <TouchableOpacity
        onPress={() => setshowDeleteContactModal(false)}
        className={`flex-1 items-center justify-center py-4 border-[1.5px] border-general rounded-full ${
          theme === "dark" ? "bg-dark-background" : "bg-white"
        }`}
      >
        <Text
          className={`font-UrbanistSemiBold text-buttontext ${
            theme === "dark" ? "text-dark-primary" : "text-primary"
          }`}
        >
          Cancel
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={async () => {
          await deleteContact(email as string);
          setshowDeleteContactModal(false);
          router.replace("/(root)/(tabs)/home");
        }}
        className="bg-[#f54f4f] flex-1 items-center justify-center py-4 border-none rounded-full"
      >
        <Text className="font-UrbanistSemiBold text-buttontext text-white">
          Yes, Delete
        </Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

    </View>
  );
}

