import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useTheme } from "@/lib/ThemeContext";
import {
  wp, hp, rf, rs,
  getSafeAreaPadding,
  isSmallScreen,
  isLargeScreen,
  getIconSize,
} from "@/lib/responsive";

// --- Assets ---
const icons = {
  bell: require("../../../assets/icons/notification-bell.png"),
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

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString(undefined, { month: "short", day: "numeric" });

const formatTime = (dateString: string) =>
  new Date(dateString).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

const Home = () => {
  const { theme } = useTheme();
  const safeArea = getSafeAreaPadding();
  const iconSizes = getIconSize();
  const { isNewUser } = useLocalSearchParams();
  const isNewUserBool = isNewUser === "true";

  const [userBalance, setUserBalance] = useState<string>("₵ 0.00");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserBalance = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      if (!token || !userId) return;

      const res = await fetch(`https://fintra-1.onrender.com/api/users/id/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const balance = (data.balance / 100).toFixed(2);
      setUserBalance(`₵ ${balance}`);
      await AsyncStorage.setItem("balance", balance);
    } catch (err) {
      console.error("Balance fetch failed", err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      if (!token || !userId) return;

      const res = await fetch(
        `https://fintra-1.onrender.com/api/transactions/user/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data: Transaction[] = await res.json();
      const success = data
        .filter((tx) => tx.status === "SUCCESS")
        .map((tx) => ({ ...tx, amount: tx.amount / 100 }))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      setTransactions(success);
    } catch (err) {
      console.error("Transaction fetch failed", err);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchUserBalance(), fetchTransactions()]);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchUserBalance();
    fetchTransactions();
  }, []);

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View
      style={{
        flexDirection: "row",
        padding: 16,
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: wp(15),
          height: wp(15),
          borderRadius: wp(7.5),
          backgroundColor: theme === "dark" ? "#444" : "#F6F8FA",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FontAwesome5
          name="user-alt"
          size={iconSizes.medium}
          color={theme === "dark" ? "#A0A0A0" : "#9CA3AF"}
        />
      </View>

      <View style={{ flex: 1, marginLeft: wp(5) }}>
  {/* Top Row: Type and Amount */}
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    {/* Transaction Type */}
    <Text
      style={{
        fontWeight: "600",
        fontSize: rf(18),
        color:
          item.type === "TOPUP" || item.type === "INCOME"
            ? "#22c55e" // Green for topups/income
            : theme === "dark"
            ? "#fff"
            : "#000", // Fallback for others
      }}
    >
      {(item.type.charAt(0) + item.type.slice(1).toLowerCase())}
    </Text>

    {/* Amount */}
    <Text
      style={{
        fontWeight: "600",
        fontSize: rf(18),
        color:
          item.type === "TOPUP" || item.type === "INCOME"
            ? "#22c55e" // Green
            : "#ef4444", // Red for debits
      }}
    >
      {item.type === "TOPUP" || item.type === "INCOME" ? "+" : "-"}₵{" "}
      {item.amount.toFixed(2)}
    </Text>
  </View>

  {/* Bottom Row: Date and Status */}
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: hp(0.5),
    }}
  >
    <Text
      style={{
        color: theme === "dark" ? "#AAA" : "#666",
        fontSize: rf(14),
      }}
    >
      {formatTime(item.createdAt)}
    </Text>
    <Text
      style={{
        color: theme === "dark" ? "#AAA" : "#666",
        fontSize: rf(14),
      }}
    >
      {item.status}
    </Text>
  </View>
</View>

    </View>
  );

  const Header = () => (
    <View
      style={{
        paddingTop: safeArea.top,
        paddingBottom: hp(4),
        paddingHorizontal: wp(5),
        backgroundColor: theme === "dark" ? "#82E394" : "#82E394",
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Image
          source={theme === "dark" ? images.GreenLogo : images.BlackLogo}
          style={{ width: wp(16), height: hp(5) }}
          resizeMode="contain"
        />
        <Text style={{ fontWeight: "700", fontSize: rf(28), flex: 1, textAlign: "center", color: theme === "dark" ? "#fff" : "#000" }}>
          FinTra
        </Text>
        <TouchableOpacity onPress={() => router.push("/(root)/(home)/notification")}>
          <Image
            source={icons.bell}
            style={{ width: iconSizes.medium, height: iconSizes.medium, tintColor: theme === "dark" ? "#fff" : "#000" }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "center", marginTop: hp(2) }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: rs(6) }}>
          {/* <FontAwesome6 name="cedi-sign" size={rf(22)} color={theme === "dark" ? "#fff" : "#000"} /> */}
          <Text style={{ fontWeight: "700", fontSize: rf(40), color: theme === "dark" ? "#fff" : "#000" }}>
            {userBalance}
          </Text>
        </View>
        <Text style={{ color: theme === "dark" ? "#ccc" : "#333", fontWeight: "500", fontSize: rf(16) }}>
          Available balance
        </Text>
      </View>

      {/* Quick actions */}
      <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: hp(3) }}>
        {[
          { label: "Send", icon: icons.send, route: "/(root)/(home)/(send)/send-select-contact" },
          { label: "Request", icon: icons.down, route: "/(root)/(tabs)/contacts" },
          { label: "Top Up", icon: icons.topUp, route: "/(root)/(home)/(top-up)/topUp-enter-amount" },
          { label: "Withdraw", icon: null, route: "/(root)/(home)/(withdraw)/withdraw-enter-amount" },
        ].map((action, index) => (
          <View key={index} style={{ alignItems: "center", flex: 1 }}>
            <TouchableOpacity
              onPress={() => router.push(action.route)}
              style={{
                width: wp(14),
                height: wp(14),
                borderRadius: wp(7),
                borderWidth: rs(1),
                borderColor: theme === "dark" ? "#fff" : "#000",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {action.icon ? (
                <Image source={action.icon} style={{ width: iconSizes.medium, height: iconSizes.medium, tintColor: theme === "dark" ? "#fff" : "#000" }} />
              ) : (
                <Ionicons name="log-out-outline" size={iconSizes.large} color={theme === "dark" ? "#fff" : "#000"} />
              )}
            </TouchableOpacity>
            <Text style={{ marginTop: hp(0.8), fontWeight: "600", fontSize: rf(14), color: theme === "dark" ? "#fff" : "#000" }}>
              {action.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Transaction Title */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: hp(4), alignItems: "center" }}>
        <Text style={{ fontWeight: "700", fontSize: rf(22), color: theme === "dark" ? "#fff" : "#000" }}>
          Transaction History
        </Text>
        <TouchableOpacity
          onPress={() => router.push({ pathname: "/(root)/(home)/(transaction-history)/transaction-history", params: { isNewUser: isNewUserBool ? "true" : "false" } })}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ fontSize: rf(16), color: theme === "dark" ? "#AAA" : "#888" }}>View All</Text>
          <MaterialCommunityIcons name="greater-than" size={iconSizes.small} color={theme === "dark" ? "#AAA" : "#888"} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme === "dark" ? "#121212" : "#fff" }}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTransaction}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: theme === "dark" ? "#333" : "#ccc", marginLeft: wp(20) }} />}
        ListHeaderComponent={<Header />}
        ListEmptyComponent={
          <View style={{ alignItems: "center", marginTop: hp(10) }}>
            <Image source={images.clipboard} style={{ width: wp(35), height: wp(35), marginBottom: hp(2), transform: [{ rotate: "-20deg" }] }} />
            <Text style={{ fontWeight: "700", fontSize: rf(22), color: theme === "dark" ? "#fff" : "#000" }}>
              No Transactions
            </Text>
            <Text style={{ fontSize: rf(16), color: theme === "dark" ? "#AAA" : "#666", textAlign: "center" }}>
              You haven't made any transactions.
            </Text>
          </View>
        }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingBottom: hp(10) }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Home;
