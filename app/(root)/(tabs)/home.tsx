/* eslint-disable react/no-unescaped-entities */
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";

import { useTheme } from "@/lib/ThemeContext";
import { wp, hp, rf, rs, getSafeAreaPadding, isSmallScreen, isLargeScreen, getIconSize } from "@/lib/responsive";

// --- Minimal icons/images placeholders (replace with your actual assets) ---
const icons = {
  bell: require("../../../assets/icons/notification-bell.png"), // replace with your actual icon
  send: require("../../../assets/icons/send.png"),
  down: require("../../../assets/icons/down.png"),
  topUp: require("../../../assets/icons/topUp.png"),
};

const images = {
  GreenLogo: require("../../../assets/images/GreenLogo.png"),
  BlackLogo: require("../../../assets/images/BlackLogo.png"),
  clipboard: require("../../../assets/images/clipboard.png"),
};

type Transaction = {
  id: number;
  reference: string;
  userId: number;
  type: string;
  amount: number;
  status: string;
  createdAt: string;
};

// Format date or time as you want
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function formatTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

const Home = () => {
  const { theme } = useTheme();
  const [userBalance, setUserBalance] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const safeArea = getSafeAreaPadding();
  const iconSizes = getIconSize();

  const { isNewUser } = useLocalSearchParams();
  const isNewUserBool = isNewUser === "true";

  // Load balance from AsyncStorage on screen focus
  useFocusEffect(
    useCallback(() => {
      const getBalance = async () => {
        const storedBalance = await AsyncStorage.getItem("balance");
        if (storedBalance) {
          setUserBalance(storedBalance);
        }
      };
      getBalance();
    }, [])
  );

  // Fetch transactions on mount and filter to success only
  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem("userId");

        if (!token || !userId) return;

        const response = await fetch(
          `https://fintra-1.onrender.com/api/transactions/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data: Transaction[] = await response.json();

        // Filter to only successful transactions
        const successTransactions = data
          .filter((tx) => tx.status === "SUCCESS")
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 10); 
        setTransactions(successTransactions);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };

    fetchTransactionDetails();
  }, []);

  // Group transactions by date (simple example)
  const groupedTransactions = transactions.reduce<Record<string, Transaction[]>>(
    (acc, tx) => {
      const date = formatDate(tx.createdAt);
      if (!acc[date]) acc[date] = [];
      acc[date].push(tx);
      return acc;
    },
    {}
  );

  // Prepare sections for FlatList with section headers
  const sections = Object.entries(groupedTransactions).map(([date, data]) => ({
    sectionTitle: date,
    data,
  }));

  const hasTransactions = transactions.length > 0;

  const renderTransactionItem = ({ item }: { item: Transaction }) => (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 16,
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: theme === "dark" ? "#444" : "#F6F8FA",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FontAwesome5
          name="user-alt"
          size={21}
          color={theme === "dark" ? "#A0A0A0" : "#9CA3AF"}
        />
      </View>

      <View style={{ flex: 1, marginLeft: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              color: theme === "dark" ? "#fff" : "#000",
              fontSize: 18,
            }}
          >
            {item.type.charAt(0) + item.type.slice(1).toLowerCase()}
          </Text>

          <Text
            style={{
              fontWeight: "600",
              color: item.type === "TOPUP" ? "green" : "red",
              fontSize: 18,
            }}
          >
            {item.type === "TOPUP" ? "+" : "-"}₵ {item.amount.toFixed(2)}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 6,
          }}
        >
          <Text
            style={{
              color: theme === "dark" ? "#AAA" : "#666",
              fontSize: 14,
            }}
          >
            {formatTime(item.createdAt)}
          </Text>
          <Text
            style={{
              color: theme === "dark" ? "#AAA" : "#666",
              fontSize: 14,
            }}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme === "dark" ? "#23262F" : "#82E394" }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: theme === "dark" ? "#121212" : "#fff",
        }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Section with balance and actions */}
        <View
          style={{
            paddingTop: safeArea.top,
            backgroundColor: theme === "dark" ? "#23262F" : "#82E394",
            paddingHorizontal: wp(5),
            paddingBottom: hp(4),
            minHeight: hp(55),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: hp(3),
            }}
          >
            <Image
              source={theme === "dark" ? images.GreenLogo : images.BlackLogo}
              style={{ width: wp(16), height: hp(5) }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontWeight: "700",
                fontSize: rf(28),
                color: theme === "dark" ? "#fff" : "#000",
                flex: 1,
                textAlign: "center",
              }}
            >
              FinTra
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(root)/(home)/notification")}
              style={{
                padding: rs(8),
                borderRadius: rs(20),
              }}
            >
              <Image
                source={icons.bell}
                style={{
                  width: iconSizes.medium,
                  height: iconSizes.medium,
                  tintColor: theme === "dark" ? "#fff" : "#000",
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginVertical: hp(2),
            }}
          >
            <View style={{ 
              flexDirection: "row", 
              alignItems: "center", 
              gap: rs(6),
              marginBottom: hp(1),
            }}>
              <FontAwesome6
                name="cedi-sign"
                size={rf(isSmallScreen() ? 18 : 22)}
                color={theme === "dark" ? "#fff" : "#000"}
              />
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: rf(isSmallScreen() ? 36 : isLargeScreen() ? 54 : 48),
                  color: theme === "dark" ? "#fff" : "#000",
                }}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {userBalance || "₵ 0.00"}
              </Text>
            </View>

            <Text
              style={{
                fontWeight: "500",
                fontSize: rf(16),
                color: theme === "dark" ? "#ccc" : "#222",
                textAlign: "center",
              }}
            >
              Available balance
            </Text>
          </View>

          {/* Quick actions */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: hp(3),
              paddingHorizontal: wp(2),
            }}
          >
            {/* Send */}
            <View style={{ alignItems: "center", flex: 1 }}>
              <TouchableOpacity
                onPress={() =>
                  router.push("/(root)/(home)/(send)/send-select-contact")
                }
                style={{
                  width: wp(isSmallScreen() ? 14 : 16),
                  height: wp(isSmallScreen() ? 14 : 16),
                  borderRadius: wp(isSmallScreen() ? 7 : 8),
                  borderWidth: rs(1),
                  borderColor: theme === "dark" ? "#fff" : "#000",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={icons.send}
                  style={{ 
                    width: iconSizes.medium, 
                    height: iconSizes.medium, 
                    tintColor: theme === "dark" ? "#fff" : "#000" 
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: hp(0.8),
                  fontWeight: "600",
                  color: theme === "dark" ? "#fff" : "#000",
                  fontSize: rf(14),
                  textAlign: "center",
                }}
              >
                Send
              </Text>
            </View>

            {/* Request */}
            <View style={{ alignItems: "center", flex: 1 }}>
              <TouchableOpacity
                onPress={() =>
                  router.push("/(root)/(contacts)/chat-screen")
                }
                style={{
                  width: wp(isSmallScreen() ? 14 : 16),
                  height: wp(isSmallScreen() ? 14 : 16),
                  borderRadius: wp(isSmallScreen() ? 7 : 8),
                  borderWidth: rs(1),
                  borderColor: theme === "dark" ? "#fff" : "#000",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={icons.down}
                  style={{ 
                    width: iconSizes.medium, 
                    height: iconSizes.medium, 
                    tintColor: theme === "dark" ? "#fff" : "#000" 
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: hp(0.8),
                  fontWeight: "600",
                  color: theme === "dark" ? "#fff" : "#000",
                  fontSize: rf(14),
                  textAlign: "center",
                }}
              >
                Request
              </Text>
            </View>

            {/* Top Up */}
            <View style={{ alignItems: "center", flex: 1 }}>
              <TouchableOpacity
                onPress={() =>
                  router.push("/(root)/(home)/(top-up)/topUp-enter-amount")
                }
                style={{
                  width: wp(isSmallScreen() ? 14 : 16),
                  height: wp(isSmallScreen() ? 14 : 16),
                  borderRadius: wp(isSmallScreen() ? 7 : 8),
                  borderWidth: rs(1),
                  borderColor: theme === "dark" ? "#fff" : "#000",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={icons.topUp}
                  style={{ 
                    width: iconSizes.medium, 
                    height: iconSizes.medium, 
                    tintColor: theme === "dark" ? "#fff" : "#000" 
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: hp(0.8),
                  fontWeight: "600",
                  color: theme === "dark" ? "#fff" : "#000",
                  fontSize: rf(14),
                  textAlign: "center",
                }}
              >
                Top Up
              </Text>
            </View>

            {/* Withdraw */}
            <View style={{ alignItems: "center", flex: 1 }}>
              <TouchableOpacity
                onPress={() =>
                  router.push("/(root)/(home)/(withdraw)/withdraw-enter-amount")
                }
                style={{
                  width: wp(isSmallScreen() ? 14 : 16),
                  height: wp(isSmallScreen() ? 14 : 16),
                  borderRadius: wp(isSmallScreen() ? 7 : 8),
                  borderWidth: rs(1),
                  borderColor: theme === "dark" ? "#fff" : "#000",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="log-out-outline"
                  size={iconSizes.large}
                  color={theme === "dark" ? "#fff" : "#000"}
                />
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: hp(0.8),
                  fontWeight: "600",
                  color: theme === "dark" ? "#fff" : "#000",
                  fontSize: rf(14),
                  textAlign: "center",
                }}
              >
                Withdraw
              </Text>
            </View>
          </View>
        </View>
      </View>

        {/* Transaction History */}
        <View
          style={{
            backgroundColor: theme === "dark" ? "#121212" : "#fff",
            paddingTop: hp(3),
            paddingHorizontal: wp(4),
            flex: 1,
            minHeight: hp(45),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: hp(1.5),
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: rf(22),
                color: theme === "dark" ? "#fff" : "#000",
              }}
            >
              Transaction History
            </Text>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/(root)/(home)/(transaction-history)/transaction-history",
                  params: { isNewUser: isNewUserBool ? "true" : "false" },
                })
              }
              style={{ 
                flexDirection: "row", 
                alignItems: "center", 
                gap: rs(6),
                padding: rs(8),
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: rf(16),
                  color: theme === "dark" ? "#AAA" : "#888",
                }}
              >
                View All
              </Text>
              <MaterialCommunityIcons
                name="greater-than"
                size={iconSizes.small}
                color={theme === "dark" ? "#AAA" : "#888"}
              />
            </TouchableOpacity>
          </View>

        {!hasTransactions || isNewUserBool ? (
            <View
              style={{
                marginTop: hp(5),
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: wp(5),
              }}
            >
              <Image
                source={images.clipboard}
                style={{
                  width: wp(isSmallScreen() ? 35 : 40),
                  height: wp(isSmallScreen() ? 35 : 40),
                  marginBottom: hp(2),
                  transform: [{ rotate: "-20deg" }],
                }}
                resizeMode="contain"
              />
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: rf(22),
                    color: theme === "dark" ? "#fff" : "#000",
                    textAlign: "center",
                    marginBottom: hp(1),
                  }}
                >
                  No Transactions
                </Text>
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: rf(16),
                    color: theme === "dark" ? "#AAA" : "#666",
                    textAlign: "center",
                    lineHeight: rf(22),
                  }}
                >
                  You haven't made any transactions.
                </Text>
              </View>
            </View>
        ) : (
          <FlatList
            data={sections}
            keyExtractor={(item) => item.sectionTitle}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: section }) => (
              <View key={section.sectionTitle}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                    paddingHorizontal: 8,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 18,
                      color: theme === "dark" ? "#AAA" : "#555",
                    }}
                  >
                    {section.sectionTitle}
                  </Text>
                  <View
                    style={{
                      height: 1,
                      flex: 1,
                      marginLeft: 8,
                      backgroundColor: theme === "dark" ? "#444" : "#e6e6e6",
                    }}
                  />
                </View>

                <FlatList
                  data={section.data}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderTransactionItem}
                  ItemSeparatorComponent={() => (
                    <View
                      style={{
                        height: 1,
                        width: "75%",
                        alignSelf: "flex-end",
                        backgroundColor: theme === "dark" ? "#444" : "#e6e6e6",
                      }}
                    />
                  )}
                />
              </View>
            )}
          />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
