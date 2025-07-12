import { images } from "@/constants";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

type CryptoItem = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

const crypto = () => {
  const [cryptoData, setCryptoData] = useState<CryptoItem[]>([]);

  const CryptoBalance = formatBalance(0);

  const fetchCrypto = async () => {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            page: 1,
            sparkline: false,
          },
        }
      );
      setCryptoData(res.data);
    } catch (error) {
      console.error("Error fetching crypto data.", error);
    }
  };

  useEffect(() => {
    fetchCrypto();
  }, []);

  const renderItem = ({ item }: any) => (
    <View>
      <TouchableOpacity className="flex-row py-4 items-center">
        <View className="rounded-full flex items-center justify-center bg-[#F6F8FA]">
          <Image
            source={{ uri: item.image }}
            style={{ width: 55, height: 55 }}
          />
        </View>
        <View className="flex-1 flex-col ml-5 gap-3">
          <View className="flex-row justify-between items-center">
            <Text
              className="font-UrbanistSemiBold text-primary"
              style={{ fontSize: 19 }}
            >
              {item.name}
            </Text>
            <Text
              className="text-primary font-UrbanistSemiBold"
              style={{ fontSize: 18 }}
            >
              ${formatBalance(item.current_price)}
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text
              className="text-secondary font-UrbanistMedium"
              style={{ fontSize: 15 }}
            >
              {item.symbol.toUpperCase()}
            </Text>
            <Text
              className="font-UrbanistMedium text-secondary"
              style={{
                fontSize: 15,
                color: item.price_change_percentage_24h >= 0 ? "green" : "red",
              }}
            >
              {item.price_change_percentage_24h >= 0
                ? `+${item.price_change_percentage_24h.toFixed(2)}%`
                : `${item.price_change_percentage_24h.toFixed(2)}%`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

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
    <View className="flex-1 bg-white p-5">
      <View className="flex" style={{ marginTop: 28 }}>
        <View className="flex-row px-5">
          <Image
            source={images.BlackLogo}
            style={{ width: 50, height: 40, marginLeft: -14 }}
          />
          <Text
            className="font-UrbanistBold text-3xl"
            style={{ marginHorizontal: 80 }}
          >
            Crypto
          </Text>
        </View>
        <View
          className="flex items-center justify-center"
          style={{ marginTop: 48 }}
        >
          <View className="flex-row gap-2 justify-center">
            <Text
              className="font-UrbanistBold text-primary"
              style={{ fontSize: 50 }}
            >
              {CryptoBalance}
            </Text>
            {/*NewCryptoBalance is the (CalcAmount(which is, (amountEntered/PriceofThatCrypto*dollarRate), because it's in cedis)) * PriceofThatCrypto). Therefore, CryptoBalance will be (CurrentCryptoBalance + NewCryptoBalance)*/}
            {/*Include logic where crypto balance you bought increases or decreases when the price of the crypto you now hold increases or decreases*/}
            <FontAwesome6
              name="cedi-sign"
              size={20}
              color="#0D0D0D"
              style={{ marginTop: 16 }}
            />
          </View>
          <Text className="font-UrbanistMedium text-primary text-xl mt-2">
            Your crypto balance
          </Text>
        </View>
      </View>
      <TouchableOpacity
        className="bg-general flex items-center justify-center p-5 border-none rounded-full"
        onPress={() => {
          router.push("/(root)/(crypto)/(buy-crypto)/select-crypto");
        }}
        style={{ marginTop: 54 }}
      >
        <Text
          className="font-UrbanistSemiBold text-primary"
          style={{ fontSize: 20 }}
        >
          Buy Crypto
        </Text>
      </TouchableOpacity>
      <View className="mt-10">
        <Text
          className="font-UrbanistMedium text-secondary"
          style={{ fontSize: 18, paddingBottom: 10 }}
        >
          Explore more crypto
        </Text>
        <FlatList
          data={cryptoData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 260 }}
          ItemSeparatorComponent={() => (
            <View className="flex items-end">
              <View
                className="h-[1px]"
                style={{ width: "80%", backgroundColor: "#e6e6e6" }}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default crypto;
