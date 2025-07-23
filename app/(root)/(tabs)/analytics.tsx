import { useTheme } from "@/lib/ThemeContext";
import { wp, hp, rf, rs, getSafeAreaPadding, getIconSize } from "@/lib/responsive";
import React, { useState, useEffect, useMemo } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useTransactionStore } from "../../../hooks/useTransactionStore";

const filterByRange = (transactions: any[], range: string) => {
  const now = new Date();
  return transactions.filter((t) => {
    const txDate = new Date(t.createdAt);
    if (range === "day") return txDate.toDateString() === now.toDateString();
    if (range === "week") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      return txDate >= startOfWeek;
    }
    if (range === "month")
      return (
        txDate.getMonth() === now.getMonth() &&
        txDate.getFullYear() === now.getFullYear()
      );
    return true;
  });
};

const Analytics = () => {
  const { theme } = useTheme();
  const { transactions, fetchTransactions } = useTransactionStore();
  const [range, setRange] = useState("week");
  const safeArea = getSafeAreaPadding();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const totals = useMemo(() => {
    const sums = { Income: 0, TopUp: 0, Withdraw: 0, Transfer: 0 };
    for (let tx of transactions) {
      if (tx.status?.toUpperCase() !== "SUCCESS") continue;
      const type = tx.type?.toUpperCase();
      switch (type) {
        case "TOPUP":
          sums.TopUp += tx.amount / 100; // Convert from pesewas
          sums.Income += tx.amount / 100;
          break;
        case "INCOME":
          sums.Income += tx.amount / 100;
          break;
        case "WITHDRAWAL":
          sums.Withdraw += tx.amount / 100;
          break;
        case "TRANSFER":
          sums.Transfer += tx.amount / 100;
          break;
      }
    }
    return sums;
  }, [transactions]);

  const filteredTx = filterByRange(transactions, range);
  const totalIncome = filteredTx
    .filter(t => ["TOPUP", "INCOME"].includes(t.type?.toUpperCase()))
    .reduce((sum, t) => sum + (t.amount / 100), 0);
  
  const totalExpenses = filteredTx
    .filter(t => ["WITHDRAWAL", "TRANSFER"].includes(t.type?.toUpperCase()))
    .reduce((sum, t) => sum + (t.amount / 100), 0);

  return (
    <SafeAreaView 
      style={[
        styles.container, 
        { backgroundColor: theme === "dark" ? "#181A20" : "#f8f9fa" }
      ]}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: hp(10) }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[
          styles.header,
          { 
            paddingTop: safeArea.top + hp(2),
            backgroundColor: theme === "dark" ? "#181A20" : "#f8f9fa",
            borderBottomColor: theme === "dark" ? "#333" : "#eee"
          }
        ]}>
          <Text style={[
            styles.headerTitle,
            { color: theme === "dark" ? "#fff" : "#000" }
          ]}>
            Analytics
          </Text>
        </View>

        {/* Summary Section */}
        <View style={[
          styles.summaryContainer,
          { backgroundColor: theme === "dark" ? "#23262F" : "#fff" }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { color: theme === "dark" ? "#fff" : "#000" }
          ]}>
            Summary
          </Text>
          <View style={styles.totalsGrid}>
            {Object.entries(totals).map(([label, amount]) => (
              <View 
                key={label} 
                style={[
                  styles.totalBox,
                  { backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)" }
                ]}
              >
                <Text style={[
                  styles.totalLabel,
                  { color: theme === "dark" ? "#aaa" : "#666" }
                ]}>
                  {label}
                </Text>
                <Text style={[
                  styles.totalAmount,
                  { color: theme === "dark" ? "#fff" : "#000" }
                ]}>
                  ₵{amount.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Range Selector */}
        <View style={styles.rangeContainer}>
          {["day", "week", "month"].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.rangeButton,
                {
                  backgroundColor: range === option 
                    ? "#196126" 
                    : (theme === "dark" ? "#374151" : "#f3f4f6")
                }
              ]}
              onPress={() => setRange(option)}
            >
              <Text style={[
                styles.rangeButtonText,
                {
                  color: range === option 
                    ? "#fff" 
                    : (theme === "dark" ? "#fff" : "#111827")
                }
              ]}>
                {option.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transaction Summary for Selected Range */}
        <View style={[
          styles.chartContainer,
          { backgroundColor: theme === "dark" ? "#23262F" : "#fff" }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { color: theme === "dark" ? "#fff" : "#000" }
          ]}>
            {range.charAt(0).toUpperCase() + range.slice(1)} Overview
          </Text>
          
          <View style={styles.overviewGrid}>
            <View style={[
              styles.overviewCard,
              { backgroundColor: "rgba(34, 197, 94, 0.1)" }
            ]}>
              <Text style={[styles.overviewLabel, { color: "#22c55e" }]}>
                Income
              </Text>
              <Text style={[
                styles.overviewAmount,
                { color: theme === "dark" ? "#fff" : "#000" }
              ]}>
                ₵{totalIncome.toFixed(2)}
              </Text>
              <Text style={[styles.overviewCount, { color: "#22c55e" }]}>
                {filteredTx.filter(t => ["TOPUP", "INCOME"].includes(t.type?.toUpperCase())).length} transactions
              </Text>
            </View>

            <View style={[
              styles.overviewCard,
              { backgroundColor: "rgba(239, 68, 68, 0.1)" }
            ]}>
              <Text style={[styles.overviewLabel, { color: "#ef4444" }]}>
                Expenses
              </Text>
              <Text style={[
                styles.overviewAmount,
                { color: theme === "dark" ? "#fff" : "#000" }
              ]}>
                ₵{totalExpenses.toFixed(2)}
              </Text>
              <Text style={[styles.overviewCount, { color: "#ef4444" }]}>
                {filteredTx.filter(t => ["WITHDRAWAL", "TRANSFER"].includes(t.type?.toUpperCase())).length} transactions
              </Text>
            </View>
          </View>

          <View style={[
            styles.netCard,
            { backgroundColor: totalIncome - totalExpenses >= 0 ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)" }
          ]}>
            <Text style={[
              styles.netLabel,
              { color: totalIncome - totalExpenses >= 0 ? "#22c55e" : "#ef4444" }
            ]}>
              Net {totalIncome - totalExpenses >= 0 ? "Gain" : "Loss"}
            </Text>
            <Text style={[
              styles.netAmount,
              { color: theme === "dark" ? "#fff" : "#000" }
            ]}>
              ₵{Math.abs(totalIncome - totalExpenses).toFixed(2)}
            </Text>
          </View>

          {filteredTx.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={[
                styles.emptyText,
                { color: theme === "dark" ? "#aaa" : "#666" }
              ]}>
                No transaction data available for {range.toUpperCase()}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Analytics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(2),
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: rf(24),
    fontWeight: "700",
    textAlign: "center",
  },
  summaryContainer: {
    marginHorizontal: wp(4),
    marginTop: hp(2.5),
    marginBottom: hp(1),
    padding: wp(5),
    borderRadius: wp(4),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: rf(18),
    fontWeight: "700",
    marginBottom: hp(1.5),
  },
  totalsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: wp(3),
  },
  totalBox: {
    width: "48%",
    paddingVertical: hp(1.5),
    borderRadius: wp(3),
    alignItems: "center",
  },
  totalLabel: {
    fontSize: rf(13),
    fontWeight: "500",
    opacity: 0.75,
    marginBottom: hp(0.5),
  },
  totalAmount: {
    fontSize: rf(20),
    fontWeight: "700",
  },
  rangeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp(2.5),
    marginBottom: hp(1),
    gap: wp(3),
  },
  rangeButton: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(5),
    borderRadius: wp(5),
  },
  rangeButtonText: {
    fontSize: rf(14),
    fontWeight: "600",
  },
  chartContainer: {
    marginHorizontal: wp(4),
    marginTop: hp(2.5),
    marginBottom: hp(7.5),
    paddingVertical: hp(3),
    paddingHorizontal: wp(5),
    borderRadius: wp(5),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  overviewGrid: {
    flexDirection: "row",
    gap: wp(3),
    marginBottom: hp(2.5),
  },
  overviewCard: {
    flex: 1,
    padding: wp(4),
    borderRadius: wp(3),
    alignItems: "center",
  },
  overviewLabel: {
    fontSize: rf(14),
    fontWeight: "600",
    marginBottom: hp(0.5),
  },
  overviewAmount: {
    fontSize: rf(22),
    fontWeight: "700",
    marginBottom: hp(0.5),
  },
  overviewCount: {
    fontSize: rf(12),
    fontWeight: "500",
  },
  netCard: {
    padding: wp(4),
    borderRadius: wp(3),
    alignItems: "center",
  },
  netLabel: {
    fontSize: rf(16),
    fontWeight: "600",
    marginBottom: hp(0.5),
  },
  netAmount: {
    fontSize: rf(26),
    fontWeight: "700",
  },
  emptyState: {
    paddingVertical: hp(5),
    alignItems: "center",
  },
  emptyText: {
    fontSize: rf(16),
    textAlign: "center",
  },
});