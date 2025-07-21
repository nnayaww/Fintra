import PaymentMethodCard from "@/components/paymentMethodCard";
import { PaymentMethods, images } from "@/constants";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/lib/ThemeContext";

const WithdrawDestinationAccount = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [withdrawError, setwithdrawError] = useState("");
  const { amount } = useLocalSearchParams();
  const { theme } = useTheme();

  const renderItem = ({ item }: { item: any }) => (
    <PaymentMethodCard
      id={item.id}
      name={item.name}
      status={null}
      image={item.image}
      number={item.number}
      selected={selectedId === item.id}
      onPress={() => {
        setSelectedId(item.id);
        setwithdrawError("");
      }}
    />
  );

  const methods = [
    {
      id: "1",
      name: "Momo",
      image: images.momo,
    },
    // { id: "2", name: "Google Pay", image: images.googlepay },

    { id: "3", name: "Apple Pay", image: images.applepay },
    {
      id: "4",
      name: "Mastercard",
      number: "**** **** **** 4679",
      image: images.mastercard,
    },
    {
      id: "5",
      name: "Visa",
      number: "**** **** **** 5567",
      image: images.visa,
    },
  ];

  const selectedMethod = methods.find((method) => method.id === selectedId);

  const handleContinue = () => {
    if (!selectedId) {
      setwithdrawError("Please select a withdraw destinantion account");
    } else if (!selectedMethod) {
      setwithdrawError("Selected account not found");
    } else {
      setwithdrawError("");
      router.push({
        pathname: "/(root)/(home)/(withdraw)/withdraw-now",
        params: {
          amount, // already passing this
          methodName: selectedMethod.name,
          methodNumber: selectedMethod.number,
          methodImage: selectedMethod.image, // This should be a URI or require path
        },
      });
    }
  };

  return (
    <View
      className={`flex-1 p-5 ${
        theme === "dark" ? "bg-dark-background" : "bg-white"
      }`}
    >
      <View className="flex-row justify-between items-center mt-3">
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
            style={{ padding: 6, marginTop: 25 }}
          />
        </TouchableOpacity>
        <Text
          className={`font-UrbanistBold mt-5 ${
            theme === "dark" ? "text-dark-primary" : "text-primary"
          }`}
          style={{ fontSize: 23 }}
        >
          Withdraw to
        </Text>
        <TouchableOpacity
          onPress={() => {
            router.push("/(root)/(home)/(withdraw)/withdraw-AddNewAccount");
          }}
        >
          <Feather
            name="plus"
            size={30}
            color={theme === "dark" ? "#fff" : "#0D0D0D"}
            style={{ marginTop: 20 }}
          />
        </TouchableOpacity>
      </View>
      {withdrawError ? (
        <Text
          style={{
            color: "#E53E3E",
            marginLeft: 8,
            marginTop: 12,
            fontSize: 16,
            fontFamily: "Urbanist-Medium",
          }}
        >
          {withdrawError}
        </Text>
      ) : null}
      <View style={{ marginTop: 6 }}>
        <FlatList
          data={PaymentMethods}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View
        style={{
          position: "absolute",
          left: 20,
          right: 20,
          bottom: 42,
        }}
      >
        <TouchableOpacity
          className="bg-general rounded-full flex items-center p-5 font-urbanist-bold"
          onPress={handleContinue}
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
  );
};

export default WithdrawDestinationAccount;