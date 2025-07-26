import { icons, images } from "@/constants";
import { useTheme } from "@/lib/ThemeContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import React, { useState, useCallback } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  ResponsiveSafeArea,
  ScreenContainer,
  ResponsiveInput,
  ResponsiveCard,
  Heading1,
  Heading3,
  BodyText,
  SmallText,
} from "@/components/ResponsiveComponents";
import { globalStyles } from "@/lib/globalStyles";
import { wp, hp, getIconSize } from "@/lib/responsive";
import { getContacts } from "../../../utils/contactStorage";

type Contact = {
  name: string;
  email: string;
  avatar?: string;
  favorite?: boolean;
};

export default function Contacts() {
  const { type } = useLocalSearchParams();
  const { theme } = useTheme();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedTab, setSelectedTab] = useState<"All Contacts" | "Favorites">(
    "All Contacts"
  );
  const tabs: ("All Contacts" | "Favorites")[] = ["All Contacts", "Favorites"];
  const [searchFocused, setSearchFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [searchText, setSearchText] = useState("");

  useFocusEffect(
    useCallback(() => {
      const loadContacts = async () => {
        const stored = await getContacts();
        setContacts(stored);
      };
      loadContacts();
    }, [])
  );

  const toggleFavorite = (email: string) => {
    setContacts((prev) =>
      prev.map((c) =>
        c.email === email ? { ...c, favorite: !c.favorite } : c
      )
    );
  };

  const filteredContacts = contacts.filter((contact) => {
    if (selectedTab === "Favorites" && !contact.favorite) return false;
    if (searchText.trim() === "") return true;
    const lower = searchText.toLowerCase();
    return (
      contact.name.toLowerCase().includes(lower) ||
      contact.email.toLowerCase().includes(lower)
    );
  });

  const iconSizes = getIconSize();

  const renderContact = ({ item }: { item: Contact }) => (
    <ResponsiveCard
      onPress={() => {
        router.push({
          pathname: "/(root)/(contacts)/contact-details",
          params: {
            type,
            name: item.name,
            email: item.email,
            favorite: item.favorite?.toString() || "false",
          },
        });
      }}
      style={{ marginHorizontal: wp(5), position: 'relative' }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: wp(15),
            height: wp(15),
            borderRadius: wp(7.5),
            backgroundColor: theme === "dark" ? "#374151" : "#F6F8FA",
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {item.avatar ? (
            <Image
              source={{ uri: item.avatar }}
              style={{ 
                width: wp(15), 
                height: wp(15), 
                borderRadius: wp(7.5) 
              }}
              resizeMode="cover"
            />
          ) : (
            <FontAwesome5
              name="user-alt"
              size={iconSizes.medium}
              color={theme === "dark" ? "#a3a3a3" : "#9ca3af"}
            />
          )}
        </View>
        
        <View style={{ marginLeft: wp(4), flex: 1 }}>
          <Heading3>{item.name}</Heading3>
          <SmallText style={{ marginTop: hp(0.5) }}>
            {item.email}
          </SmallText>
        </View>
        
        <TouchableOpacity 
          onPress={() => toggleFavorite(item.email)}
          style={{ padding: wp(2) }}
        >
          <Image
            source={item.favorite ? icons.star : icons.starOutline}
            tintColor={
              item.favorite
                ? "#FFA500"
                : theme === "dark"
                ? "#fff"
                : "#0D0D0D"
            }
            style={{ height: wp(7), width: wp(7) }}
          />
        </TouchableOpacity>
      </View>
    </ResponsiveCard>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ResponsiveSafeArea>
        <ScreenContainer padding={false}>
          {/* Header Section */}
          <View
            style={[
              globalStyles.screenPadding,
              {
                paddingTop: hp(1),
                paddingBottom: hp(0.5),
                backgroundColor: theme === "dark" ? "#23262F" : "#ffffff",
              }
            ]}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: hp(4),
              }}
            >
              <Image
                source={theme === "dark" ? images.GreenLogo : images.BlackLogo}
                style={{ width: wp(12), height: hp(5) }}
                resizeMode="contain"
              />
              <Heading1 style={{ marginLeft: -wp(5) }}>
                Contacts
              </Heading1>
              <TouchableOpacity 
                onPress={() => {}}
                style={{ padding: wp(2) }}
              >
                <SimpleLineIcons
                  name="options-vertical"
                  size={iconSizes.medium}
                  color={theme === "dark" ? "#fff" : "#0D0D0D"}
                />
              </TouchableOpacity>
            </View>

            <ResponsiveInput
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
                setIsTyping(text.length > 0);
              }}
              placeholder={
                selectedTab === "All Contacts"
                  ? "Search contact"
                  : "Search favorites"
              }
              leftIcon={!isTyping ? "search" : undefined}
              containerStyle={{ marginTop: hp(3) }}
            />
          </View>

          {/* Tab Section */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingTop: hp(3),
              paddingBottom: hp(2),
            }}
          >
            {tabs.map((tab) => (
              <TouchableOpacity 
                key={tab} 
                onPress={() => setSelectedTab(tab)}
                style={{ paddingVertical: hp(1) }}
              >
                <BodyText
                  style={{
                    fontWeight: '600',
                    color: selectedTab === tab
                      ? (theme === "dark" ? "#fff" : "#111827")
                      : (theme === "dark" ? "#a3a3a3" : "#9ca3af"),
                  }}
                >
                  {tab}
                </BodyText>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Indicator */}
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <View
              style={{
                height: hp(0.6),
                width: "45%",
                backgroundColor:
                  selectedTab === "All Contacts"
                    ? "#196126"
                    : theme === "dark"
                    ? "#374151"
                    : "#f3f4f6",
              }}
            />
            <View
              style={{
                height: hp(0.6),
                width: "45%",
                backgroundColor:
                  selectedTab === "Favorites"
                    ? "#196126"
                    : theme === "dark"
                    ? "#374151"
                    : "#f3f4f6",
              }}
            />
          </View>

          {/* Contacts List */}
          <FlatList
            data={filteredContacts}
            keyExtractor={(item) => item.email}
            renderItem={renderContact}
            contentContainerStyle={{ 
              paddingBottom: hp(12), 
              paddingTop: hp(2) 
            }}
            showsVerticalScrollIndicator={false}
          />

          {/* Floating Action Button */}
          <TouchableOpacity
            style={{
              position: "absolute",
              width: wp(18),
              height: wp(18),
              borderRadius: wp(9),
              bottom: hp(4),
              right: wp(5),
              backgroundColor: '#196126',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOpacity: 0.3,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 8,
            }}
            onPress={() => {
              router.push("/(root)/(contacts)/add-new-contact");
            }}
          >
            <Feather
              name="plus"
              size={iconSizes.large}
              color="#fff"
            />
          </TouchableOpacity>
        </ScreenContainer>
      </ResponsiveSafeArea>
    </TouchableWithoutFeedback>
  );
}
