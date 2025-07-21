/* eslint-disable react/no-unescaped-entities */
import {
  FormattedTransaction,
  formatTransactions,
  icons,
  images,
} from "@/constants";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Constants from "expo-constants";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/lib/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const { theme } = useTheme();
  const transactionSections = formatTransactions();
  const [contactImage, setContactImage] = useState<string | null>(null);
  const [userBalance, setUserBalance] = useState('');

  const { isNewUser } = useLocalSearchParams();
  const isNewUserBool = isNewUser === "true";

  const user = {
    isNewUser: isNewUserBool,
    transactions: transactionSections,
  };  

  const getBalance = async() => {
    let userBalance1: any = await AsyncStorage.getItem('balance');
    setUserBalance(userBalance1)
  }
  
  useEffect(()=>{
    getBalance()
  }, [userBalance])

  const renderTransactionItem = ({ item }: { item: FormattedTransaction }) => (
    <View className="flex-row py-4 items-center">
      <View
        className={`rounded-full flex items-center justify-center ${
          theme === "dark" ? "bg-dark-secondary" : "bg-[#F6F8FA]"
        }`}
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
          <FontAwesome5
            name="user-alt"
            size={21}
            color={theme === "dark" ? "#A0A0A0" : "#9CA3AF"}
          />
        )}
      </View>
      <View className="flex-1 flex-col ml-5 gap-3">
        <View className="flex-row justify-between items-center">
          <Text
            className={`font-UrbanistSemiBold ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ fontSize: 19 }}
          >
            {item.name}
          </Text>
          <Text
            className={`font-UrbanistSemiBold ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
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
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 15 }}
          >
            {item.time}
          </Text>
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 14 }}
          >
            {item.category}
          </Text>
        </View>
      </View>
    </View>
  );

  const hasTransactions =
    user.transactions &&
    Array.isArray(user.transactions) &&
    user.transactions.some(
      (section) => section.data && section.data.length > 0
    );

  function formatBalance(amount: number): string {
    if (amount >= 1_000_000_000) {
      return (amount / 1_000_000_000).toFixed(2).replace(/\.00$/, "") + "B";
    }
    if (amount >= 1_000_000) {
      return (amount / 1_000_000).toFixed(2).replace(/\.00$/, "") + "M";
    }
    // Format with commas for thousands
    return amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return (
    <View
      className={`flex-1 ${
        theme === "dark" ? "bg-dark-background" : "bg-white"
      }`}
    >
      <View
        style={{
          height: "52%",
          paddingTop: 70,
          backgroundColor: theme === "dark" ? "#23262F" : "#82E394",
        }}
        className="w-full p-5"
      >
        <View className="flex-row mt-2 justify-between">
          <Image
            source={theme === "dark" ? images.GreenLogo : images.BlackLogo}
            style={{ width: 60, height: 40 }}
          />
          <Text
            className={`font-UrbanistBold text-3xl ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ marginLeft: -14 }}
          >
            FinTra
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/(root)/(home)/notification");
            }}
          >
            <Image
              source={icons.bell}
              tintColor={theme === "dark" ? "#fff" : "#0D0D0D"}
              style={{ width: 28, height: 31, marginLeft: 7 }}
            />
          </TouchableOpacity>
        </View>
        <View
          className="flex items-center justify-center"
          style={{ marginTop: 50 }}
        >
          <View className="flex-row gap-2 justify-center">
            <FontAwesome6
              name="cedi-sign"
              size={20}
              color={theme === "dark" ? "#fff" : "#0D0D0D"}
              style={{ marginTop: 16 }}
            />
            <Text
              className={`font-UrbanistBold ${
                theme === "dark" ? "text-dark-primary" : "text-primary"
              }`}
              style={{ fontSize: 50 }}
            >
              {userBalance}
            </Text>
          </View>
          <Text
            className={`font-UrbanistMedium text-xl mt-2 ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
          >
            Available balance
          </Text>
        </View>
        <View
          className="flex-row justify-between p-2"
          style={{ marginTop: 40 }}
        >
          <View className="flex items-center gap-2">
            <TouchableOpacity
              onPress={() => {
                router.push("/(root)/(home)/(send)/send-select-contact");
              }}
              className={`rounded-full border flex justify-center items-center ${
                theme === "dark" ? "border-dark-primary" : "border-[#0D0D0D]"
              }`}
              style={{
                width: 65,
                height: 65,
                borderWidth: 1,
              }}
            >
              <Image
                source={icons.send}
                tintColor={theme === "dark" ? "#fff" : "#0D0D0D"}
                style={{ width: 28, height: 28 }}
              />
            </TouchableOpacity>
            <Text
              className={`font-UrbanistSemiBold ${
                theme === "dark" ? "text-dark-primary" : "text-primary"
              }`}
              style={{ fontSize: 16 }}
            >
              Send
            </Text>
          </View>
          <View className="flex items-center gap-2">
            <TouchableOpacity
              onPress={() => {
                router.push(
                  "/(root)/(home)/(request)/request-select-contact"
                );
              }}
              className={`rounded-full flex justify-center items-center ${
                theme === "dark" ? "border-dark-primary" : "border-[#0D0D0D]"
              }`}
              style={{
                width: 65,
                height: 65,
                borderWidth: 1,
              }}
            >
              <Image
                source={icons.down}
                tintColor={theme === "dark" ? "#fff" : "#0D0D0D"}
                style={{ width: 28, height: 28 }}
              />
            </TouchableOpacity>
            <Text
              className={`font-UrbanistSemiBold ${
                theme === "dark" ? "text-dark-primary" : "text-primary"
              }`}
              style={{ fontSize: 16 }}
            >
              Request
            </Text>
          </View>
          <View className="flex items-center gap-2">
            <TouchableOpacity
              onPress={() => {
                router.push("/(root)/(home)/(top-up)/topUp-enter-amount");
              }}
              className={`rounded-full border flex justify-center items-center ${
                theme === "dark" ? "border-dark-primary" : "border-[#0D0D0D]"
              }`}
              style={{
                width: 65,
                height: 65,
                borderWidth: 1,
              }}
            >
              <Image
                source={icons.topUp}
                tintColor={theme === "dark" ? "#fff" : "#0D0D0D"}
                style={{ width: 28, height: 28 }}
              />
            </TouchableOpacity>
            <Text
              className={`font-UrbanistSemiBold ${
                theme === "dark" ? "text-dark-primary" : "text-primary"
              }`}
              style={{ fontSize: 16 }}
            >
              Top Up
            </Text>
          </View>
          <View className="flex items-center gap-2">
            <TouchableOpacity
              onPress={() => {
                router.push(
                  "/(root)/(home)/(withdraw)/withdraw-enter-amount"
                );
              }}
              className={`rounded-full border flex justify-center items-center ${
                theme === "dark" ? "border-dark-primary" : "border-[#0D0D0D]"
              }`}
              style={{
                width: 65,
                height: 65,
                borderWidth: 1,
              }}
            >
              <Ionicons
                name="log-out-outline"
                size={32}
                color={theme === "dark" ? "#fff" : "#0D0D0D"}
                style={{ marginLeft: 5 }}
              />
            </TouchableOpacity>
            <Text
              className={`font-UrbanistSemiBold ${
                theme === "dark" ? "text-dark-primary" : "text-primary"
              }`}
              style={{ fontSize: 16 }}
            >
              Withdraw
            </Text>
          </View>
        </View>
      </View>

      {/* Include conditional rendering for transactions */}
      <View
        className={`flex-1 ${
          theme === "dark" ? "bg-dark-background" : "bg-white"
        }`}
        style={{ paddingTop: 24, paddingHorizontal: 16 }}
      >
        <View className="flex-row justify-between items-center">
          <Text
            className={`font-UrbanistBold text-2xl ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
          >
            Transaction History
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname:
                  "/(root)/(home)/(transaction-history)/transaction-history",
                params: { isNewUser: isNewUserBool ? "true" : "false" },
              });
            }}
            className="flex-row gap-2 items-center"
          >
            <Text
              className={`font-UrbanistSemiBold text-xl ${
                theme === "dark" ? "text-dark-secondary" : "text-[#9CA3AF]"
              }`}
            >
              View All
            </Text>
            <MaterialCommunityIcons
              name="greater-than"
              size={20}
              color={theme === "dark" ? "#A0A0A0" : "#9CA3AF"}
            />
          </TouchableOpacity>
        </View>
        {isNewUserBool || !hasTransactions ? (
          <>
            <View
              style={{ marginTop: 50, marginRight: 50 }}
              className="flex justify-center items-center"
            >
              <Image
                source={images.clipboard}
                style={{
                  width: 170,
                  height: 170,
                  marginTop: -30,
                  transform: [{ rotate: "-20deg" }],
                }}
              />
              <Image
                source={images.clipboard}
                style={{
                  width: 170,
                  height: 170,
                  position: "absolute",
                  right: 20,
                }}
              />
            </View>
            <View className="flex items-center gap-4" style={{ marginTop: 24 }}>
              <Text
                className={`font-UrbanistBold ${
                  theme === "dark" ? "text-dark-primary" : "text-primary"
                }`}
                style={{ fontSize: 24 }}
              >
                No Transactions
              </Text>
              <Text
                className={`font-UrbanistMedium text-xl ${
                  theme === "dark" ? "text-dark-secondary" : "text-secondary"
                }`}
              >
                You haven't made any transactions.
              </Text>
            </View>
          </>
        ) : (
          <View style={{ paddingBottom: 28 }}>
            <FlatList
              data={transactionSections}
              keyExtractor={(item) => item.sectionTitle}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: section }) => (
                <View>
                  <View
                    className="flex-row px-2 items-center gap-4"
                    style={{ marginTop: 20 }}
                  >
                    <Text
                      className={`font-UrbanistSemiBold text-xl ${
                        theme === "dark" ? "text-dark-secondary" : "text-[#8f949b]"
                      }`}
                    >
                      {section.sectionTitle}
                    </Text>
                    <View
                      className="h-[1px]"
                      style={{
                        width: "90%",
                        backgroundColor: theme === "dark" ? "#444" : "#e6e6e6",
                      }}
                    />
                  </View>
                  <FlatList
                    data={section.data}
                    keyExtractor={(item) => item.id}
                    renderItem={renderTransactionItem}
                    ItemSeparatorComponent={() => (
                      <View className="flex items-end">
                        <View
                          className="h-[1px]"
                          style={{
                            width: "75%",
                            backgroundColor: theme === "dark" ? "#444" : "#e6e6e6",
                          }}
                        />
                      </View>
                    )}
                  />
                </View>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Home;