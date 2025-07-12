import { FormattedTransaction, formatTransactions } from "@/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FILTERS = ["All", "Income", "Sent", "Request", "Top-up", "Withdraw"];

const Transactionhistory = () => {
  const { isNewUser } = useLocalSearchParams();
  const isNewUserBool = isNewUser === "true";
  const transactionSections = formatTransactions();
  const [contactImage, setContactImage] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const allTransactions: FormattedTransaction[] = transactionSections.flatMap(
    (section) => section.data
  );

  const filteredTransactions =
    selectedFilter === "All"
      ? allTransactions
      : allTransactions.filter((txn) => {
          if (selectedFilter === "Request") {
            return txn.category === "Incoming Request";
          }
          return txn.category === selectedFilter;
        });

  const user = {
    transactions: transactionSections,
  };

  const hasTransactions =
    user.transactions &&
    Array.isArray(user.transactions) &&
    user.transactions.some(
      (section) => section.data && section.data.length > 0
    );

  const renderTransactionItem = ({ item }: { item: FormattedTransaction }) => (
    <View>
      <TouchableOpacity
        className="flex-row py-4 items-center"
        onPress={() =>
          router.push({
            pathname: "/(root)/(home)/(transaction-history)/[id]",
            params: { id: item.id },
          })
        }
      >
        <View
          className="rounded-full flex items-center justify-center bg-[#F6F8FA]"
          style={{ width: 60, height: 60 }}
        >
          {contactImage ? (
            <>
              <Image
                source={{ uri: contactImage }}
                style={{ width: 60, height: 60 }}
                resizeMode="cover"
              />
            </>
          ) : (
            <FontAwesome5 name="user-alt" size={21} color="#9CA3AF" />
          )}
        </View>
        <View className="flex-1 flex-col ml-5 gap-3">
          <View className="flex-row justify-between items-center">
            <Text
              className="font-UrbanistSemiBold text-primary"
              style={{ fontSize: 19 }}
            >
              {item.name}
            </Text>
            <Text
              className="text-primary font-UrbanistSemiBold"
              style={{ fontSize: 19 }}
            >
              {item.category === "Income"
                ? `+₵ ${Number(item.amount).toFixed(2)}`
                : item.category === "Sent"
                ? `-₵ ${Number(item.amount).toFixed(2)}`
                : item.category === "Incoming Request"
                ? `₵ ${Number(item.amount).toFixed(2)}`
                : `₵ ${Number(item.amount).toFixed(2)}`}
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text
              className="text-secondary font-UrbanistMedium"
              style={{ fontSize: 15 }}
            >
              {item.time}
            </Text>
            <Text
              className="font-UrbanistMedium text-secondary"
              style={{ fontSize: 14 }}
            >
              {item.category}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <View className="flex-1 bg-white">
      <View
        className="flex-row justify-between items-center pt-5 pl-5 pr-5"
        style={{ marginTop: 32 }}
      >
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/(root)/(tabs)/home",
              params: { isNewUser: isNewUserBool ? "true" : "false" },
            });
          }}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#0D0D0D"
            style={{ padding: 6 }}
          />
        </TouchableOpacity>
        <Text
          className="font-UrbanistBold text-primary"
          style={{ fontSize: 22 }}
        >
          Transaction History
        </Text>
        <TouchableOpacity onPress={() => {}}>
          <AntDesign
            name="search1"
            size={24}
            color="#0D0D0D"
            style={{ padding: 6 }}
          />
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 12,
            marginTop: 28,
          }}
        >
          {FILTERS.map((label) => (
            <TouchableOpacity
              key={label}
              onPress={() => setSelectedFilter(label)}
              className="px-5 py-2 border border-[#e6e6e6] bg-transparent rounded-full justify-center items-center  min-h-[40px]"
              style={{
                backgroundColor:
                  selectedFilter === label ? "#82E394" : "transparent",
                borderColor: selectedFilter === label ? "#82E394" : "#e6e6e6",
              }}
            >
              <Text className="text-primary text-lg font-UrbanistBold">
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {isNewUserBool || !hasTransactions ? (
        <View>
          <Text
            className="text-center font-UrbanistSemiBold text-2xl text-secondary"
            style={{ marginTop: 50 }}
          >
            No transactions found
          </Text>
        </View>
      ) : (
        <View className="px-4 mt-5">
          <FlatList
            data={filteredTransactions}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 190 }}
            renderItem={renderTransactionItem}
            ItemSeparatorComponent={() => (
              <View className="flex items-end">
                <View
                  className="h-[1px]"
                  style={{ width: "80%", backgroundColor: "#e6e6e6" }}
                />
              </View>
            )}
            ListEmptyComponent={
              <Text
                className="text-center font-UrbanistSemiBold text-2xl text-secondary"
                style={{ marginTop: 50 }}
              >
                No transactions found
              </Text>
            }
          />
        </View>
      )}
    </View>
  );
};

export default Transactionhistory;
