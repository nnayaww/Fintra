import { useTheme } from "@/lib/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onPress: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  isOpen,
  onPress,
}) => {
  const { theme } = useTheme();
  return (
    <View
      className={`mb-4 border-b pb-4 ${
        theme === "dark" ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center justify-between"
      >
        <Text
          className={`text-lg font-UrbanistSemiBold ${
            theme === "dark" ? "text-dark-primary" : "text-primary"
          }`}
        >
          {question}
        </Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={24}
          color={theme === "dark" ? "#fff" : "#0D0D0D"}
        />
      </TouchableOpacity>
      {isOpen && (
        <Text
          className={`mt-2 text-base font-UrbanistRegular ${
            theme === "dark" ? "text-dark-secondary" : "text-secondary"
          }`}
        >
          {answer}
        </Text>
      )}
    </View>
  );
};

const HelpCenter = () => {
  const { theme } = useTheme();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        "To reset your password, go to the sign-in screen and tap 'Forgot Password'. Follow the instructions to set a new password.",
    },
    {
      question: "How do I top up my account?",
      answer:
        "You can top up your account by navigating to the home screen and tapping the 'Top-Up' button. From there, you can add a new payment method or use an existing one.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we take your security very seriously. All your personal information is encrypted and stored securely.",
    },
    {
      question: "What should I do if I suspect fraudulent activity?",
      answer:
        "If you suspect any fraudulent activity on your account, please contact our support team immediately through the 'Contact Us' section. We are available 24/7 to assist you.",
    },
    {
      question: "Can I use FinTra internationally?",
      answer:
        "Yes, FinTra supports international transactions. You can send and receive money from anywhere in the world. Please check our fees and rates for more details.",
    },
    {
      question: "How do I update my personal information?",
      answer:
        "You can update your personal information by navigating to Account > Personal Info. From there, you can edit your details and save the changes.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <View
      className={`flex-1 p-5 ${
        theme === "dark" ? "bg-dark-background" : "bg-white"
      }`}
    >
      <View className="flex-row items-center mt-3">
        <TouchableOpacity
          onPress={() => {
            router.back();
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
          style={{ marginHorizontal: 65 }}
        >
          Help Center
        </Text>
      </View>
      <ScrollView className="mt-8">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openFAQ === index}
            onPress={() => toggleFAQ(index)}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        className="bg-general flex items-center justify-center p-5 border-none rounded-full mt-5"
        onPress={() => {
          router.push("/(root)/(account)/(settings)/contact-us");
        }}
      >
        <Text className="font-UrbanistSemiBold text-buttontext text-primary">
          Contact Us
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HelpCenter;
