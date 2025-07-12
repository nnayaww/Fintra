import allContacts, { icons, images } from "@/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type Contact = {
  id: string;
  name: string;
  email: string;
  avatar: any;
  favorite: boolean;
};

export default function Contacts() {
  const { type } = useLocalSearchParams();
  const [contacts, setContacts] = useState(allContacts);

  const [selectedTab, setSelectedTab] = useState<"All Contacts" | "Favorites">(
    "All Contacts"
  );

  const tabs: ("All Contacts" | "Favorites")[] = ["All Contacts", "Favorites"];
  const [searchFocused, setSearchFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [contactImage, setContactImage] = useState<string | null>(null);

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
    <View className="flex-row items-center px-5">
      <TouchableOpacity
        className="flex-row py-4 items-center"
        onPress={() => {
          router.push({
            pathname: "/(root)/(contacts)/contact-details",
            params: {
              type,
              name: item?.name,
              email: item?.email,
              avatar: item?.avatar,
              favorite: item.favorite.toString(),
            },
          });
        }}
      >
        <View
          className="rounded-full flex items-center justify-center bg-[#F6F8FA]"
          style={{ width: 60, height: 60 }}
        >
          {contactImage ? (
            <>
              <Image
                source={{ uri: contactImage }}
                style={{ width: 60, height: 60 }}
                resizeMode="cover"
              />
            </>
          ) : (
            <FontAwesome5 name="user-alt" size={21} color="#9CA3AF" />
          )}
        </View>
        <View className="gap-2 ml-4">
          <Text className="font-UrbanistBold" style={{ fontSize: 18 }}>
            {item.name}
          </Text>
          <Text
            className="font-UrbanistMedium text-secondary"
            style={{ fontSize: 14 }}
          >
            {item.email}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{ position: "absolute", right: 20 }}>
        <TouchableOpacity
          onPress={() => {
            setContacts((prev) =>
              prev.map((contact) =>
                contact.id === item.id
                  ? { ...contact, favorite: !contact.favorite }
                  : contact
              )
            );
          }}
        >
          <Image
            source={item.favorite ? icons.star : icons.starOutline}
            style={{ height: 28, width: 28 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-white">
        <View
          className="flex-row justify-between items-center pt-5 pl-5 pr-5"
          style={{ marginTop: 28 }}
        >
          <Image
            source={images.BlackLogo}
            style={{ width: 50, height: 40, padding: 6 }}
          />

          <Text
            className="font-UrbanistBold text-3xl"
            style={{ marginLeft: -20 }}
          >
            Contacts
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <SimpleLineIcons
              name="options-vertical"
              size={22}
              color="#0D0D0D"
            />
          </TouchableOpacity>
        </View>
        {!isTyping && (
          <AntDesign
            name="search1"
            size={24}
            color={searchFocused ? "#0D0D0D" : "#9CA3AF"}
            style={{ position: "absolute", left: 36, top: 132, zIndex: 1 }}
          />
        )}
        <TextInput
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            setIsTyping(text.length > 0);
          }}
          placeholder={
            selectedTab === "All Contacts"
              ? "        Search contact"
              : "        Search favorites"
          }
          placeholderTextColor="#9CA3AF"
          className="text-xl font-UrbanistSemiBold border-none rounded-lg p-5 bg-[#F6F8FA] text-primary opacity-4 self-center"
          style={{ width: "90%", marginTop: 28 }}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => {
            setSearchFocused(false);
            if (searchText.length === 0) setIsTyping(false);
          }}
        />

        <View className="flex-row justify-around" style={{ marginTop: 28 }}>
          {tabs.map((tab: "All Contacts" | "Favorites") => (
            <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)}>
              <Text
                className="font-UrbanistSemiBold text-xl"
                style={{
                  marginLeft: tab === "Favorites" ? -20 : 0,
                  color: selectedTab === tab ? "#0D0D0D" : "#9CA3AF",
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="flex-row self-center">
          <View
            style={{
              height: 5,
              width: "45%",
              marginTop: 14,
              backgroundColor:
                selectedTab === "All Contacts" ? "#82E394" : "#F6F8FA",
            }}
          />
          <View
            style={{
              height: 5,
              width: "45%",
              marginTop: 14,
              backgroundColor:
                selectedTab === "Favorites" ? "#82E394" : "#F6F8FA",
            }}
          />
        </View>
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id}
          renderItem={renderContact}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity
          className="flex items-center justify-center bg-general rounded-full"
          style={{
            position: "absolute",
            width: 70,
            height: 70,
            bottom: 30,
            right: 20,
          }}
          onPress={() => {
            router.push("/(root)/(contacts)/add-new-contact");
          }}
        >
          <Feather name="plus" size={32} color="#0D0D0D" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
