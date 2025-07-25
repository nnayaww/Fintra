import { useTheme } from "@/lib/ThemeContext";
import { wp, hp, rf, rs, getSafeAreaPadding, getIconSize } from "@/lib/responsive";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import React, { useState, useCallback } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { getContacts } from "../../../../utils/contactStorage";

type Contact = {
  name: string;
  email: string;
  avatar?: string;
  favorite?: boolean;
};

export default function SendSelectContact() {
  const { type } = useLocalSearchParams();
  const { theme } = useTheme();
  const safeArea = getSafeAreaPadding();
  const iconSizes = getIconSize();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedTab, setSelectedTab] = useState<"All Contacts" | "Favorites">(
    "All Contacts"
  );
  const [searchFocused, setSearchFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [searchText, setSearchText] = useState("");

  useFocusEffect(
    useCallback(() => {
      const fetchContacts = async () => {
        const stored = await getContacts();
        setContacts(stored);
      };
      fetchContacts();
    }, [])
  );

  const filteredContacts = contacts.filter((contact) => {
    if (selectedTab === "Favorites" && !contact.favorite) return false;
    if (searchText.trim() === "") return true;
    const lower = searchText.toLowerCase();
    return (
      contact.name.toLowerCase().includes(lower) ||
      contact.email.toLowerCase().includes(lower)
    );
  });

  const renderContact = ({ item }: { item: Contact }) => (
    <View className="flex px-5">
      <TouchableOpacity
        className="flex-row py-4 items-center"
        onPress={() => {
          router.push({
            pathname: "/(root)/(home)/(send)/send-enter-amount",
            params: {
              type,
              name: item.name,
              email: item.email,
              avatar: item.avatar,
            },
          });
        }}
      >
        <View
          className={`rounded-full flex items-center justify-center ${
            theme === "dark" ? "bg-dark-secondary" : "bg-[#F6F8FA]"
          }`}
          style={{ width: wp(15), height: wp(15) }}
        >
          {item.avatar ? (
            <Image
              source={{ uri: item.avatar }}
              style={{ width: wp(15), height: wp(15), borderRadius: wp(7.5) }}
              resizeMode="cover"
            />
          ) : (
            <FontAwesome5
              name="user-alt"
              size={iconSizes.medium}
              color={theme === "dark" ? "#A0A0A0" : "#9CA3AF"}
            />
          )}
        </View>
        <View className="gap-2" style={{ marginLeft: wp(4) }}>
          <Text
            className={`font-UrbanistBold ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ fontSize: rf(18) }}
          >
            {item.name}
          </Text>
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-gray-300" : "text-secondary"
            }`}
            style={{ fontSize: rf(14) }}
          >
            {item.email}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <View
          className={`flex-1 ${
            theme === "dark" ? "bg-dark-background" : "bg-white"
          }`}
        >
          <View
            className="flex-row items-center"
            style={{ 
              paddingTop: safeArea.top + hp(2),
              paddingHorizontal: wp(5),
              marginBottom: hp(2)
            }}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons
                name="arrow-back"
                size={iconSizes.large}
                color={theme === "dark" ? "#fff" : "#0D0D0D"}
                style={{ padding: rs(6) }}
              />
            </TouchableOpacity>
            <Text
              className={`font-UrbanistBold ${
                theme === "dark" ? "text-white" : "text-primary"
              }`}
              style={{ 
                fontSize: rf(28),
                marginLeft: wp(0),
                flex: 1,
                textAlign: 'center'
              }}
            >
              Send to
            </Text>
          </View>

          {!isTyping && (
            <AntDesign
              name="search1"
              size={iconSizes.medium}
              color={theme === "dark" ? "#A0A0A0" : "#9CA3AF"}
              style={{ 
                position: "absolute", 
                left: wp(9), 
                top: hp(19), 
                zIndex: 1 
              }}
            />
          )}

          <TextInput
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              setIsTyping(text.length > 0);
            }}
            placeholder="        Search contact"
            placeholderTextColor={theme === "dark" ? "#B0B0B0" : "#9CA3AF"}
            className={`font-UrbanistSemiBold border-none rounded-lg self-center ${
              theme === "dark"
                ? "bg-[#23262F] text-white"
                : "bg-[#F6F8FA] text-primary"
            }`}
            style={{ 
              fontSize: rf(18),
              width: wp(90), 
              padding: wp(5),
              marginTop: hp(2)
            }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => {
              setSearchFocused(false);
              if (searchText.length === 0) setIsTyping(false);
            }}
          />

          <View className="flex-row self-center" style={{ marginTop: hp(2) }}>
            <View
              style={{
                height: hp(0.7),
                width: wp(45),
                backgroundColor:
                  selectedTab === "All Contacts"
                    ? "#82E394"
                    : theme === "dark"
                    ? "#333"
                    : "#F6F8FA",
              }}
            />
            <View
              style={{
                height: hp(0.7),
                width: wp(45),
                backgroundColor:
                  selectedTab === "Favorites"
                    ? "#82E394"
                    : theme === "dark"
                    ? "#333"
                    : "#F6F8FA",
              }}
            />
          </View>

          <FlatList
            data={filteredContacts}
            keyExtractor={(item) => item.email}
            renderItem={renderContact}
            contentContainerStyle={{ 
              paddingBottom: hp(4), 
              paddingTop: hp(1.5) 
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />

          <TouchableOpacity
            className="flex items-center justify-center bg-general rounded-full"
            style={{
              position: "absolute",
              width: wp(18),
              height: wp(18),
              bottom: hp(5),
              right: wp(5),
            }}
            onPress={() => {
              router.push("/(root)/(contacts)/add-new-contact");
            }}
          >
            <Feather
              name="plus"
              size={iconSizes.large}
              color={theme === "dark" ? "#fff" : "#0D0D0D"}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
