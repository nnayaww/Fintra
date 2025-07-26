/* eslint-disable @typescript-eslint/no-unused-vars */
import { formatDate, formatTransactions } from "@/constants";
import { useTheme } from "@/lib/ThemeContext";
import { wp, hp, rf, rs, getSafeAreaPadding, getIconSize } from "@/lib/responsive";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as MediaLibrary from "expo-media-library";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Share, Text, TouchableOpacity, View } from "react-native";
import { captureScreen } from "react-native-view-shot";

const SendMoneySent = () => {
  const { theme } = useTheme();
  const safeArea = getSafeAreaPadding();
  const iconSizes = getIconSize();
  const { id, amount, name, email, notes, reference, createdAt, status, avatar } = useLocalSearchParams();

  // const { id, type } = useLocalSearchParams(); // Get the id from the URL
  const transactions = formatTransactions().flatMap((section) => section.data);
  const transaction = transactions.find((t) => t.id === id);

  // const { amount, name, email, avatar, notes } = useLocalSearchParams();
  const displayName = Array.isArray(name) ? name[0] : name;
  const displayEmail = Array.isArray(email) ? email[0] : email;
  const displayAmount = Array.isArray(amount) ? amount[0] : amount;
  const displayNotes = Array.isArray(notes) ? notes[0] : notes;
  const parsedAvatar =
    typeof avatar === "string" && avatar.startsWith("http")
      ? { uri: avatar } // Remote image URL
      : require("@/assets/images/nature.jpg");

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
    <View 
      className={`flex-1 ${theme === 'dark' ? 'bg-dark-background' : 'bg-white'}`} 
      style={{ 
        paddingTop: safeArea.top + hp(2),
        paddingHorizontal: wp(2)
      }}
    >
      <View
        className="flex-row justify-between items-center"
        style={{ marginTop: hp(2.5) }}
      >
        <TouchableOpacity
          onPress={() => {
            router.push("/(root)/(tabs)/home");
          }}
        >
          <AntDesign
            name="close"
            size={iconSizes.large}
            color={theme === 'dark' ? '#fff' : '#0D0D0D'}
            style={{ paddingHorizontal: wp(3.5) }}
          />
        </TouchableOpacity>
      </View>
      <View className="flex items-center" style={{ gap: hp(2.5), marginTop: hp(3) }}>
        <View
          style={{
            width: wp(20),
            height: wp(20),
            backgroundColor: "#82E394",
            borderStyle: "solid",
            borderWidth: rs(2),
            borderColor: theme === 'dark' ? '#fff' : '#0D0D0D',
          }}
          className="rounded-full border flex items-center justify-center"
        >
          <FontAwesome6 name="check" size={iconSizes.large} color={theme === 'dark' ? '#fff' : '#0D0D0D'} />
        </View>
        <View className="flex-row justify-center" style={{ gap: wp(2) }}>
          <Text
            className={`font-UrbanistBold ${theme === 'dark' ? 'text-white' : 'text-primary'}`}
            style={{ fontSize: rf(40) }}
          >
            {`₵ ${formatBalance(
              Number((Array.isArray(amount) ? amount[0] : amount)) / 100
            )}`}
          </Text>
        </View>
        <View className="flex items-center" style={{ gap: hp(1.5) }}>
          <Text
            className={`font-UrbanistMedium ${theme === 'dark' ? 'text-gray-300' : 'text-secondary'}`}
            style={{ fontSize: rf(17) }}
          >
            Sent to {displayName}
          </Text>
          <Text
            className={`font-UrbanistMedium ${theme === 'dark' ? 'text-gray-300' : 'text-secondary'}`}
            style={{ fontSize: rf(17) }}
          >
            {displayEmail}
          </Text>
        </View>
      </View>
      <View style={{ padding: wp(4), marginTop: hp(1) }}>
        <View
          className={`flex rounded-lg ${
            theme === 'dark' ? 'bg-[#23262F]' : 'bg-[#F6F8FA]'
          }`}
          style={{ 
            borderWidth: rs(2), 
            borderColor: theme === 'dark' ? '#444' : '#ebedf0'
          }}
        >
          <Row
            label="You sent"
            value={`₵ ${formatBalance(Number(Math.round(parseFloat(displayAmount) / 100).toString()))}`}
          />
          {/* <Row
  label="Date"
  value={
    (() => {
      const rawDate = Array.isArray(createdAt) ? createdAt[0] : createdAt;
      const parsed = new Date(rawDate);
      return isNaN(parsed.getTime()) ? "N/A" : formatDate(parsed);
    })()
  }
/>

          <Row label="Transaction ID" value={Array.isArray(id) ? id[0] : id} />
          <Row label="Reference ID" value={Array.isArray(reference) ? reference[0] : reference} /> */}
          <Row label="Status" value={Array.isArray(status) ? status[0] : status} />
          <View
            className="self-center"
            style={{ 
              height: rs(1), 
              width: "90%", 
              backgroundColor: theme === 'dark' ? '#444' : '#e6e6e6',
              marginTop: hp(1)
            }}
          />
          <View className="flex-col" style={{ paddingHorizontal: wp(6), marginVertical: hp(2) }}>
            <Text className={`font-UrbanistMedium ${theme === 'dark' ? 'text-gray-300' : 'text-secondary'}`} style={{ fontSize: rf(20) }}>
              Notes
            </Text>
            <Text className={`font-UrbanistBold ${theme === 'dark' ? 'text-white' : 'text-primary'}`} style={{ fontSize: rf(20), marginTop: hp(1.5) }}>
              {displayNotes}
            </Text>
          </View>
        </View>
      </View>
      <View
        className="flex-row items-center"
        style={{ 
          position: "absolute", 
          right: wp(5), 
          left: wp(5), 
          bottom: hp(6),
          gap: wp(4)
        }}
      >
        <TouchableOpacity
          onPress={handleDownload}
          className={`flex-1 items-center justify-center border-[1.5px] border-general rounded-full ${
            theme === 'dark' ? 'bg-dark-background' : 'bg-white'
          }`}
          style={{ paddingVertical: hp(2) }}
        >
          <Text className={`font-UrbanistSemiBold ${theme === 'dark' ? 'text-white' : 'text-primary'}`} style={{ fontSize: rf(20) }}>
            Download
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleShare}
          className="bg-general flex-1 items-center justify-center border-none rounded-full"
          style={{ paddingVertical: hp(2) }}
        >
          <Text className={`font-UrbanistSemiBold ${theme === 'dark' ? 'text-white' : 'text-primary'}`} style={{ fontSize: rf(20) }}>
            Share
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SendMoneySent;

function Row({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) {
  const { theme } = useTheme();
  
  return (
    <View className="flex-row justify-between items-center" style={{ paddingHorizontal: wp(6), marginVertical: hp(1.5) }}>
      <Text className={`font-UrbanistMedium ${theme === 'dark' ? 'text-gray-300' : 'text-secondary'}`} style={{ fontSize: rf(20) }}>
        {label}
      </Text>
      {label === "Status" && value === "Paid" ? (
        <View className="bg-general rounded-md" style={{ padding: wp(3) }}>
          <Text className={`font-UrbanistBold ${theme === 'dark' ? 'text-white' : 'text-primary'}`} style={{ fontSize: rf(20) }}>
            {value}
          </Text>
        </View>
      ) : label === "Status" && value === "Declined" ? (
        <View className="bg-[#f54f4f] rounded-md" style={{ padding: wp(3) }}>
          <Text className="font-UrbanistBold text-white" style={{ fontSize: rf(20) }}>{value}</Text>
        </View>
      ) : (
        <Text className={`font-UrbanistBold ${theme === 'dark' ? 'text-white' : 'text-primary'}`} style={{ fontSize: rf(20) }}>{value}</Text>
      )}
    </View>
  );
}
