import { db } from "@/firebase";
import { hp, rf, wp } from "@/lib/responsive";
import { useTheme } from "@/lib/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function ChatScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { senderEmail, email, name } = useLocalSearchParams();

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const isDark = theme === "dark";
  const chatId = [senderEmail, email].sort().join("_");

  useEffect(() => {
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });

    return unsubscribe;
  }, []);

  const handleSend = async () => {
    if (input.trim() === "") return;

    await addDoc(collection(db, "chats", chatId, "messages"), {
      text: input.trim(),
      sender: senderEmail,
      receiver: email,
      timestamp: serverTimestamp(),
    });

    setInput("");
  };

  const renderMessage = ({ item }: { item: any }) => {
    const isMe = item.sender === senderEmail;

    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: isMe ? "flex-end" : "flex-start",
          marginVertical: hp(0.5),
          marginHorizontal: wp(4),
        }}
      >
        {!isMe && (
          <Image
            source={require("@/assets/images/nature.jpg")}
            style={{
              width: wp(8),
              height: wp(8),
              borderRadius: wp(4),
              marginRight: wp(2),
              alignSelf: "flex-end",
            }}
          />
        )}
        <View
          style={{
            maxWidth: "75%",
            backgroundColor: isMe ? "#3B82F6" : isDark ? "#333" : "#E5E7EB",
            borderRadius: 12,
            paddingVertical: hp(1),
            paddingHorizontal: wp(3),
          }}
        >
          <Text style={{ color: isMe ? "#fff" : isDark ? "#fff" : "#111" }}>
            {item.text}
          </Text>
          {item.timestamp?.toDate && (
            <Text
              style={{
                fontSize: rf(10),
                color: isMe ? "#d1d5db" : "#6b7280",
                textAlign: "right",
                marginTop: 2,
              }}
            >
              {item.timestamp.toDate().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={hp(2)}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? "#181A20" : "#f9fafb" }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: wp(4),
            paddingVertical: hp(2),  
            backgroundColor: isDark ? "#23262F" : "#fff",
            borderBottomColor: isDark ? "#23262F" : "#e5e7eb",
            borderBottomWidth: 1,
          }}
        >
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: wp(12) }}>
            <Ionicons name="arrow-back" size={rf(20)} color={isDark ? "#fff" : "#111"} />
          </TouchableOpacity>
          <Text
            numberOfLines={1}
            style={{
              flexShrink: 1,
              textAlign: "center",
              fontSize: rf(18),
              fontWeight: "bold",
              color: isDark ? "#fff" : "#111",
            }}
          >
            {name || "Chat"}
          </Text>
          <View style={{ width: rf(20) }} />
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={{ paddingVertical: hp(1) }}
          keyboardShouldPersistTaps="handled"
        />

        {/* Input */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: wp(3),
            borderTopWidth: 1,
            borderTopColor: isDark ? "#2d2d2d" : "#e5e7eb",
            backgroundColor: isDark ? "#23262F" : "#fff",
          }}
        >
          <TextInput
            style={{
              flex: 1,
              backgroundColor: isDark ? "#2d2d2d" : "#f0f0f0",
              borderRadius: 20,
              paddingHorizontal: wp(4),
              paddingVertical: Platform.OS === "ios" ? hp(1.5) : hp(1),
              color: isDark ? "#fff" : "#000",
            }}
            placeholder="Type a message"
            placeholderTextColor={isDark ? "#aaa" : "#666"}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity onPress={handleSend} style={{ marginLeft: wp(2) }}>
            <Ionicons name="send" size={rf(20)} color={isDark ? "#3B82F6" : "#2563eb"} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
