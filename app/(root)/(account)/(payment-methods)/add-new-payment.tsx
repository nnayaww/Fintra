import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

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
        image: require('@/assets/images/mastercard.jpg'), // default image
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

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Card Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Visa Classic"
        value={cardName}
        onChangeText={setCardName}
      />

      <Text style={styles.label}>Card Number</Text>
      <TextInput
        style={styles.input}
        placeholder="1234 5678 9012 3456"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="number-pad"
      />

      <Text style={styles.label}>Expiry Date</Text>
      <TextInput
        style={styles.input}
        placeholder="MM/YY"
        value={expiryDate}
        onChangeText={setExpiryDate}
      />

      <Text style={styles.label}>CVV</Text>
      <TextInput
        style={styles.input}
        placeholder="123"
        value={cvv}
        onChangeText={setCvv}
        keyboardType="number-pad"
        secureTextEntry
      />

      <Button title="Add Payment Method" onPress={handleAddPayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    marginTop: 12,
    fontWeight: 'bold',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 4,
  },
});

export default AddNewPayment;
