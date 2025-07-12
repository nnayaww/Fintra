import PaymentMethodCard from "@/components/paymentMethodCard";
import { PaymentMethods, images } from "@/constants";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const SelectTopUpMethod = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [topUpError, setTopUpError] = useState("");
  const { amount } = useLocalSearchParams();

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
        setTopUpError("");
      }}
    />
  );

  const methods = [
    {
      id: "1",
      name: "Paypal",
      image: images.paypal,
    },
    { id: "2", name: "Google Pay", image: images.googlepay },

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
      setTopUpError("Please select a top up method");
    } else if (!selectedMethod) {
      setTopUpError("Selected method not found");
    } else {
      setTopUpError("");
      router.replace({
        pathname: "/(root)/(home)/(top-up)/topUp-now",
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
    <View className="flex-1 bg-white p-5">
      <View className="flex-row justify-between items-center mt-3">
        <TouchableOpacity
          onPress={() => {
            router.replace("/(root)/(home)/(top-up)/topUp-enter-amount");
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
          style={{ fontSize: 22 }}
        >
          Select Top Up Method
        </Text>
        <TouchableOpacity
          onPress={() => {
            router.replace("/(root)/(home)/(top-up)/topUp-addNewPayment");
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
            className="text-primary font-UrbanistSemiBold"
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
