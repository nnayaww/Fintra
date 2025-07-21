import PaymentMethodCard from "@/components/paymentMethodCard";
import { PaymentMethods } from "@/constants";
import { useTheme } from "@/lib/ThemeContext";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const SelectTopUpMethod = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [topUpError, setTopUpError] = useState("");
  const { amount } = useLocalSearchParams();
  const { theme } = useTheme();

  const renderItem = ({ item }: { item: any }) => {
    console.log('renderItem image:', item.image);
    return (
      <PaymentMethodCard
        id={item.id}
        name={item.name}
        status={null}
        image={item.image}
        number={item.number}
        selected={selectedId === item.id}
        onPress={() => {
          setSelectedId(item.id);
          setTopUpError("");
        }}
      />
    );
  };

  const selectedMethod = PaymentMethods.find((method) => method.id === selectedId);

  const handleContinue = () => {
    if (!selectedId) {
      setTopUpError("Please select a top up method");
    } else if (!selectedMethod) {
      setTopUpError("Selected method not found");
    } else {
      setTopUpError("");
      router.push({
        pathname: "/(root)/(home)/(top-up)/topUp-now",
        params: {
          amount,
          methodName: selectedMethod.name,
          methodNumber: selectedMethod.number,
          methodImageKey: selectedMethod.name.toLowerCase(),
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
            style={{ padding: 6, marginTop: 35 }}
          />
        </TouchableOpacity>
        <Text
          className={`font-UrbanistBold justify-center cmt-5 ${
            theme === "dark" ? "text-dark-primary" : "text-primary"
          }`}
          style={{ fontSize: 22, marginTop:30 }}
        >
          Select Top Up Method
        </Text>
        <TouchableOpacity
          onPress={() => {
            router.push("/(root)/(home)/(top-up)/topUp-addNewPayment");
          }}
        >
          <Feather
            name="plus"
            size={30}
            color={theme === "dark" ? "#fff" : "#0D0D0D"}
            style={{ marginTop: 30 }}
          />
        </TouchableOpacity>
      </View>
      {topUpError ? (
        <Text
          style={{
            color: "#E53E3E",
            marginLeft: 8,
            marginTop: 10,
            fontSize: 16,
            fontFamily: "Urbanist-Medium",
          }}
        >
          {topUpError}
        </Text>
      ) : null}
      <View style={{ marginTop: 10 }}>
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

export default SelectTopUpMethod;
