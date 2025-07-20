/* eslint-disable react-hooks/rules-of-hooks */
import PaymentMethodCard from "@/components/paymentMethodCard";
import { useTheme } from "@/lib/ThemeContext";
import { PaymentMethods } from "@/constants";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const paymentMethods = () => {
  const { theme } = useTheme();
  const renderItem = ({ item }: { item: any }) => (
    <PaymentMethodCard
      id={item.id}
      name={item.name}
      status={item.status}
      image={item.image}
      number={item.number}
      selected={false}
      onPress={() => {}}
    />
  );
  return (
    <View
      className={`flex-1 p-5 ${
        theme === "dark" ? "bg-dark-background" : "bg-white"
      }`}
    >
      <View className="flex-row justify-between items-center mt-3">
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color={theme === "dark" ? "#fff" : "#0D0D0D"}
            style={{ padding: 6, marginTop: 22 }}
          />
        </TouchableOpacity>
        <Text
          className={`font-UrbanistBold mt-5 ${
            theme === "dark" ? "text-dark-primary" : "text-primary"
          }`}
          style={{ fontSize: 24 }}
        >
          Payment Methods
        </Text>
        <TouchableOpacity
          onPress={() => {
            router.push("/(root)/(account)/(payment-methods)/add-new-payment");
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
      <View style={{ marginTop: 20 }}>
        <FlatList
          data={PaymentMethods}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default paymentMethods;