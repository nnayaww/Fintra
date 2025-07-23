import PaymentMethodCard from "@/components/paymentMethodCard";
import { PaymentMethods } from "@/constants";
import { useTheme } from "@/lib/ThemeContext";
import { wp, hp, rf, rs, getSafeAreaPadding, getIconSize } from "@/lib/responsive";
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
  const safeArea = getSafeAreaPadding();
  const iconSizes = getIconSize();

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
      className={`flex-1 ${
        theme === "dark" ? "bg-dark-background" : "bg-white"
      }`}
      style={{ paddingHorizontal: wp(5) }}
    >
      <View className="flex-row justify-between items-center" style={{ marginTop: safeArea.top + hp(1.5) }}>
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
        <Text
          className={`font-UrbanistBold justify-center ${
            theme === "dark" ? "text-dark-primary" : "text-primary"
          }`}
          style={{ fontSize: rf(22) }}
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
            size={iconSizes.large}
            color={theme === "dark" ? "#fff" : "#0D0D0D"}
          />
        </TouchableOpacity>
      </View>
      {topUpError ? (
        <Text
          style={{
            color: "#E53E3E",
            marginLeft: wp(2),
            marginTop: hp(1.2),
            fontSize: rf(16),
            fontFamily: "Urbanist-Medium",
          }}
        >
          {topUpError}
        </Text>
      ) : null}
      <View style={{ marginTop: hp(1.2) }}>
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
          left: wp(5),
          right: wp(5),
          bottom: hp(5.2),
        }}
      >
        <TouchableOpacity
          className="bg-general rounded-full flex items-center font-urbanist-bold"
          style={{ paddingVertical: hp(2) }}
          onPress={handleContinue}
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
  );
};

export default SelectTopUpMethod;
