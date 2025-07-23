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
import { useTheme } from "@/lib/ThemeContext";

export default function CryptoListScreen() {
  const { theme } = useTheme();
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
    const priceColor = priceChange > 0 ? "#4ade80" : "#f87171";

    return (
      <View style={[
        styles.itemContainer,
        { backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff' }
      ]}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: item.image }} style={styles.coinImage} />
          <View style={styles.nameContainer}>
            <Text style={[
              styles.coinName,
              { color: theme === 'dark' ? '#ffffff' : '#111827' }
            ]}>
              {item.name}
            </Text>
            <Text style={[
              styles.coinSymbol,
              { color: theme === 'dark' ? '#a1a1aa' : '#64748b' }
            ]}>
              {item.symbol.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.rightContainer}>
          <Text style={[
            styles.coinPrice,
            { color: theme === 'dark' ? '#f9fafb' : '#111827' }
          ]}>
            ${item.current_price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </Text>
          <Text style={[styles.coinChange, { color: priceColor }]}>
            {priceChange?.toFixed(2)}%
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: theme === 'dark' ? '#0f0f0f' : '#f9fafb' }
    ]}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4ade80" />
        </View>
      ) : (
        <FlatList
          data={cryptoList}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          initialNumToRender={20}
          maxToRenderPerBatch={50}
          removeClippedSubviews
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  coinImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 12,
  },
  nameContainer: {
    justifyContent: "center",
  },
  coinName: {
    fontSize: 16,
    fontWeight: "600",
  },
  coinSymbol: {
    fontSize: 13,
    marginTop: 2,
    textTransform: "uppercase",
  },
  rightContainer: {
    alignItems: "flex-end",
  },
  coinPrice: {
    fontSize: 15,
    fontWeight: "500",
  },
  coinChange: {
    fontSize: 13,
    marginTop: 2,
    fontWeight: "500",
  },
});
