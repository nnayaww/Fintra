import { useTheme } from "@/lib/ThemeContext";
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Rect, Svg, Text as SvgText } from 'react-native-svg';

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  summaryTitle: { fontSize: 16, color: '#666' },
  summaryAmount: { fontSize: 36, fontWeight: 'bold', marginVertical: 10 },
  pillsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    margin: 5,
  },
  activePill: { backgroundColor: '#000' },
  pillText: { color: '#000', fontWeight: '500' },
  activePillText: { color: '#fff' },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  chart: { borderRadius: 16 },
  transactionsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
  },
  transactionsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  transactionItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  transactionIcon: { backgroundColor: '#f0f0f0', padding: 10, borderRadius: 50, marginRight: 15 },
  transactionDetails: { flex: 1 },
  transactionName: { fontSize: 16, fontWeight: 'bold' },
  transactionDate: { color: '#666', marginTop: 2 },
  transactionAmount: { fontSize: 16, fontWeight: 'bold' },
  menu: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1000,
  },
  menuItem: { padding: 12 },
});

// --- Theme Colors ---
const getPalette = (theme: "light" | "dark") => ({
  background: theme === "dark" ? "#181A20" : "#f8f9fa",
  card: theme === "dark" ? "#23262F" : "#fff",
  border: theme === "dark" ? "#23262F" : "#eee",
  text: theme === "dark" ? "#fff" : "#000",
  subtext: theme === "dark" ? "#aaa" : "#666",
  pill: theme === "dark" ? "#23262F" : "#f0f0f0",
  pillActive: theme === "dark" ? "#fff" : "#000",
  pillText: theme === "dark" ? "#fff" : "#000",
  pillActiveText: theme === "dark" ? "#23262F" : "#fff",
  iconBg: theme === "dark" ? "#23262F" : "#f0f0f0",
  menu: theme === "dark" ? "#23262F" : "#fff",
  shadow: theme === "dark" ? "#000" : "#000",
});

// --- Chart Config ---
const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: ((opacity = 1) => `rgba(0, 0, 0, ${opacity})`) as any,
  labelColor: ((opacity = 1) => `rgba(100, 100, 100, ${opacity})`) as any,
  strokeWidth: 2,
  propsForDots: { r: '6', strokeWidth: '2', stroke: '#ffa726' },
};

// --- Mock Data ---
const transactionData = [
  { id: '1', name: 'Income', date: 'July 15, 2025', amount: '+$2,500.00', icon: 'arrow-down-left' },
  { id: '2', name: 'Top Up', date: 'July 14, 2025', amount: '+$100.00', icon: 'plus-circle' },
  { id: '3', name: 'Sent', date: 'July 13, 2025', amount: '-$50.00', icon: 'arrow-up-right' },
  { id: '4', name: 'Request', date: 'July 12, 2025', amount: '+$20.00', icon: 'arrow-down-left' },
  { id: '5', name: 'Withdrawal', date: 'July 11, 2025', amount: '-$200.00', icon: 'credit-card' },
];

const generateChartData = (days: number) => ({
  labels: Array.from({ length: days }, (_, i) => `${i + 1}`),
  datasets: [
    {
      data: Array.from({ length: days }, () => Math.random() * 200 + 50),
      color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`, // Green for Income
      strokeWidth: 3,
    },
    {
      data: Array.from({ length: days }, () => Math.random() * 150),
      color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`, // Red for Expenses
      strokeWidth: 3,
    },
  ],
  legend: ['Income', 'Expenses'],
});

const chartDataOptions = {
  'Last 7 days': generateChartData(7),
  'Last 30 days': generateChartData(30),
  'All time': generateChartData(12), // Representing 12 months
};

const Analytics = () => {
  const router = useRouter();
  const [activePeriod, setActivePeriod] = useState<keyof typeof chartDataOptions>('Last 30 days');
  const [showMenu, setShowMenu] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 });
  const { theme } = useTheme();
  const palette = getPalette(theme);

  const handlePeriodChange = (period: keyof typeof chartDataOptions) => {
    setActivePeriod(period);
    setTooltipPos({ ...tooltipPos, visible: false });
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const screenWidth = Dimensions.get('window').width;
  const currentChartData = chartDataOptions[activePeriod];

  return (
    <ScrollView style={[styles.container, { backgroundColor: palette.background }]}>
      <View style={[styles.header, { backgroundColor: palette.card, borderBottomColor: palette.border, justifyContent: 'center' }]}>
        <Text style={[styles.headerTitle, { color: palette.text, textAlign: 'center', flex: 1 }]}>Insights</Text>
        <TouchableOpacity onPress={toggleMenu} style={{ position: 'absolute', right: 20, top: 70 }}>
          <Feather name="more-vertical" size={24} color={palette.text} />
        </TouchableOpacity>
        {showMenu && (
          <View style={[styles.menu, { backgroundColor: palette.menu, shadowColor: palette.shadow }]}>
            <TouchableOpacity style={styles.menuItem} onPress={toggleMenu}>
              <Text style={{ color: palette.text }}>Refresh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={toggleMenu}>
              <Text style={{ color: palette.text }}>Export Data</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={[styles.summaryContainer, { backgroundColor: palette.card, shadowColor: palette.shadow }]}>
        <Text style={[styles.summaryTitle, { color: palette.subtext }]}>Total Spending</Text>
        <Text style={[styles.summaryAmount, { color: palette.text }]}>$5,286.50</Text>
        <View style={styles.pillsContainer}>
          {(Object.keys(chartDataOptions) as (keyof typeof chartDataOptions)[]).map((period) => (
            <TouchableOpacity
              key={period}
              style={[styles.pill, { backgroundColor: activePeriod === period ? palette.pillActive : palette.pill }]}
              onPress={() => handlePeriodChange(period)}
            >
              <Text style={[styles.pillText, { color: activePeriod === period ? palette.pillActiveText : palette.pillText }]}>
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={[styles.chartContainer, { backgroundColor: palette.card, shadowColor: palette.shadow }]}>
        <LineChart
          data={currentChartData}
          width={screenWidth - 16}
          height={250}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          onDataPointClick={(data) => {
            const isSamePoint = tooltipPos.visible && tooltipPos.x === data.x;
            setTooltipPos({ ...data, visible: !isSamePoint, value: data.value });
          }}
          decorator={() => {
            if (!tooltipPos.visible) return null;
            return (
              <Svg>
                <Rect x={tooltipPos.x - 30} y={tooltipPos.y - 40} width="65" height="30" rx={8} fill={theme === 'dark' ? '#23262F' : '#2c3e50'} />
                <SvgText x={tooltipPos.x} y={tooltipPos.y - 20} fill={theme === 'dark' ? '#fff' : 'white'} fontSize="14" fontWeight="bold" textAnchor="middle">
                  {`${tooltipPos.value.toFixed(2)}`}
                </SvgText>
              </Svg>
            );
          }}
        />
      </View>

      <View style={[styles.transactionsContainer, { backgroundColor: palette.card }]}>
        <Text style={[styles.transactionsTitle, { color: palette.text }]}>Recent Transactions</Text>
        {transactionData.map((transaction) => (
          <View key={transaction.id} style={styles.transactionItem}>
            <View style={[styles.transactionIcon, { backgroundColor: palette.iconBg }]}>
              <Feather name={transaction.icon as any} size={24} color={palette.text} />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={[styles.transactionName, { color: palette.text }]}>{transaction.name}</Text>
              <Text style={[styles.transactionDate, { color: palette.subtext }]}>{transaction.date}</Text>
            </View>
            <Text style={[styles.transactionAmount, { color: palette.text }]}>{transaction.amount}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Analytics; 