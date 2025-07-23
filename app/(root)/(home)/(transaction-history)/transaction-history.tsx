// Transactionhistory.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import { useTheme } from "@/lib/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useTransactionStore } from "@/hooks/useTransactionStore";
import { router, useLocalSearchParams } from "expo-router";

const FILTERS = ["All", "Income", "Sent","Top-up", "Withdraw"];

const Transactionhistory = () => {
  const { isNewUser } = useLocalSearchParams();
  const isNewUserBool = isNewUser === "true";
  const { transactions, fetchTransactions, loading } = useTransactionStore();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const { theme } = useTheme();

  useEffect(() => {
    fetchTransactions();
  }, []);
  console.log(transactions)
  const filteredTransactions = useMemo(() => {
    if (selectedFilter === "All") return transactions;

    // if (selectedFilter === "Request") {
    //   return transactions.filter((tx) => tx.type === "REQUEST");
    // }

    if (selectedFilter === "Income") {
      return transactions.filter((tx) => tx.type === "INCOME");
    }

    if (selectedFilter === "Sent") {
      return transactions.filter((tx) => tx.type === "TRANSFER");
    }
    if (selectedFilter === "Top-up") {
      return transactions.filter((tx) => tx.type === "TOPUP");
    }
    if (selectedFilter === "Withdraw") {
      return transactions.filter((tx) => tx.type === "WITHDRAWAL");
    }

    return transactions.filter((tx) => tx.type.toLowerCase() === selectedFilter.toLowerCase());
  }, [transactions, selectedFilter]);

  const renderTransactionItem = ({ item }) => (
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
      <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: "#F6F8FA", justifyContent: "center", alignItems: "center" }}>
        <FontAwesome5 name="user-alt" size={21} color="#9CA3AF" />
      </View>
      <View style={{ flex: 1, marginLeft: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontWeight: "600", fontSize: 18 }}>{item.type}</Text>
          <Text style={{ fontWeight: "600", fontSize: 18, color: item.type === "TOPUP" ? "green" : "red" }}>
            {item.type === "TOPUP" ? "+" : "-"}₵ {item.amount.toFixed(2)}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
          <Text style={{ fontSize: 14, color: "#666" }}>{new Date(item.createdAt).toLocaleTimeString()}</Text>
          <Text style={{ fontSize: 14, color: "#666" }}>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 16, marginTop: 30 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: "700" }}>Transaction History</Text>
        <TouchableOpacity>
          <AntDesign name="search1" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 12, marginTop: 12 }}>
        {FILTERS.map((label) => (
          <TouchableOpacity
            key={label}
            onPress={() => setSelectedFilter(label)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: selectedFilter === label ? "#82E394" : "#e6e6e6",
              backgroundColor: selectedFilter === label ? "#82E394" : "transparent",
            }}
          >
            <Text style={{ fontWeight: "600", color: selectedFilter === label ? "#000" : "#888" }}>{label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView> */} 
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
          borderColor: selectedFilter === label ? "#82E394" : "#e6e6e6",
          backgroundColor: selectedFilter === label ? "#82E394" : "transparent",
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


      {filteredTransactions.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 50, fontSize: 18, color: "#888" }}>
          No transactions found
        </Text>
      ) : (
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100, marginTop: 20 }}
          renderItem={renderTransactionItem}
        />
      )}
    </View>
  );
};

export default Transactionhistory;
