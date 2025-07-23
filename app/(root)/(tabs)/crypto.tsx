// app/crypto-list.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import axios from "axios";

export default function CryptoListScreen() {
  const [cryptoList, setCryptoList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAllCryptoPages = async () => {
    try {
      const pages = [1, 2, 3];
      const requests = pages.map((page) =>
        axios.get("https://api.coingecko.com/api/v3/coins/markets", {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 250,
            page,
            sparkline: false,
          },
        })
      );

      const responses = await Promise.all(requests);
      const combined = responses.flatMap((res) => res.data);
      setCryptoList(combined);
    } catch (error) {
      console.error("Error fetching crypto list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCryptoPages();
  }, []);

  const renderItem = ({ item }: { item: any }) => {
    const priceChange = item.price_change_percentage_24h;
    const priceColor = priceChange > 0 ? "#22c55e" : "#f87171"; // green or red

    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.coinImage} />

        <View style={styles.textContainer}>
          <Text style={styles.coinName}>{item.name}</Text>
          <Text style={styles.coinSymbol}>{item.symbol.toUpperCase()}</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.coinPrice}>${item.current_price.toFixed(2)}</Text>
          <Text style={[styles.coinChange, { color: priceColor }]}>
            {priceChange?.toFixed(2)}%
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#22c55e" />
      ) : (
        <FlatList
          data={cryptoList}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          initialNumToRender={20}
          maxToRenderPerBatch={50}
          removeClippedSubviews={true}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f", // dark background
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#1f1f1f",
  },
  coinImage: {
    width: 36,
    height: 36,
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  coinName: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  coinSymbol: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 2,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  coinPrice: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "500",
  },
  coinChange: {
    fontSize: 13,
    marginTop: 2,
  },
});
