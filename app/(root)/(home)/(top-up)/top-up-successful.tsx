import { formatDate } from "@/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as MediaLibrary from "expo-media-library";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Share, Text, TouchableOpacity, View } from "react-native";
import { captureScreen } from "react-native-view-shot";

const TopUpSuccessful = () => {
  const { amount, methodName, methodNumber, notes } = useLocalSearchParams();
  const displayAmount = Array.isArray(amount) ? amount[0] : amount;
  const displayMethodName = Array.isArray(methodName)
    ? methodName[0]
    : methodName;
  const displayNotes = Array.isArray(notes) ? notes[0] : notes;
  const displayMethodNumber = Array.isArray(methodNumber)
    ? methodNumber[0]
    : methodNumber;

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

  return (
    <View className="flex-1 bg-white p-2" style={{ paddingTop: 30 }}>
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
            color="#0D0D0D"
            style={{ paddingHorizontal: 14 }}
          />
        </TouchableOpacity>
      </View>
      <View className="flex items-center gap-5 mt-6">
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
            {`₵ ${formatBalance(
              Number(Array.isArray(amount) ? amount[0] : amount)
            )}`}
          </Text>
        </View>
        <View className="flex gap-3 items-center">
          <Text
            className="font-UrbanistMedium text-secondary"
            style={{ fontSize: 17 }}
          >
            You topped up to FinTra Balance
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
          <Row
            label="You topped up"
            value={`₵ ${formatBalance(Number(displayAmount))}`}
          />
          <Row
            label="From"
            value={
              methodName === "Mastercard" || methodName === "Visa"
                ? displayMethodNumber
                : displayMethodName
            }
          />
          <Row
            label="Payment Method"
            value={
              methodName === "Visa"
                ? displayMethodName.toUpperCase()
                : displayMethodName
            }
          />
          <Row label="Date" value={formatDate(new Date())} />
          <Row label="Transaction ID" value={""} />
          <Row label="Reference ID" value={""} />
          <View
            className="h-[1px] self-center mt-2"
            style={{ width: "90%", backgroundColor: "#e6e6e6" }}
          />
          <View className="flex-col px-6 my-4">
            <Text className="font-UrbanistMedium text-secondary text-xl">
              Notes
            </Text>
            <Text className="font-UrbanistBold text-xl text-primary mt-3">
              {displayNotes}
            </Text>
          </View>
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

export default TopUpSuccessful;

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
