import PaymentMethodCard from "@/components/paymentMethodCard";
import { PaymentMethods } from "@/constants";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const paymentMethods = () => {
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
    <View className="flex-1 bg-white p-5">
      <View className="flex-row justify-between items-center mt-3">
        <TouchableOpacity
          onPress={() => {
            router.push("/(root)/(tabs)/account");
          }}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#0D0D0D"
            style={{ padding: 6, marginTop: 22 }}
          />
        </TouchableOpacity>
        <Text
          className="font-UrbanistBold text-primary mt-5"
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
            color="#0D0D0D"
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
