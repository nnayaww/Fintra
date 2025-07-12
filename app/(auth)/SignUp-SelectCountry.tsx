import CountryCard from "@/components/CountryCard";
import { formattedCountries } from "@/constants";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const SignUpSelectCountry = () => {
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [countryError, setCountryError] = useState("");
  const { name } = useLocalSearchParams();

  const filteredCountries = useMemo(
    () =>
      formattedCountries
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter((country) =>
          country.name.toLowerCase().includes(search.toLowerCase())
        ),
    [search]
  );

  const renderItem = ({ item }: { item: any }) => (
    <CountryCard
      name={item.name}
      flag={item.flag}
      code={item.code}
      selected={selectedCode === item.code}
      onPress={() => {
        setSelectedCode(item.code);
        setCountryError("");
      }}
    />
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-white p-5 gap-10">
        <View className="flex-row items-center gap-10">
          <TouchableOpacity
            onPress={() => {
              router.replace("/(auth)/SignUp-FullName");
            }}
          >
            <Ionicons
              name="arrow-back"
              size={28}
              color="#0D0D0D"
              style={{ padding: 6, marginTop: 22 }}
            />
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: "#e5eaf0",
              width: "60%",
              height: 12,
              borderRadius: 9999,
              marginTop: 22,
            }}
          ></View>
          <View
            style={{
              backgroundColor: "#82E394",
              width: "36%" /* plus 12 for next screen */,
              height: 12,
              borderRadius: 9999,
              marginTop: 22,
              position: "absolute",
              left: 75,
            }}
          ></View>
        </View>
        <View className="flex gap-10">
          <Text
            style={{ lineHeight: 40 }}
            className="font-UrbanistBold text-primary text-3xl"
          >
            Where do you come from? 🗺️
          </Text>
          <Text
            className="font-UrbanistMedium text-secondary text-lg"
            style={{ marginTop: -6 }}
          >
            Select your country of origin. We will verfiy your identity in the
            next step of your residence.
          </Text>
        </View>
        <View className="relative">
          {search.length === 0 && (
            <Feather
              name="search"
              size={24}
              color={searchFocused ? "#0D0D0D" : "#9CA3AF"}
              style={{ position: "absolute", left: 16, top: 18, zIndex: 1 }}
            />
          )}
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="        Search country"
            placeholderTextColor="#9CA3AF"
            className="text-xl font-UrbanistSemiBold border-none rounded-lg w-full p-5 bg-[#F6F8FA] text-primary opacity-4 focus:outline-none focus:border-blue-400"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          {countryError ? (
            <Text
              style={{
                color: "#E53E3E",
                marginLeft: 8,
                marginTop: 2,
                fontSize: 16,
                fontFamily: "Urbanist-Medium",
              }}
            >
              {countryError}
            </Text>
          ) : null}
        </View>
        <View style={{ height: 330 }}>
          <FlatList
            data={filteredCountries}
            renderItem={renderItem}
            keyExtractor={(item) => item.code}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View
          style={{
            position: "absolute",
            left: 20,
            right: 20,
            bottom: 48,
          }}
        >
          <TouchableOpacity
            className="bg-general flex items-center justify-center p-5 border-none rounded-full"
            onPress={() => {
              if (!selectedCode) {
                setCountryError("Please select your country");
              } else {
                setCountryError("");
                router.push({
                  pathname: "/(auth)/SignUp-ProofofResidency",
                  params: { name },
                });
              }
            }}
          >
            <Text className="font-UrbanistSemiBold text-buttontext text-primary">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUpSelectCountry;
