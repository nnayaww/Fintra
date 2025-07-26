import CountryCard from "@/components/CountryCard";
import { formattedCountries } from "@/constants";
import { useTheme } from "@/lib/ThemeContext";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView
} from "react-native";
import { useSignUp } from "@/context/SignUpContext";

const SignUpSelectCountry = () => {
  const [search, setSearch] = useState("");
  const [countryError, setCountryError] = useState("");
  const { theme } = useTheme();
  const { country, updateForm } = useSignUp();

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

  const handleContinue = () => {
    if (!country) {
      setCountryError("Please select your country");
    } else {
      setCountryError("");
      router.push("/(auth)/SignUp-CompleteUserProfile");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView
        className={`flex-1 p-5 gap-10 ${
          theme === "dark" ? "bg-dark-background" : "bg-white"
        }`}
      >
        {/* Progress & Back Button */}
        <View className="flex-row items-center gap-10">
          <TouchableOpacity onPress={router.back}>
            <Ionicons
              name="arrow-back"
              size={28}
              color={theme === "dark" ? "#fff" : "#0D0D0D"}
              style={{ padding: 6, marginTop: 22 }}
            />
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: theme === "dark" ? "#444" : "#e5eaf0",
              width: "60%",
              height: 12,
              borderRadius: 9999,
              marginTop: 22,
            }}
          />
          <View
            style={{
              backgroundColor: "#82E394",
              width: "36%",
              height: 12,
              borderRadius: 9999,
              marginTop: 22,
              position: "absolute",
              left: 75,
            }}
          />
        </View>

        {/* Heading */}
        <View className="flex gap-5">
          <Text
            style={{ lineHeight: 40 }}
            className={`font-UrbanistBold text-3xl ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
          >
            Where do you come from? 🗺️
          </Text>
          <Text
            className={`font-UrbanistMedium text-lg -mt-1 ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
          >
            Select your country of origin. We will verify your identity in the
            next step.
          </Text>
        </View>

        {/* Search Input */}
        <View className="relative">
          {search.length === 0 && (
            <Feather
              name="search"
              size={24}
              color={theme === "dark" ? "#A0A0A0" : "#9CA3AF"}
              style={{ position: "absolute", left: 16, top: 29, zIndex: 1 }}
            />
          )}
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="        Search country"
            placeholderTextColor="#9CA3AF"
            className={`text-xl font-UrbanistSemiBold rounded-lg w-full p-5 mt-3 ${
              theme === "dark"
                ? "bg-dark-secondary text-dark-primary"
                : "bg-[#F6F8FA] text-primary"
            }`}
          />
          {countryError && (
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
          )}
        </View>

        {/* Country List */}
        <View style={{ height: 330 }}>
          <FlatList
            data={filteredCountries}
            renderItem={({ item }) => (
              <CountryCard
                name={item.name}
                flag={item.flag}
                code={item.code}
                selected={country === item.code}
                onPress={() => {
                  updateForm({ country: item.code });
                  setCountryError("");
                }}
              />
            )}
            keyExtractor={(item) => item.code}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Continue Button */}
        <View
          style={{
            marginTop: 40
          }}
        >
          <TouchableOpacity
            className="bg-general flex items-center justify-center p-5 border-none rounded-full"
            onPress={handleContinue}
          >
            <Text
              className={`font-UrbanistSemiBold text-buttontext ${
                theme === "dark" ? "text-dark-primary" : "text-primary"
              }`}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default SignUpSelectCountry;
