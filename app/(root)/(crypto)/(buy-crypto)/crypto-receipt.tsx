import { formatDate } from "@/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as MediaLibrary from "expo-media-library";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Share, Text, TouchableOpacity, View } from "react-native";
import { captureScreen } from "react-native-view-shot";

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
    <View className="flex-1 bg-white p-2" style={{ paddingTop: 30 }}>
      <View
        className="flex-row justify-between items-center"
        style={{ marginTop: 20 }}
      >
        <TouchableOpacity
          onPress={() => {
            router.push("/(root)/(tabs)/crypto");
          }}
        >
          <AntDesign
            name="close"
            size={30}
            color="#0D0D0D"
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
            borderColor: "#0D0D0D",
          }}
          className="rounded-full border flex items-center justify-center"
        >
          <FontAwesome6 name="check" size={34} color="#0D0D0D" />
        </View>
        <View className="flex-row gap-2 justify-center">
          <Text
            className="font-UrbanistBold text-primary"
            style={{ fontSize: 40 }}
          >
            {`₵ ${displayNewCryptoBalance}`}
          </Text>
        </View>
        <View className="flex gap-3 items-center">
          <Text
            className="font-UrbanistMedium text-secondary"
            style={{ fontSize: 17 }}
          >
            You topped up to Crypto Balance
          </Text>
          <Text
            className="font-UrbanistMedium text-secondary"
            style={{ fontSize: 17 }}
          >
            {`₵${formatBalance(displayAmount)}`} deducted from FinTra Balance
          </Text>
          <Text
            className="font-UrbanistMedium text-secondary"
            style={{ fontSize: 17 }}
          >
            Oppong Agyeman
          </Text>
        </View>
        {/* //username here */}
      </View>
      <View className="p-4 mt-2">
        <View
          className="flex bg-[#F6F8FA] rounded-lg"
          style={{ borderWidth: 2, borderColor: "#ebedf0" }}
        >
          <Row label="You bought" value={displayCalcAmount} />
          <Row label="Coin" value={displayName} />
          <Row
            label="Current Coin Price"
            value={`$${formatBalance(displayPrice)}`}
          />
          <Row
            label="Amount Entered"
            value={`₵${formatBalance(displayAmount)}`}
          />
          <Row label="Date" value={formatDate(new Date())} />
          <Row label="Transaction ID" value={""} />
          <Row label="Reference ID" value={""} />
        </View>
      </View>
      <View
        className="flex-row gap-4 items-center"
        style={{ position: "absolute", right: 20, left: 20, bottom: 46 }}
      >
        <TouchableOpacity
          onPress={handleDownload}
          className="bg-white flex-1 items-center justify-center p-5 border-[1.5px] border-general rounded-full"
        >
          <Text className="font-UrbanistSemiBold text-xl text-primary">
            Download
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleShare}
          className="bg-general flex-1 items-center justify-center p-5 border-none rounded-full"
        >
          <Text className="font-UrbanistSemiBold text-xl text-primary">
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
}: {
  label: string;
  value: string | number | undefined;
}) {
  return (
    <View className="flex-row justify-between items-center px-6 my-3">
      <Text className="font-UrbanistMedium text-secondary text-xl">
        {label}
      </Text>
      {label === "Status" && value === "Paid" ? (
        <View className="p-3 bg-general rounded-md">
          <Text className="font-UrbanistBold text-xl text-primary">
            {value}
          </Text>
        </View>
      ) : label === "Status" && value === "Declined" ? (
        <View className="p-3 bg-[#f54f4f] rounded-md">
          <Text className="font-UrbanistBold text-xl text-white">{value}</Text>
        </View>
      ) : (
        <Text className="font-UrbanistBold text-xl text-primary">{value}</Text>
      )}
    </View>
  );
}
