/* eslint-disable react/no-unescaped-entities */
import { useTheme } from "@/lib/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import {
    Keyboard,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const TermsandPolicy = () => {
  const { theme } = useTheme();
  return (
    <View
      className={`flex-1 p-5 ${
        theme === "dark" ? "bg-dark-background" : "bg-white"
      }`}
    >
      <View className="flex-row items-center mt-3">
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/(root)/(tabs)/home");
            }
          }}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color={theme === "dark" ? "#fff" : "#0D0D0D"}
            style={{ padding: 6, marginTop: 22 }}
          />
        </TouchableOpacity>
        <Text
          className={`font-UrbanistBold text-3xl mt-5 ${
            theme === "dark" ? "text-dark-primary" : "text-primary"
          }`}
          style={{ marginHorizontal: 35 }}
        >
          Terms and Policy
        </Text>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={Keyboard.dismiss}
      >
        <View style={{ marginTop: 30 }}>
          <Text
            className={`font-UrbanistBold text-2xl ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
          >
            Acceptance of Terms
          </Text>
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 17, lineHeight: 26, marginTop: 6 }}
          >
            By downloading, accessing, or using the FinTra mobile app, you agree
            to be bound by these Terms of Service and our privacy policy. If you
            do not agree with any part, please do not use FinTra.
          </Text>
          <Text
            className={`font-UrbanistBold text-2xl ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ marginTop: 35 }}
          >
            Eligibility
          </Text>
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 17, lineHeight: 26, marginTop: 6 }}
          >
            To use FinTra, you must:
          </Text>
          <View>
            <Text
              className={`font-UrbanistMedium ${
                theme === "dark" ? "text-dark-secondary" : "text-secondary"
              }`}
              style={{ fontSize: 17, lineHeight: 26 }}
            >
              - Be at least 18 years old.{"\n"}- Provide accurate and complete
              registration information.{"\n"}- Use the app only for lawful
              purposes.
            </Text>
          </View>
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 17, lineHeight: 26, marginTop: 20 }}
          >
            We may suspend or terminate your account if we believe you are in
            breach of these terms.
          </Text>
          <Text
            className={`font-UrbanistBold text-2xl ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ marginTop: 35 }}
          >
            User Responsibilities
          </Text>
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 17, lineHeight: 26, marginTop: 6 }}
          >
            You agree to:
          </Text>
          <View>
            <Text
              className={`font-UrbanistMedium ${
                theme === "dark" ? "text-dark-secondary" : "text-secondary"
              }`}
              style={{ fontSize: 17, lineHeight: 26 }}
            >
              - Keep your account credentials secure.{"\n"}- Immediately report
              unauthorized use of your account.{"\n"}- Only use the app to
              conduct lawful financial transactions.
            </Text>
          </View>
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 17, lineHeight: 26, marginTop: 20 }}
          >
            You are responsible for all activities under your account.
          </Text>
          <Text
            className={`font-UrbanistBold text-2xl ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ marginTop: 35 }}
          >
            Services Provided
          </Text>
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 17, lineHeight: 26, marginTop: 6 }}
          >
            FinTra allows you to:
          </Text>
          <View>
            <Text
              className={`font-UrbanistMedium ${
                theme === "dark" ? "text-dark-secondary" : "text-secondary"
              }`}
              style={{ fontSize: 17, lineHeight: 26 }}
            >
              - Send and receive money.{"\n"}- Manage your digital wallet and
              payment methods.{"\n"}- Track your transactions and balances.
            </Text>
          </View>
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 17, lineHeight: 26, marginTop: 20 }}
          >
            Services may vary depending on your country or region.
          </Text>
          <Text
            className={`font-UrbanistBold text-2xl ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ marginTop: 35 }}
          >
            Fees and Charges
          </Text>
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 17, lineHeight: 26, marginTop: 6 }}
          >
            Some transactions may incur service charges or third-party fees.
            These will be communicated clearly before you complete any
            transaction.
          </Text>
          <Text
            className={`font-UrbanistBold text-2xl ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ marginTop: 35 }}
          >
            Prohibited Activities
          </Text>
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 17, lineHeight: 26, marginTop: 6 }}
          >
            You may not:
          </Text>
          <View>
            <Text
              className={`font-UrbanistMedium ${
                theme === "dark" ? "text-dark-secondary" : "text-secondary"
              }`}
              style={{ fontSize: 17, lineHeight: 26 }}
            >
              - Use FinTra for fraudulent or illegal purposes.{"\n"}- Attempt to
              reverse-engineer or hack the app.{"\n"}- Interfere with other
              users’ access or security.
            </Text>
          </View>
          <Text
            className={`font-UrbanistBold text-2xl ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ marginTop: 35 }}
          >
            Account Termination
          </Text>
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 17, lineHeight: 26, marginTop: 6 }}
          >
            We reserve the right to suspend or terminate your account if:
          </Text>
          <View>
            <Text
              className={`font-UrbanistMedium ${
                theme === "dark" ? "text-dark-secondary" : "text-secondary"
              }`}
              style={{ fontSize: 17, lineHeight: 26 }}
            >
              - You violate these Terms.{"\n"}- You provide false or misleading
              information.{"\n"}- Your activity poses a security, fraud, or
              legal risk.
            </Text>
          </View>
          <Text
            className={`font-UrbanistBold text-2xl ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ marginTop: 35 }}
          >
            Limitation of Liability
          </Text>
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 17, lineHeight: 26, marginTop: 6 }}
          >
            FinTra is provided “as is” without warranties of any kind. We are
            not liable for:
          </Text>
          <View>
            <Text
              className={`font-UrbanistMedium ${
                theme === "dark" ? "text-dark-secondary" : "text-secondary"
              }`}
              style={{ fontSize: 17, lineHeight: 26 }}
            >
              - Indirect, incidental, or consequential damages.{"\n"}- Loss of
              data, revenue, or profits.{"\n"}- Unforeseen delays or service
              interruptions.
            </Text>
          </View>
          <Text
            className={`font-UrbanistBold text-2xl ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ marginTop: 35 }}
          >
            Intellectual Property
          </Text>
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 17, lineHeight: 26, marginTop: 6 }}
          >
            All content, branding, and features in FinTra are owned by FinTra
            and protected by copyright, trademark, and other laws. You may not
            reproduce or redistribute any part without written permission.
          </Text>
          <Text
            className={`font-UrbanistBold text-2xl ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ marginTop: 35 }}
          >
            Updates and Changes
          </Text>
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 17, lineHeight: 26, marginTop: 6 }}
          >
            We may update these Terms occasionally. Continued use of the app
            after changes means you accept the new terms. We'll notify users of
            significant updates.
          </Text>
          <Text
            className={`font-UrbanistBold text-2xl ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ marginTop: 35 }}
          >
            Governing Law
          </Text>
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 17, lineHeight: 26, marginTop: 6 }}
          >
            These Terms are governed by and construed in accordance with the
            laws of Ghana. Any disputes shall be resolved in the courts of that
            jurisdiction.
          </Text>
          <Text
            className={`font-UrbanistBold text-2xl ${
              theme === "dark" ? "text-dark-primary" : "text-primary"
            }`}
            style={{ marginTop: 35 }}
          >
            Contact Us
          </Text>
          <Text
            className={`font-UrbanistMedium ${
              theme === "dark" ? "text-dark-secondary" : "text-secondary"
            }`}
            style={{ fontSize: 17, lineHeight: 26, marginTop: 6 }}
          >
            For questions about these Terms, contact us at: 📧
            support@fintra.app
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default TermsandPolicy;