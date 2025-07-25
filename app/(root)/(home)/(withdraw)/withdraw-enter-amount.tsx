import { useTheme } from "@/lib/ThemeContext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

const WithdrawEnterAmount = () => {
  const { type } = useLocalSearchParams();
  const { theme } = useTheme();

  const { name, email, avatar } = useLocalSearchParams();
  const [amount, setAmount] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [withdraw, setwithdraw] = useState("");
  const [withdrawError, setwithdrawError] = useState("");
  const [userBalance, setUserBalance] = useState('');

  const handleContinue = () => {
    let valid = true;

    if (!withdraw.trim()) {
      setwithdrawError("No amount entered");
      valid = false;
    }

    if (valid) {
      router.push({
        pathname: "/(root)/(home)/(withdraw)/withdraw-destination-account",
        params: {
          amount: withdraw, // or whatever your amount state is called
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

  
  useEffect(() => {
    const getBalnce = async () => {
      const userBalanceFromLocalStorage: any = await AsyncStorage.getItem('balance'); 
      setUserBalance(userBalanceFromLocalStorage) 
    }
    getBalnce();
  },[userBalance])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        className={`flex-1 ${
          theme === "dark" ? "bg-dark-background" : "bg-white"
        }`}
      >
        <View
          style={{ height: "55%", paddingTop: 60 }}
          className="bg-general w-full p-5"
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
                size={28}
                color={theme === "dark" ? "#fff" : "#0D0D0D"}
                style={{ padding: 6 }}
              />
            </TouchableOpacity>
            <View className="flex-1 items-center" style={{ marginLeft: -30 }}>
              <Text
                className={`font-UrbanistBold ${
                  theme === "dark" ? "text-dark-primary" : "text-primary"
                }`}
                style={{ fontSize: 24 }}
              >
                Amount to Withdraw
              </Text>
            </View>
          </View>
          <View>
            <View className="flex items-center" style={{ marginTop: 120 }}>
              <View className="flex-row">
                <FontAwesome6
                  name="cedi-sign"
                  size={40}
                  color={theme === "dark" ? "#fff" : "#0D0D0D"}
                  style={{marginTop: 20}}
                />
                <TextInput
                  className={`font-UrbanistBold ${
                    theme === "dark" ? "text-white" : "text-primary"
                  }`}
                  placeholder="---"
                  keyboardType="numeric"
                  value={withdraw}
                  onChangeText={(text) => {
                    setwithdraw(text);
                    if (withdrawError) setwithdrawError("");
                  }}
                  style={{
                    fontSize: 60,
                    backgroundColor: theme === "dark" ? "#23262F" : "#F6F8FA",
                    borderRadius: 12,
                    paddingHorizontal: 16,
                  }}
                  placeholderTextColor={theme === 'dark' ? '#B0B0B0' : '#9CA3AF'}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                />
              </View>
              <View className="flex-row gap-1">
                <Text
                  className={`font-UrbanistMedium ${
                    theme === "dark" ? "text-dark-primary" : "text-primary"
                  }`}
                  style={{ fontSize: 18 }}
                >
                  Available Balance:
                </Text>
                <Text
                  className={`font-UrbanistMedium ${
                    theme === "dark" ? "text-dark-primary" : "text-primary"
                  }`}
                  style={{ fontSize: 18 }}
                >{`₵ ${userBalance}`}</Text>
              </View>
              {withdrawError ? (
                <Text
                  style={{
                    color: "#E53E3E",
                    marginLeft: 8,
                    marginTop: 20,
                    fontSize: 16,
                    fontFamily: "Urbanist-Medium",
                  }}
                >
                  {withdrawError}
                </Text>
              ) : null}
            </View>
          </View>
        </View>
        <View className="flex-1">
          <TouchableOpacity
            className="bg-general rounded-full items-center self-center p-5 font-urbanist-bold"
            onPress={handleContinue}
            style={{
              position: "absolute",
              bottom: inputFocused ? 290 : 40,
              width: "90%",
            }}
          >
            <Text
              className={`font-UrbanistSemiBold ${
                theme === "dark" ? "text-dark-primary" : "text-primary"
              }`}
              style={{ fontSize: 20 }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default WithdrawEnterAmount;

