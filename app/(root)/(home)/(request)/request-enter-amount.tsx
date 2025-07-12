import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
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

const RequestEnterAmount = () => {
  const { type } = useLocalSearchParams();

  const { name, email, avatar } = useLocalSearchParams();
  const [amount, setAmount] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [request, setRequest] = useState("");
  const [requestError, setRequestError] = useState("");

  const handleContinue = () => {
    let valid = true;

    if (!request.trim()) {
      setRequestError("No amount entered");
      valid = false;
    }

    if (valid) {
      router.push({
        pathname: "/(root)/(home)/(request)/request-now",
        params: {
          amount: request,
          name,
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
      <View className="flex-1 bg-white">
        <View
          style={{ height: "55%", paddingTop: 40 }}
          className="bg-general w-full p-5"
        >
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => {
                router.replace(
                  "/(root)/(home)/(request)/request-select-contact"
                );
              }}
            >
              <Ionicons
                name="arrow-back"
                size={28}
                color="#0D0D0D"
                style={{ padding: 6 }}
              />
            </TouchableOpacity>
            <View className="flex-1 items-center" style={{ marginLeft: -40 }}>
              <Text
                className="font-UrbanistBold text-primary"
                style={{ fontSize: 24 }}
              >
                Amount to Request
              </Text>
            </View>
          </View>
          <View>
            <View className="flex items-center" style={{ marginTop: 120 }}>
              <View className="flex-row">
                <TextInput
                  className="text-primary font-UrbanistBold"
                  placeholder="---"
                  keyboardType="numeric"
                  value={request}
                  onChangeText={(text) => {
                    setRequest(text);
                    if (requestError) setRequestError("");
                  }}
                  style={{
                    fontSize: 40,
                  }}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                />
                <FontAwesome6
                  name="cedi-sign"
                  size={20}
                  color="#0D0D0D"
                  style={{ marginTop: 20 }}
                />
              </View>
              <View className="flex-row gap-1">
                <Text className="font-UrbanistMedium" style={{ fontSize: 18 }}>
                  Available Balance:
                </Text>
                <Text
                  className="font-UrbanistMedium"
                  style={{ fontSize: 18 }}
                >{`₵${formatBalance(9645.5 /* or user.balance */)}`}</Text>
              </View>
              {requestError ? (
                <Text
                  style={{
                    color: "#E53E3E",
                    marginLeft: 8,
                    marginTop: 20,
                    fontSize: 16,
                    fontFamily: "Urbanist-Medium",
                  }}
                >
                  {requestError}
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
              className="text-primary font-UrbanistSemiBold"
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

export default RequestEnterAmount;
