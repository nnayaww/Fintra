import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useTheme } from '@/lib/ThemeContext';
import { MaskedTextInput } from 'react-native-mask-text';

const generateUUID = () => {
  const bytes = new Uint8Array(16);
  for (let i = 0; i < 16; i++) {
    bytes[i] = Math.floor(Math.random() * 256);
  }
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};

const AddNewPayment = () => {
  const { theme } = useTheme();
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const router = useRouter();

  const handleAddPayment = async () => {
    if (!cardName || !cardNumber || !expiryDate || !cvv) {
      Alert.alert('Please fill all fields');
      return;
    }

    try {
      const id = generateUUID();
      const newPaymentMethod = {
        id,
        name: cardName,
        number: cardNumber,
        expiryDate,
        cvv,
        image: require('@/assets/images/mastercard.jpg'),
        status: "Connected",
      };

      const storedMethods = await AsyncStorage.getItem('paymentMethods');
      const existingMethods = storedMethods ? JSON.parse(storedMethods) : [];

      const updatedMethods = [...existingMethods, newPaymentMethod];
      await AsyncStorage.setItem('paymentMethods', JSON.stringify(updatedMethods));

      Alert.alert('Payment method added!');
      router.back();
    } catch (error) {
      console.error('Failed to save payment method:', error);
      Alert.alert('Error saving payment method');
    }
  };

  const isDark = theme === 'dark';
  const inputStyle = [
    styles.input,
    { backgroundColor: isDark ? '#1E1E1E' : '#fff', color: isDark ? '#fff' : '#000' },
    { borderColor: isDark ? '#444' : '#ccc' },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <View style={styles.container}>
        <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Card Name</Text>
        <TextInput
          style={inputStyle}
          placeholder="e.g. Visa Classic"
          placeholderTextColor={isDark ? '#888' : '#888'}
          value={cardName}
          onChangeText={setCardName}
        />

        <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Card Number</Text>
        <MaskedTextInput
          mask="9999 9999 9999 9999"
          style={inputStyle}
          placeholder="1234 5678 9012 3456"
          placeholderTextColor={isDark ? '#888' : '#888'}
          keyboardType="number-pad"
          value={cardNumber}
          onChangeText={setCardNumber}
        />

        <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Expiry Date</Text>
        <TextInput
          style={inputStyle}
          placeholder="MM/YY"
          placeholderTextColor={isDark ? '#888' : '#888'}
          value={expiryDate}
          onChangeText={setExpiryDate}
        />

        <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>CVV</Text>
        <TextInput
          style={inputStyle}
          placeholder="123"
          placeholderTextColor={isDark ? '#888' : '#888'}
          value={cvv}
          onChangeText={setCvv}
          keyboardType="number-pad"
          secureTextEntry
        />

        <View style={styles.buttonContainer}>
          <Text
            style={styles.addButton}
            onPress={handleAddPayment}
          >
            Add Payment Method
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  container: {
    padding: 16,
    flex: 1,
  },
  label: {
    marginTop: 12,
    fontWeight: 'bold',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 24,
    backgroundColor: '#0D0D0D',
    borderRadius: 8,
    overflow: 'hidden',
  },
  addButton: {
    color: '#fff',
    paddingVertical: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddNewPayment;
