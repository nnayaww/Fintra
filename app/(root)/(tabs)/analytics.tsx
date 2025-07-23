import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/lib/ThemeContext';

export default function Analytics() {
  const { theme } = useTheme();
  
  return (
    <View style={[
      styles.container,
      { backgroundColor: theme === 'dark' ? '#121212' : '#ffffff' }
    ]}>
      <Text style={[
        styles.title,
        { color: theme === 'dark' ? '#ffffff' : '#000000' }
      ]}>
        📊 Analytics Screen
      </Text>
      <Text style={[
        styles.subtitle,
        { color: theme === 'dark' ? '#a3a3a3' : '#666666' }
      ]}>
        Your financial analytics will appear here
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});