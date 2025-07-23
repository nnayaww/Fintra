import { formatDate } from "@/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as MediaLibrary from "expo-media-library";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Share, Text, TouchableOpacity, View } from "react-native";
import { captureScreen } from "react-native-view-shot";
import { useTheme } from "@/lib/ThemeContext";

const CryptoReceipt = () => {
  const { amount, name, price, CalcAmount, symbol } = useLocalSearchParams();
  const displayCalcAmountNum = Number(
    Array.isArray(CalcAmount) ? CalcAmount[0] : CalcAmount
  );
  const displayAmount = Number(Array.isArray(amount) ? amount[0] : amount);
  const displayName = Array.isArray(name) ? name[0] : name;
  const displayPrice = Number(Array.isArray(price) ? price[0] : price);
  const displaySymbol = Array.isArray(symbol) ? symbol[0] : symbol;
  const dollarRate = 10.35;
  const displayCalcAmount =
    (Array.isArray(CalcAmount) ? CalcAmount[0] : CalcAmount) +
    " " +
    displaySymbol;
  const { theme } = useTheme();

  const handleShare = async () => {
    try {
      await Share.share({
        message: "Transaction Receipt",
        // If you want to share an image, you can use the 'url' property:
        url: "",
      });
    } catch (error) {
      // Optionally handle error
    }
  };

  const handleDownload = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required!");
        return;
      }

      // Capture the screen (without status bar)
      const uri = await captureScreen({
        format: "png",
        quality: 1,
        result: "tmpfile",
        // Optionally, you can add snapshotContentContainer: false
      });

      await MediaLibrary.saveToLibraryAsync(uri);
      alert("Receipt saved to your photos!");
    } catch (error) {
      alert("Failed to save receipt.");
    }
  };

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

  const displayNewCryptoBalance = formatBalance(
    displayCalcAmountNum * displayPrice * dollarRate
  );

  return (
    <View
      className={`flex-1 p-2 ${
        theme === "dark" ? "bg-dark-background" : "bg-white"
      }`}
      style={{ paddingTop: 30 }}
    >
      <View
        className="flex-row justify-between items-center"
        style={{ marginTop: 20 }}
      >
        <TouchableOpacity
          onPress={() => {
            router.push("/(root)/(tabs)/home");
          }}
        >
          <AntDesign
            name="close"
            size={30}
            color={theme === "dark" ? "#fff" : "#0D0D0D"}
            style={{ paddingHorizontal: 14 }}
          />
        </TouchableOpacity>
      </View>
      <View className="flex items-center gap-5" style={{ marginTop: 30 }}>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: "#82E394",
            borderStyle: "solid",
            borderWidth: 2,
            borderColor: theme === "dark" ? "#fff" : "#0D0D0D",
          }}
          className="rounded-full border flex items-center justify-center"
        >
          <FontAwesome6
            name="check"
            size={34}
            color={theme === "dark" ? "#fff" : "#0D0D0D"}
          />
        </View>
        <View className="flex-row gap-2 justify-center">
          <Text
            className={`font-UrbanistBold ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ fontSize: 40 }}
          >
            {`₵ ${displayNewCryptoBalance}`}
          </Text>
        </View>
        <View className="flex gap-3 items-center">
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 17 }}
          >
            You topped up to Crypto Balance
          </Text>
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 17 }}
          >
            {`₵${formatBalance(displayAmount)}`} deducted from FinTra Balance
          </Text>
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 17 }}
          >
            Oppong Agyeman
          </Text>
        </View>
        {/* //username here */}
      </View>
      <View className="p-4 mt-2">
        <View
          className={`flex rounded-lg ${
            theme === "dark" ? "bg-dark-secondary" : "bg-[#F6F8FA]"
          }`}
          style={{
            borderWidth: 2,
            borderColor: theme === "dark" ? "#444" : "#ebedf0",
          }}
        >
          <Row
            label="You bought"
            value={displayCalcAmount}
            theme={theme}
          />
          <Row label="Coin" value={displayName} theme={theme} />
          <Row
            label="Current Coin Price"
            value={`${formatBalance(displayPrice)}`}
            theme={theme}
          />
          <Row
            label="Amount Entered"
            value={`₵${formatBalance(displayAmount)}`}
            theme={theme}
          />
          <Row label="Date" value={formatDate(new Date())} theme={theme} />
          <Row label="Transaction ID" value={""} theme={theme} />
          <Row label="Reference ID" value={""} theme={theme} />
        </View>
      </View>
      <View
        className="flex-row gap-4 items-center"
        style={{ position: "absolute", right: 20, left: 20, bottom: 46 }}
      >
        <TouchableOpacity
          onPress={handleDownload}
          className={`flex-1 items-center justify-center p-5 border-[1.5px] border-general rounded-full ${
            theme === "dark" ? "bg-dark-background" : "bg-white"
          }`}
        >
          <Text
            className={`font-UrbanistSemiBold text-xl ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
          >
            Download
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleShare}
          className="bg-general flex-1 items-center justify-center p-5 border-none rounded-full"
        >
          <Text
            className={`font-UrbanistSemiBold text-xl ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
          >
            Share
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CryptoReceipt;

function Row({
  label,
  value,
  theme,
}: {
  label: string;
  value: string | number | undefined;
  theme: string;
}) {
  return (
    <View className="flex-row justify-between items-center px-6 my-3">
      <Text
        className={`font-UrbanistMedium text-xl ${
          theme === "dark" ? "text-dark-secondary" : "text-secondary"
        }`}
      >
        {label}
      </Text>
      {label === "Status" && value === "Paid" ? (
        <View className="p-3 bg-general rounded-md">
          <Text
            className={`font-UrbanistBold text-xl ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
          >
            {value}
          </Text>
        </View>
      ) : label === "Status" && (value === "Declined" || value === "Unpaid") ? (
        <View className="p-3 bg-[#f54f4f] rounded-md">
          <Text className="font-UrbanistBold text-xl text-white">{value}</Text>
        </View>
      ) : (
        <Text
          className={`font-UrbanistBold text-xl ${
            theme === "dark" ? "text-dark-primary" : "text-primary"
          }`}
        >
          {value}
        </Text>
      )}
    </View>
  );
}
