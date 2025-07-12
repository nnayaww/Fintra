import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Switch } from "react-native-switch";

const notificationSettings = () => {
  const [isTransactionEnabled, setIsTransactionEnabled] = useState(true);
  const [isFraudEnabled, setIsFraudEnabled] = useState(false);
  const [isPaymentNotificationsEnabled, setIsPaymentNotificationsEnabled] =
    useState(true);
  const [isCardActivityEnabled, setIsCardActivityEnabled] = useState(false);
  const [isCustomerSupportEnabled, setIsCustomerSupportEnabled] =
    useState(false);
  const [isAccountBalanceEnabled, setIsAccountBalanceEnabled] = useState(true);
  const [isSecurityAlertsEnabled, setIsSecurityAlertsEnabled] = useState(true);
  const [isSummaryEnabled, setIsSummaryEnabled] = useState(false);
  const [isUpdatesEnabled, setIsUpdatesEnabled] = useState(false);
  const [isPromotionEnabled, setIsPromotionEnabled] = useState(true);
  const [isSurveyEnabled, setIsSurveyEnabled] = useState(false);

  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex-row items-center mt-3">
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#0D0D0D"
            style={{ padding: 6, marginTop: 22 }}
          />
        </TouchableOpacity>
        <Text
          className="font-UrbanistBold text-3xl text-primary mt-5"
          style={{ marginHorizontal: 65 }}
        >
          Notification
        </Text>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          className="flex-row px-2 items-center gap-4"
          style={{ marginTop: 30 }}
        >
          <Text
            className="font-UrbanistSemiBold text-xl"
            style={{ color: "#8f949b" }}
          >
            General
          </Text>
          <View
            className="h-[1px]"
            style={{ width: "80%", backgroundColor: "#e6e6e6" }}
          />
        </View>
        <View className="flex p-2 mt-5" style={{ gap: 30 }}>
          <View className="flex-row justify-between items-center">
            <Text
              className="font-UrbanistSemiBold text-primary"
              style={{ fontSize: 19, width: "70%" }}
            >
              Transaction status updates
            </Text>
            <Switch
              value={isTransactionEnabled}
              onValueChange={setIsTransactionEnabled}
              disabled={false}
              circleSize={28} // Thumb size
              circleBorderWidth={0}
              barHeight={32} // Track height
              backgroundActive={"#82E394"}
              backgroundInactive={"#e6e6e6"}
              circleActiveColor={"#fff"}
              circleInActiveColor={"#fff"}
              changeValueImmediately={true}
              innerCircleStyle={{
                alignItems: "center",
                justifyContent: "center",
              }} // Custom thumb style
              renderActiveText={false}
              renderInActiveText={false}
            />
          </View>
          <View className="flex-row justify-between items-center">
            <Text
              className="font-UrbanistSemiBold text-primary"
              style={{ fontSize: 19, width: "70%", lineHeight: 26 }}
            >
              Fraud or suspicious security alerts
            </Text>
            <Switch
              value={isFraudEnabled}
              onValueChange={setIsFraudEnabled}
              disabled={false}
              circleSize={28} // Thumb size
              circleBorderWidth={0}
              barHeight={32} // Track height
              backgroundActive={"#82E394"}
              backgroundInactive={"#e6e6e6"}
              circleActiveColor={"#fff"}
              circleInActiveColor={"#fff"}
              changeValueImmediately={true}
              innerCircleStyle={{
                alignItems: "center",
                justifyContent: "center",
              }} // Custom thumb style
              renderActiveText={false}
              renderInActiveText={false}
            />
          </View>
          <View className="flex-row justify-between items-center">
            <Text
              className="font-UrbanistSemiBold text-primary"
              style={{ fontSize: 19, width: "70%", lineHeight: 26 }}
            >
              Payment request notifications
            </Text>
            <Switch
              value={isPaymentNotificationsEnabled}
              onValueChange={setIsPaymentNotificationsEnabled}
              disabled={false}
              circleSize={28} // Thumb size
              circleBorderWidth={0}
              barHeight={32} // Track height
              backgroundActive={"#82E394"}
              backgroundInactive={"#e6e6e6"}
              circleActiveColor={"#fff"}
              circleInActiveColor={"#fff"}
              changeValueImmediately={true}
              innerCircleStyle={{
                alignItems: "center",
                justifyContent: "center",
              }} // Custom thumb style
              renderActiveText={false}
              renderInActiveText={false}
            />
          </View>
          <View className="flex-row justify-between items-center">
            <Text
              className="font-UrbanistSemiBold text-primary"
              style={{ fontSize: 19, width: "70%" }}
            >
              Card activity notifications
            </Text>
            <Switch
              value={isCardActivityEnabled}
              onValueChange={setIsCardActivityEnabled}
              disabled={false}
              circleSize={28} // Thumb size
              circleBorderWidth={0}
              barHeight={32} // Track height
              backgroundActive={"#82E394"}
              backgroundInactive={"#e6e6e6"}
              circleActiveColor={"#fff"}
              circleInActiveColor={"#fff"}
              changeValueImmediately={true}
              innerCircleStyle={{
                alignItems: "center",
                justifyContent: "center",
              }} // Custom thumb style
              renderActiveText={false}
              renderInActiveText={false}
            />
          </View>
          <View className="flex-row justify-between items-center">
            <Text
              className="font-UrbanistSemiBold text-primary"
              style={{ fontSize: 19, width: "70%", lineHeight: 26 }}
            >
              Customer support notifications
            </Text>
            <Switch
              value={isCustomerSupportEnabled}
              onValueChange={setIsCustomerSupportEnabled}
              disabled={false}
              circleSize={28} // Thumb size
              circleBorderWidth={0}
              barHeight={32} // Track height
              backgroundActive={"#82E394"}
              backgroundInactive={"#e6e6e6"}
              circleActiveColor={"#fff"}
              circleInActiveColor={"#fff"}
              changeValueImmediately={true}
              innerCircleStyle={{
                alignItems: "center",
                justifyContent: "center",
              }} // Custom thumb style
              renderActiveText={false}
              renderInActiveText={false}
            />
          </View>
          <View className="flex-row justify-between items-center">
            <Text
              className="font-UrbanistSemiBold text-primary"
              style={{ fontSize: 19, width: "70%" }}
            >
              Account balance alerts
            </Text>
            <Switch
              value={isAccountBalanceEnabled}
              onValueChange={setIsAccountBalanceEnabled}
              disabled={false}
              circleSize={28} // Thumb size
              circleBorderWidth={0}
              barHeight={32} // Track height
              backgroundActive={"#82E394"}
              backgroundInactive={"#e6e6e6"}
              circleActiveColor={"#fff"}
              circleInActiveColor={"#fff"}
              changeValueImmediately={true}
              innerCircleStyle={{
                alignItems: "center",
                justifyContent: "center",
              }} // Custom thumb style
              renderActiveText={false}
              renderInActiveText={false}
            />
          </View>
          <View className="flex-row justify-between items-center">
            <Text
              className="font-UrbanistSemiBold text-primary"
              style={{ fontSize: 19, width: "70%" }}
            >
              Security alerts
            </Text>
            <Switch
              value={isSecurityAlertsEnabled}
              onValueChange={setIsSecurityAlertsEnabled}
              disabled={false}
              circleSize={28} // Thumb size
              circleBorderWidth={0}
              barHeight={32} // Track height
              backgroundActive={"#82E394"}
              backgroundInactive={"#e6e6e6"}
              circleActiveColor={"#fff"}
              circleInActiveColor={"#fff"}
              changeValueImmediately={true}
              innerCircleStyle={{
                alignItems: "center",
                justifyContent: "center",
              }} // Custom thumb style
              renderActiveText={false}
              renderInActiveText={false}
            />
          </View>
          <View className="flex-row justify-between items-center">
            <Text
              className="font-UrbanistSemiBold text-primary"
              style={{ fontSize: 19, width: "70%" }}
            >
              Daily or weekly summary
            </Text>
            <Switch
              value={isSummaryEnabled}
              onValueChange={setIsSummaryEnabled}
              disabled={false}
              circleSize={28} // Thumb size
              circleBorderWidth={0}
              barHeight={32} // Track height
              backgroundActive={"#82E394"}
              backgroundInactive={"#e6e6e6"}
              circleActiveColor={"#fff"}
              circleInActiveColor={"#fff"}
              changeValueImmediately={true}
              innerCircleStyle={{
                alignItems: "center",
                justifyContent: "center",
              }} // Custom thumb style
              renderActiveText={false}
              renderInActiveText={false}
            />
          </View>
        </View>
        <View
          className="flex-row px-2 items-center gap-4"
          style={{ marginTop: 30 }}
        >
          <Text
            className="font-UrbanistSemiBold text-xl"
            style={{ color: "#8f949b" }}
          >
            App & System
          </Text>
          <View
            className="h-[1px]"
            style={{ width: "80%", backgroundColor: "#e6e6e6" }}
          />
        </View>
        <View className="flex p-2 mt-5" style={{ gap: 30 }}>
          <View className="flex-row justify-between items-center">
            <Text
              className="font-UrbanistSemiBold text-primary"
              style={{ fontSize: 19, width: "70%", lineHeight: 26 }}
            >
              App updates & enchancements
            </Text>
            <Switch
              value={isUpdatesEnabled}
              onValueChange={setIsUpdatesEnabled}
              disabled={false}
              circleSize={28} // Thumb size
              circleBorderWidth={0}
              barHeight={32} // Track height
              backgroundActive={"#82E394"}
              backgroundInactive={"#e6e6e6"}
              circleActiveColor={"#fff"}
              circleInActiveColor={"#fff"}
              changeValueImmediately={true}
              innerCircleStyle={{
                alignItems: "center",
                justifyContent: "center",
              }} // Custom thumb style
              renderActiveText={false}
              renderInActiveText={false}
            />
          </View>
          <View className="flex-row justify-between items-center">
            <Text
              className="font-UrbanistSemiBold text-primary"
              style={{ fontSize: 19, width: "70%", lineHeight: 26 }}
            >
              Promotional offers & updates
            </Text>
            <Switch
              value={isPromotionEnabled}
              onValueChange={setIsPromotionEnabled}
              disabled={false}
              circleSize={28} // Thumb size
              circleBorderWidth={0}
              barHeight={32} // Track height
              backgroundActive={"#82E394"}
              backgroundInactive={"#e6e6e6"}
              circleActiveColor={"#fff"}
              circleInActiveColor={"#fff"}
              changeValueImmediately={true}
              innerCircleStyle={{
                alignItems: "center",
                justifyContent: "center",
              }} // Custom thumb style
              renderActiveText={false}
              renderInActiveText={false}
            />
          </View>
          <View className="flex-row justify-between items-center">
            <Text
              className="font-UrbanistSemiBold text-primary"
              style={{ fontSize: 19, width: "70%", lineHeight: 26 }}
            >
              Participate in a survey
            </Text>
            <Switch
              value={isSurveyEnabled}
              onValueChange={setIsSurveyEnabled}
              disabled={false}
              circleSize={28} // Thumb size
              circleBorderWidth={0}
              barHeight={32} // Track height
              backgroundActive={"#82E394"}
              backgroundInactive={"#e6e6e6"}
              circleActiveColor={"#fff"}
              circleInActiveColor={"#fff"}
              changeValueImmediately={true}
              innerCircleStyle={{
                alignItems: "center",
                justifyContent: "center",
              }} // Custom thumb style
              renderActiveText={false}
              renderInActiveText={false}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default notificationSettings;
