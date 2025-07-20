import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';

import { LineChart } from 'react-native-chart-kit';
import { Rect, Svg, Text as SvgText } from 'react-native-svg';
import { useRouter } from 'expo-router';

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

// --- Component ---
const Analytics = () => {
  const router = useRouter();
  const [activePeriod, setActivePeriod] = useState<keyof typeof chartDataOptions>('Last 30 days');
  const [showMenu, setShowMenu] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 });

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
    <ScrollView style={styles.container}>
      <View style={[styles.header, showMenu && { zIndex: 10 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Insights</Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Feather name="more-vertical" size={24} color="#000" />
        </TouchableOpacity>
        {showMenu && (
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={toggleMenu}>
              <Text>Refresh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={toggleMenu}>
              <Text>Export Data</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Total Spending</Text>
        <Text style={styles.summaryAmount}>$5,286.50</Text>
        <View style={styles.pillsContainer}>
          {(Object.keys(chartDataOptions) as Array<keyof typeof chartDataOptions>).map((period) => (
            <TouchableOpacity
              key={period}
              style={[styles.pill, activePeriod === period && styles.activePill]}
              onPress={() => handlePeriodChange(period)}
            >
              <Text style={[styles.pillText, activePeriod === period && styles.activePillText]}>
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          data={currentChartData}
          width={screenWidth - 16}
          height={250}
          chartConfig={styles.chartConfig}
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
                <Rect x={tooltipPos.x - 30} y={tooltipPos.y - 40} width="65" height="30" rx={8} fill="#2c3e50" />
                <SvgText x={tooltipPos.x} y={tooltipPos.y - 20} fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">
                  {`${tooltipPos.value.toFixed(2)}`}
                </SvgText>
              </Svg>
            );
          }}
        />
      </View>

      <View style={styles.transactionsContainer}>
        <Text style={styles.transactionsTitle}>Recent Transactions</Text>
        {transactionData.map((transaction) => (
          <View key={transaction.id} style={styles.transactionItem}>
            <View style={styles.transactionIcon}>
              <Feather name={transaction.icon as any} size={24} color="#000" />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionName}>{transaction.name}</Text>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
            </View>
            <Text style={styles.transactionAmount}>{transaction.amount}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

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
  chartConfig: {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
    strokeWidth: 2,
    propsForDots: { r: '6', strokeWidth: '2', stroke: '#ffa726' },
  },
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

export default Analytics;

