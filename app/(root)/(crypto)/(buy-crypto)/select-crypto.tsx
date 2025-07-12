import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type CryptoItem = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

export default function SelectCrypto() {
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [cryptoData, setCryptoData] = useState<CryptoItem[]>([]);

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

  const filteredCrypto = useMemo(
    () =>
      cryptoData.filter((crypto) =>
        crypto.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search, cryptoData]
  );

  const renderItem = ({ item }: any) => (
    <View>
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/(root)/(crypto)/(buy-crypto)/amount-to-buy",
            params: {
              name: item.name,
              price: item.current_price,
              logo: item.image,
              symbol: item.symbol.toUpperCase(),
            },
          });
        }}
        className="flex-row py-4 items-center"
      >
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-white">
        <View
          className="flex-row items-center pt-5 pl-5 pr-5"
          style={{ marginTop: 32 }}
        >
          <TouchableOpacity
            onPress={() => {
              router.push("/(root)/(tabs)/crypto");
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
              Select Crypto To Buy
            </Text>
          </View>
        </View>
        {search.length === 0 && (
          <AntDesign
            name="search1"
            size={24}
            color={searchFocused ? "#0D0D0D" : "#9CA3AF"}
            style={{ position: "absolute", left: 36, top: 138, zIndex: 1 }}
          />
        )}
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="        Search crypto"
          placeholderTextColor="#9CA3AF"
          className="text-xl font-UrbanistSemiBold border-none rounded-lg p-5 bg-[#F6F8FA] text-primary opacity-4 self-center"
          style={{ width: "90%", marginTop: 28 }}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        <View className="p-4">
          <FlatList
            data={filteredCrypto}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 184, paddingTop: 10 }}
            showsVerticalScrollIndicator={false}
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
    </TouchableWithoutFeedback>
  );
}
