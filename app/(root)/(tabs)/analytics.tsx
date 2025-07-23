import { useTheme } from "@/lib/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState, useEffect, useMemo } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useTransactionStore } from "../../../hooks/useTransactionStore";

const screenWidth = Dimensions.get("window").width - 32;

const filterByRange = (transactions, range) => {
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

const groupByDate = (transactions, typeFilter) => {
  const map = new Map();
  transactions
    .filter(
      (t) =>
        t.status?.toUpperCase() === "SUCCESS" &&
        typeFilter.includes(t.type?.toUpperCase())
    )
    .forEach((t) => {
      const key = new Date(t.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const prev = map.get(key) || 0;
      map.set(key, prev + t.amount);
    });

  const sorted = Array.from(map.entries()).sort(
    ([a], [b]) => new Date(a) - new Date(b)
  );

  return {
    labels: sorted.map(([label]) => label),
    data: sorted.map(([, value]) => value),
  };
};

const Analytics = () => {
  const { theme } = useTheme();
  const { transactions, fetchTransactions } = useTransactionStore();
  const router = useRouter();
  const [range, setRange] = useState("week");

  const palette = {
    background: theme === "dark" ? "#181A20" : "#f8f9fa",
    card: theme === "dark" ? "#23262F" : "#fff",
    text: theme === "dark" ? "#fff" : "#000",
    subtext: theme === "dark" ? "#aaa" : "#666",
    border: theme === "dark" ? "#333" : "#eee",
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const totals = useMemo(() => {
    const sums = { Income: 0, TopUp: 0, Withdraw: 0, Transfer: 0 };
    for (let tx of transactions) {
      if (tx.status?.toUpperCase() !== "SUCCESS") continue;
      const type = tx.type?.toUpperCase();
      switch (type) {
        case "TOPUP":
          sums.TopUp += tx.amount;
          sums.Income += tx.amount;
          break;
        case "INCOME":
          sums.Income += tx.amount;
          break;
        case "WITHDRAWAL":
          sums.Withdraw += tx.amount;
          break;
        case "TRANSFER":
          sums.Transfer += tx.amount;
          break;
      }
    }
    return sums;
  }, [transactions]);

  const filteredTx = filterByRange(transactions, range);
  const incomeData = groupByDate(filteredTx, ["INCOME", "TOPUP"]);
  const expenseData = groupByDate(filteredTx, ["WITHDRAWAL", "TRANSFER"]);

  const hasChartData =
    incomeData.data.length > 0 || expenseData.data.length > 0;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: palette.background }}>
      <View
        style={[
          styles.header,
          { backgroundColor: palette.card, borderBottomColor: palette.border },
        ]}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color={palette.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: palette.text }]}>
          Analytics
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={[styles.summaryContainer, { backgroundColor: palette.card }]}>
        <Text style={[styles.sectionTitle, { color: palette.subtext }]}>Summary</Text>
        <View style={styles.totalsGrid}>
          {Object.entries(totals).map(([label, amount]) => (
            <View key={label} style={styles.totalBox}>
              <Text style={[styles.totalLabel, { color: palette.subtext }]}>
                {label}
              </Text>
              <Text style={[styles.totalAmount, { color: palette.text }]}>
                ${amount.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.rangeContainer}>
        {["day", "week", "month"].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.rangeButton,
              {
                backgroundColor:
                  range === option ? "#1E90FF" : palette.border,
              },
            ]}
            onPress={() => setRange(option)}
          >
            <Text
              style={{
                color: range === option ? "#fff" : palette.text,
                fontWeight: "600",
                fontSize: 13,
              }}
            >
              {option.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.chartContainer, { backgroundColor: palette.card }]}>
        {hasChartData ? (
          <>
            <Text style={[styles.chartTitle, { color: palette.subtext }]}>
              Income – ${incomeData.data.reduce((a, b) => a + b, 0).toFixed(2)}
            </Text>
            <BarChart
              data={{
                labels: incomeData.labels,
                datasets: [{ data: incomeData.data }],
              }}
              width={screenWidth + 16}
              height={240}
              fromZero={true}
              chartConfig={{
                backgroundColor: palette.card,
                backgroundGradientFrom: palette.card,
                backgroundGradientTo: palette.card,
                decimalPlaces: 0,
                barRadius: 6,
                color: () => "#22c55e",
                labelColor: () => palette.text,
                propsForBackgroundLines: {
                  stroke: palette.border,
                },
                propsForLabels: {
                  fontSize: 12,
                },
              }}
              withInnerLines
              withHorizontalLabels
              style={{
                borderRadius: 12,
                marginBottom: 24,
              }}
            />

            <Text style={[styles.chartTitle, { color: palette.subtext }]}>
              Expenses – ${expenseData.data.reduce((a, b) => a + b, 0).toFixed(2)}
            </Text>
            <BarChart
              data={{
                labels: expenseData.labels,
                datasets: [{ data: expenseData.data }],
              }}
              width={screenWidth + 16}
              height={240}
              fromZero={true}
              chartConfig={{
                backgroundColor: palette.card,
                backgroundGradientFrom: palette.card,
                backgroundGradientTo: palette.card,
                decimalPlaces: 0,
                barRadius: 6,
                color: () => "#ef4444",
                labelColor: () => palette.text,
                propsForBackgroundLines: {
                  stroke: palette.border,
                },
                propsForLabels: {
                  fontSize: 12,
                },
              }}
              withInnerLines
              withHorizontalLabels
              style={{
                borderRadius: 12,
              }}
            />
          </>
        ) : (
          <Text
            style={{
              color: palette.subtext,
              fontSize: 16,
              textAlign: "center",
              paddingVertical: 40,
            }}
          >
            No transaction data available for {range.toUpperCase()}
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default Analytics;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  summaryContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  totalsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  totalBox: {
    width: "48%",
    paddingVertical: 12,
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderRadius: 12,
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: "500",
    opacity: 0.75,
    marginBottom: 6,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  rangeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 8,
    gap: 12,
  },
  rangeButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  chartContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 60,
    paddingVertical: 24,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginLeft: 12,
    marginBottom: 8,
  },
});
