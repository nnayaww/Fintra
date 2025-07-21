import { formatDate } from "@/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as MediaLibrary from "expo-media-library";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Share, Text, TouchableOpacity, View } from "react-native";
import { captureScreen } from "react-native-view-shot";
import { useTheme } from "@/lib/ThemeContext";

const TopUpSuccessful = () => {
  const { amount, methodName, methodNumber, reference, status, date } = useLocalSearchParams();
  const displayAmount = Array.isArray(amount) ? amount[0] : amount;
  const displayMethodName = Array.isArray(methodName) ? methodName[0] : methodName;
  const displayMethodNumber = Array.isArray(methodNumber) ? methodNumber[0] : methodNumber;
  const displayReference = Array.isArray(reference) ? reference[0] : reference;
  const displayStatus = Array.isArray(status) ? status[0] : status;
  const displayDate = Array.isArray(date) ? date[0] : date;
  const { theme } = useTheme();

  const handleShare = async () => {
    try {
      await Share.share({ message: `Top-up Receipt\ nRef: ${displayReference}` });
    } catch {}
  };

  const handleDownload = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") return alert("Permission required!");
    const uri = await captureScreen({ format: "png", quality: 1, result: "tmpfile" });
    await MediaLibrary.saveToLibraryAsync(uri);
    alert("Saved!");
  };

  return (
    <View className={`flex-1 p-2 ${theme === "dark" ? "bg-dark-background" : "bg-white"}`} style={{ paddingTop: 30 }}>
      {/* Close */}
      <TouchableOpacity onPress={() => router.push("/(root)/(tabs)/home")}>
        <AntDesign name="close" size={30} color={theme === "dark" ? "#fff" : "#000"} />
      </TouchableOpacity>

      {/* Success */}
      <View className="flex items-center gap-5 mt-6">
        <View className="rounded-full w-20 h-20 bg-general items-center justify-center border-2">
          <FontAwesome6 name="check" size={34} color={theme === "dark" ? "#fff" : "#000"} />
        </View>
        <Text className={`font-UrbanistBold ${theme === "dark" ? "text-dark-primary" : "text-primary"} text-4xl`}>
          ₵ {Number(displayAmount).toFixed(2)}
        </Text>
        <Text className={`font-UrbanistMedium ${theme === "dark" ? "text-dark-secondary" : "text-secondary"} text-lg`}>
          Top-up successful
        </Text>
      </View>

      {/* Transaction Info */}
      <View className="p-4 mt-4 bg-[#F6F8FA] dark:bg-dark-secondary rounded-lg border border-[#ebedf0] dark:border-[#444]">
        <InfoRow label="Amount" value={`₵ ${Number(displayAmount).toFixed(2)}`} theme={theme} />
        <InfoRow label="Method" value={`${displayMethodName} ${displayMethodNumber || ""}`} theme={theme} />
        <InfoRow label="Reference" value={displayReference} theme={theme} />
        <InfoRow label="Status" value={displayStatus} theme={theme} />
        <InfoRow label="Date" value={formatDate(new Date(displayDate))} theme={theme} />
      </View>

      {/* Actions */}
      <View className="flex-row gap-4 absolute bottom-10 left-5 right-5">
        <TouchableOpacity onPress={handleDownload} className="flex-1 items-center p-4 border rounded-full bg-white dark:bg-dark-background">
          <Text className="font-UrbanistSemiBold">Download</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} className="flex-1 items-center p-4 rounded-full bg-general">
          <Text className="font-UrbanistSemiBold text-white">Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const InfoRow = ({ label, value, theme }: { label: string; value: string; theme: string }) => (
  <View className="flex-row justify-between my-2">
    <Text className={`font-UrbanistMedium ${theme === "dark" ? "text-dark-secondary" : "text-secondary"}`}>{label}</Text>
    <Text className={`font-UrbanistBold ${theme === "dark" ? "text-dark-primary" : "text-primary"}`}>{value}</Text>
  </View>
);

export default TopUpSuccessful;
