import { formatTransactions, images } from "@/constants";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import * as MediaLibrary from "expo-media-library";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { captureScreen } from "react-native-view-shot";
import { JSX } from "react/jsx-runtime";

export default function receipt(): JSX.Element {
  const { id } = useLocalSearchParams(); // Get the id from the URL
  const transactions = formatTransactions().flatMap((section) => section.data);
  const transaction = transactions.find((t) => t.id === id);

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

  return (
    <View className="flex-1 bg-white">
      <View style={{ paddingTop: 44 }} className="px-5">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => {
              router.back();
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
            style={{ fontSize: 25, marginLeft: 20 }}
          >
            Receipt
          </Text>
          <View className="flex-row gap-6">
            <TouchableOpacity onPress={handleShare}>
              <Octicons name="share-android" size={24} color="#0D0D0D" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDownload}>
              <Feather name="download" size={24} color="#0D0D0D" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        className="flex-1"
        style={{ borderWidth: 20, borderColor: "#181A20", marginTop: 24 }}
      >
        <View className="flex-row items-center justify-center gap-2 mt-4">
          <Image source={images.BlackLogo} style={{ width: 50, height: 60 }} />
          <Text className="font-UrbanistBold" style={{ fontSize: 24 }}>
            FinTra
          </Text>
        </View>
        <View
          className="h-[1px] self-center"
          style={{ width: "90%", backgroundColor: "#e6e6e6", marginTop: 12 }}
        />
        <View
          className="bg-[#F6F8FA] items-center justify-center gap-5 self-center mt-7 rounded-lg"
          style={{ width: "90%", height: "20%" }}
        >
          <Text className="text-secondary text-xl font-UrbanistMedium">
            {transaction?.category}
          </Text>
          <Text
            className="font-UrbanistBold text-primary"
            style={{ fontSize: 34 }}
          >
            {`₵ ${Number(transaction?.amount).toFixed(2)} GHC`}
          </Text>
        </View>
        <View className="flex-row">
          <View className="flex-1 mt-3 px-4">
            <Row label="Sender" value={transaction?.name} />
            <Row label="Email" value={transaction?.email} />
            <View
              className="h-[1px] self-center"
              style={{
                width: "100%",
                backgroundColor: "#e6e6e6",
              }}
            />
            <Row label="Recipient" value={transaction?.name} />
            <Row label="Email" value={transaction?.email} />
            <View
              className="h-[1px] self-center"
              style={{
                width: "100%",
                backgroundColor: "#e6e6e6",
              }}
            />
            <Row
              label={
                transaction?.status === "Declined"
                  ? "Amount Declined"
                  : "Amount Sent"
              }
              value={`₵ ${Number(transaction?.amount).toFixed(2)}`}
            />
            <Row label="Date" value={transaction?.date} />
            <Row label="Transaction ID" value={transaction?.transactionId} />
            <Row label="Reference ID" value={transaction?.referenceId} />
            <View
              className="h-[1px] self-center"
              style={{
                width: "100%",
                backgroundColor: "#e6e6e6",
              }}
            />
          </View>
        </View>
        <View className="flex-1 justify-center items-center">
          <Text className="text-secondary text-lg font-UrbanistMedium">
            This receipt is proof of a valid transaction
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({});

function Row({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) {
  return (
    <View className="flex-row justify-between items-center my-3">
      <Text className="font-UrbanistMedium text-secondary text-xl">
        {label}
      </Text>
      <Text className="font-UrbanistBold text-xl text-primary">{value}</Text>
    </View>
  );
}
