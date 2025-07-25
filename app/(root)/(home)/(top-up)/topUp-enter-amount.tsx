import { useTheme } from "@/lib/ThemeContext";
import { wp, hp, rf, rs, getSafeAreaPadding, getIconSize } from "@/lib/responsive";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

const TopUpEnterAmount = () => {
  const { type } = useLocalSearchParams();
  const { theme } = useTheme();
  const safeArea = getSafeAreaPadding();
  const iconSizes = getIconSize();

  const { name, email, avatar } = useLocalSearchParams();
  const [amount, setAmount] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [topUp, settopUp] = useState("");
  const [topUpError, settopUpError] = useState("");
  const [balance, setBalance] = useState<number>(0);

  React.useEffect(() => {
    const fetchBalance = async () => {
      try {
        const storedBalance = await AsyncStorage.getItem("balance");
        if (storedBalance !== null) {
          setBalance(parseFloat(storedBalance));
        }
      } catch (error) {
        // Optionally handle error
      }
    };
    fetchBalance();
  }, []);

  const handleContinue = () => {
    let valid = true;

    if (!topUp.trim()) {
      settopUpError("No amount entered");
      valid = false;
    }

    if (valid) {
      router.push({
        pathname: "/(root)/(home)/(top-up)/select-topUp-method",
        params: {
          amount: parseFloat(topUp), // or whatever your amount state is called
          name, // pass other params as needed
          email,
          avatar,
        },
      });
    }
  };

  function formatBalance(amount: number): string {
    if (amount >= 1_000_000_000) {
      return (amount / 1_000_000_000).toFixed(2).replace(/\.00$/, "") + "B";
    }
    if (amount >= 1_000_000) {
      return (amount / 1_000_000).toFixed(2).replace(/\.00$/, "") + "M";
    }
    // Format with commas for thousands
    return amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        className={`flex-1 ${
          theme === "dark" ? "bg-dark-background" : "bg-white"
        }`}
      >
        <View
          style={{ 
            height: hp(55), 
            paddingTop: safeArea.top + hp(3),
            paddingHorizontal: wp(5)
          }}
          className="bg-general w-full"
        >
          <View className="flex-row items-center">
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
                size={iconSizes.large}
                color={theme === "dark" ? "#fff" : "#0D0D0D"}
                style={{ padding: rs(6) }}
              />
            </TouchableOpacity>
            <View className="flex-1 items-center" style={{ marginLeft: wp(-10) }}>
              <Text
                className={`font-UrbanistBold ${
                  theme === "dark" ? "text-dark-primary" : "text-primary"
                }`}
                style={{ fontSize: rf(24) }}
              >
                Amount to Top Up
              </Text>
            </View>
          </View>
          <View>
            <View className="flex items-center" style={{ marginTop: hp(21) }}>
              <View className="flex-row">
                 <FontAwesome6
                  name="cedi-sign"
                  size={rf(30)}
                  color={theme === "dark" ? "#fff" : "#0D0D0D"}
                  style={{ marginTop: hp(1.2) }}
                />
                <TextInput
                  className={`font-UrbanistBold ${
                    theme === "dark" ? "text-white" : "text-primary"
                  }`}
                  placeholder="___"
                  keyboardType="numeric"
                  value={topUp}
                  onChangeText={(text) => {
                    settopUp(text);
                    if (topUpError) settopUpError("");
                  }}
                  style={{
                    fontSize: rf(25),
                    backgroundColor: theme === "dark" ? "#23262F" : "#F6F8FA",
                    borderRadius: rs(10),
                    paddingHorizontal: wp(7),
                    minWidth: wp(35)
                  }}
                  placeholderTextColor={theme === 'dark' ? '#B0B0B0' : '#9CA3AF'}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                />
               
              </View>
              <View className="flex-row" style={{ gap: wp(1), marginTop: hp(2) }}>
                <Text
                  className={`font-UrbanistMedium ${
                    theme === "dark" ? "text-dark-primary" : "text-primary"
                  }`}
                  style={{ fontSize: rf(18) }}
                >
                  Available Balance:
                </Text>
                <Text
                  className={`font-UrbanistMedium ${
                    theme === "dark" ? "text-dark-primary" : "text-primary"
                  }`}
                  style={{ fontSize: rf(18) }}
                >{`₵${formatBalance(balance)}`}</Text>
              </View>
              {topUpError ? (
                <Text
                  style={{
                    color: "#E53E3E",
                    marginLeft: wp(2),
                    marginTop: hp(2.5),
                    fontSize: rf(16),
                    fontFamily: "Urbanist-Medium",
                  }}
                >
                  {topUpError}
                </Text>
              ) : null}
            </View>
          </View>
        </View>
        <View className="flex-1">
          <TouchableOpacity
            className="bg-general rounded-full items-center self-center font-urbanist-bold"
            onPress={handleContinue}
            style={{
              position: "absolute",
              bottom: inputFocused ? hp(36) : hp(5),
              width: wp(90),
              paddingVertical: hp(2),
            }}
          >
            <Text
              className={`font-UrbanistSemiBold ${
                theme === "dark" ? "text-dark-primary" : "text-primary"
              }`}
              style={{ fontSize: rf(20) }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TopUpEnterAmount;

