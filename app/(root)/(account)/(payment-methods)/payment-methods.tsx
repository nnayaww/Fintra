// app/(root)/(account)/(payment-methods)/index.tsx
import PaymentMethodCard from "@/components/paymentMethodCard";
import { useTheme } from "@/lib/ThemeContext";
import { PaymentMethods } from "@/constants";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Text as RNText,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Swipeable } from "react-native-gesture-handler";

const PaymentMethodsScreen = () => {
  const { theme } = useTheme();
  const [methods, setMethods] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchMethods = async () => {
        try {
          const stored = await AsyncStorage.getItem("paymentMethods");
          const addedMethods = stored ? JSON.parse(stored) : [];

          // Combine default + added
          const combined = [...PaymentMethods, ...addedMethods];
          setMethods(combined);
        } catch (e) {
          console.error("Failed to load payment methods", e);
        }
      };
      fetchMethods();
    }, [])
  );

  const handleDelete = async (idToDelete: string) => {
    try {
      const stored = await AsyncStorage.getItem("paymentMethods");
      const addedMethods = stored ? JSON.parse(stored) : [];

      const updated = addedMethods.filter((m: any) => m.id !== idToDelete);
      await AsyncStorage.setItem("paymentMethods", JSON.stringify(updated));

      setMethods([...PaymentMethods, ...updated]);
    } catch (e) {
      console.error("Failed to delete payment method", e);
    }
  };

  const renderRightActions = (id: string) => (
    <TouchableOpacity
      onPress={() => handleDelete(id)}
      style={{
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        marginVertical: 10,
        borderRadius: 10,
      }}
    >
      <RNText style={{ color: "white", fontWeight: "bold" }}>Delete</RNText>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: any }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <PaymentMethodCard
        id={item.id}
        name={item.name}
        status={item.status ?? "Connected"}
        image={item.image}
        number={item.number}
        selected={false}
        onPress={() => {}}
      />
    </Swipeable>
  );

  return (
    <View
      className={`flex-1 p-5 ${
        theme === "dark" ? "bg-dark-background" : "bg-white"
      }`}
    >
      <View className="flex-row justify-between items-center mt-3">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={28}
            color={theme === "dark" ? "#fff" : "#0D0D0D"}
            style={{ padding: 6, marginTop: 22 }}
          />
        </TouchableOpacity>
        <Text
          className={`font-UrbanistBold mt-5 ${
            theme === "dark" ? "text-dark-primary" : "text-primary"
          }`}
          style={{ fontSize: 24 }}
        >
          Payment Methods
        </Text>
        <TouchableOpacity
          onPress={() =>
            router.push("/(root)/(account)/(payment-methods)/add-new-payment")
          }
        >
          <Feather
            name="plus"
            size={30}
            color={theme === "dark" ? "#fff" : "#0D0D0D"}
            style={{ marginTop: 20 }}
          />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 20 }}>
        <FlatList
          data={methods}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default PaymentMethodsScreen;
