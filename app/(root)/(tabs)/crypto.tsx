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
import { wp, hp, rf, rs, getSafeAreaPadding, isSmallScreen } from "@/lib/responsive";

export default function CryptoListScreen() {
  const { theme } = useTheme();
  const [cryptoList, setCryptoList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const safeArea = getSafeAreaPadding();

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
    paddingHorizontal: wp(4),
  },
  listContent: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(2),
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: rs(12),
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(3),
    marginBottom: hp(1.2),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  coinImage: {
    width: wp(isSmallScreen() ? 9 : 10),
    height: wp(isSmallScreen() ? 9 : 10),
    borderRadius: wp(isSmallScreen() ? 4.5 : 5),
    marginRight: wp(3),
  },
  nameContainer: {
    justifyContent: "center",
    flex: 1,
  },
  coinName: {
    fontSize: rf(15),
    fontWeight: "600",
  },
  coinSymbol: {
    fontSize: rf(12),
    marginTop: hp(0.3),
    textTransform: "uppercase",
  },
  rightContainer: {
    alignItems: "flex-end",
    minWidth: wp(25),
  },
  coinPrice: {
    fontSize: rf(14),
    fontWeight: "500",
  },
  coinChange: {
    fontSize: rf(12),
    marginTop: hp(0.3),
    fontWeight: "500",
  },
});
