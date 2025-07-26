// Transactionhistory.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useTheme } from "@/lib/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useTransactionStore } from "@/hooks/useTransactionStore";
import { router, useLocalSearchParams } from "expo-router";

const FILTERS = ["All", "Income", "Sent", "Top-up", "Withdraw"];

const Transactionhistory = () => {
  const { isNewUser } = useLocalSearchParams();
  const isNewUserBool = isNewUser === "true";
  const { transactions, fetchTransactions, loading } = useTransactionStore();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const { theme } = useTheme();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions = useMemo(() => {
    const convertAmount = (tx) => ({ ...tx, amount: tx.amount / 100 });

    switch (selectedFilter) {
      case "Income":
        return transactions
          .filter((tx) => tx.type === "INCOME")
          .map(convertAmount);
      case "Sent":
        return transactions
          .filter((tx) => tx.type === "TRANSFER")
          .map(convertAmount);
      case "Top-up":
        return transactions
          .filter((tx) => tx.type === "TOPUP")
          .map(convertAmount);
      case "Withdraw":
        return transactions
          .filter((tx) => tx.type === "WITHDRAWAL")
          .map(convertAmount);
      default:
        return transactions.map(convertAmount);
    }
  }, [transactions, selectedFilter]);

  const getAmountColor = (type: string) => {
    return type === "TOPUP" || type === "INCOME" ? "#22c55e" : "#ef4444";
  };

  const getAmountPrefix = (type: string) => {
    return type === "TOPUP" || type === "INCOME" ? "+" : "-";
  };

  const renderTransactionItem = ({ item }) => {
    const formattedType =
      item.type.charAt(0).toUpperCase() + item.type.slice(1).toLowerCase();

    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/(root)/(home)/(transaction-history)/[id]",
            params: { id: item.id },
          })
        }
        style={{
          flexDirection: "row",
          paddingVertical: 16,
          alignItems: "center",
          borderBottomColor: "#e6e6e6",
          borderBottomWidth: 1,
        }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: "#F6F8FA",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome5 name="user-alt" size={21} color="#9CA3AF" />
        </View>

        <View style={{ flex: 1, marginLeft: 20 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "600", fontSize: 18 }}>
              {formattedType}
            </Text>

            <Text
              style={{
                fontWeight: "600",
                fontSize: 18,
                color: getAmountColor(item.type),
              }}
            >
              {getAmountPrefix(item.type)}₵ {item.amount.toFixed(2)}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 6,
            }}
          >
            <Text style={{ fontSize: 14, color: "#666" }}>
              {new Date(item.createdAt).toLocaleTimeString()}
            </Text>
            <Text style={{ fontSize: 14, color: "#666" }}>{item.status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 16,
          marginTop: 30,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: "700" }}>
          Transaction History
        </Text>
        <TouchableOpacity>
          <AntDesign name="search1" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={{ marginTop: 12, paddingHorizontal: 16 }}>
        <FlatList
          data={FILTERS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          renderItem={({ item: label }) => (
            <TouchableOpacity
              onPress={() => setSelectedFilter(label)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 20,
                borderWidth: 1,
                borderColor:
                  selectedFilter === label ? "#82E394" : "#e6e6e6",
                backgroundColor:
                  selectedFilter === label ? "#82E394" : "transparent",
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                  color: selectedFilter === label ? "#000" : "#888",
                  fontSize: 14,
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Transactions */}
      {filteredTransactions.length === 0 ? (
        <Text
          style={{
            textAlign: "center",
            marginTop: 50,
            fontSize: 18,
            color: "#888",
          }}
        >
          No transactions found
        </Text>
      ) : (
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 100,
            marginTop: 20,
          }}
          renderItem={renderTransactionItem}
        />
      )}
    </View>
  );
};

export default Transactionhistory;
