import { db, storage, } from "@/firebase";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import { useLocalSearchParams } from "expo-router";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, KeyboardAvoidingView, Linking, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { v4 as uuidv4 } from "uuid";

interface Message {
  id?: string;
  sender: string;
  receiver: string;
  content: string;
  type: string;
  timestamp: any;
  status: string;
}

export default function ChatScreen() {
  const flatListRef = useRef<FlatList<any>>(null);
  const { senderEmail: rawSenderEmail, receiverEmail: rawReceiverEmail, receiverName: rawReceiverName } = useLocalSearchParams();
  // Remove senderEmail mock, use state for async loading
  const [senderEmail, setSenderEmail] = useState<string | null>(null);
  let receiverEmail = Array.isArray(rawReceiverEmail) ? rawReceiverEmail[0] : rawReceiverEmail;
  // Mock fallback for receiverEmail if missing
  if (!receiverEmail) receiverEmail = "kofi@example.com";
  const receiverName = Array.isArray(rawReceiverName) ? rawReceiverName[0] : rawReceiverName;
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [expoPushToken, setExpoPushToken] = useState("");

  // Load senderEmail from AsyncStorage on mount
  useEffect(() => {
    const loadSenderEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('email'); // changed from 'userEmail' to 'email'
        setSenderEmail(email);
      } catch (e) {
        setSenderEmail(null);
      }
    };
    loadSenderEmail();
  }, []);

  useEffect(() => {
    if (!senderEmail || !receiverEmail) return;
    const q = query(
      collection(db, "chats", getChatId(senderEmail, receiverEmail), "messages"),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        sender: doc.data().sender,
        receiver: doc.data().receiver,
        content: doc.data().content,
        type: doc.data().type,
        timestamp: doc.data().timestamp,
        status: doc.data().status,
      }));
      setMessages(msgs);
      flatListRef.current?.scrollToEnd({ animated: true });
    });
    registerForPushNotificationsAsync().then(token => {
      if (token) setExpoPushToken(token);
    });
    return () => unsubscribe();
  }, [senderEmail, receiverEmail]);

  useEffect(() => {
    AsyncStorage.getAllKeys().then(keys => {
      AsyncStorage.multiGet(keys).then(result => {
        console.log('AsyncStorage contents:', result);
      });
    });
  }, []);

  const getChatId = (a: string, b: string) => (a < b ? `${a}_${b}` : `${b}_${a}`);

  const sendPushNotification = async (message: string) => {
    if (!expoPushToken) return;
    await Notifications.scheduleNotificationAsync({
      content: {
        title: receiverName || "New Message",
        body: message,
      },
      trigger: null,
    });
  };

  const sendMessage = async (content: string, type: string = "text") => {
    if (!content.trim()) {
      console.log("Message is empty, not sending.");
      return;
    }
    try {
      console.log("Attempting to send message:", content, "type:", type);
      const message: Omit<Message, 'id'> = {
        sender: senderEmail!,
        receiver: receiverEmail,
        content,
        type,
        timestamp: serverTimestamp(),
        status: "sent",
      };
      await addDoc(collection(db, "chats", getChatId(senderEmail!, receiverEmail), "messages"), message);
      console.log("Message sent successfully");
      sendPushNotification(type === "text" ? content : "Sent a file");
      setNewMessage("");
    } catch (error) {
      alert("Failed to send message. Please try again.");
      console.error("Error sending message:", error);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
      if (!result.canceled) {
        const file = result.assets[0];
        const fileRef = ref(storage, `images/${uuidv4()}`);
        const response = await fetch(file.uri);
        const blob = await response.blob();
        await uploadBytes(fileRef, blob);
        const url = await getDownloadURL(fileRef);
        sendMessage(url, "image");
      }
    } catch (error) {
      alert("Failed to upload image. Please try again.");
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
      if (result.assets && result.assets[0]) {
        const file = result.assets[0];
        const fileRef = ref(storage, `files/${uuidv4()}_${file.name}`);
        const response = await fetch(file.uri);
        const blob = await response.blob();
        await uploadBytes(fileRef, blob);
        const url = await getDownloadURL(fileRef);
        sendMessage(JSON.stringify({ name: file.name, url }), "file");
      }
    } catch (error) {
      alert("Failed to upload file. Please try again.");
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isSender = item.sender === senderEmail;
    const time = item.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let content;
    if (item.type === "image") {
      content = <Image source={{ uri: item.content }} style={{ width: 180, height: 180, borderRadius: 8 }} />;
    } else if (item.type === "file") {
      const file = JSON.parse(item.content);
      content = (
        <TouchableOpacity onPress={() => Linking.openURL(file.url)}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="insert-drive-file" size={24} color="gray" />
            <Text style={{ marginLeft: 5, color: "blue" }}>{file.name}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      content = <Text style={{ color: isSender ? "white" : "black" }}>{item.content}</Text>;
    }

    return (
      <View style={[styles.messageContainer, isSender ? styles.sender : styles.receiver]}>
        {content}
        <Text style={styles.timestamp}>{time}</Text>
                  </View>
    );
  };

  if (!senderEmail) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red', fontSize: 16, textAlign: 'center' }}>
          Loading user info...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={{ padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{receiverName}</Text>
          </View>
          {/* Messages */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item, index) => item.id || index.toString()}
            renderItem={renderMessage}
            contentContainerStyle={{ paddingBottom: 80, flexGrow: 1 }}
            ListEmptyComponent={
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#aaa' }}>No messages yet. Say hello!</Text>
              </View>
            }
          />
          {/* Input Bar */}
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={pickImage}><Ionicons name="image" size={24} color="gray" /></TouchableOpacity>
            <TouchableOpacity onPress={pickDocument}><Ionicons name="document" size={24} color="gray" /></TouchableOpacity>
            <TextInput
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Type a message"
              style={styles.input}
            />
            <TouchableOpacity onPress={() => sendMessage(newMessage)}>
              <Ionicons name="send" size={24} color="blue" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  messageContainer: {
    marginVertical: 6,
    maxWidth: "75%",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  sender: {
    backgroundColor: "#007bff",
    alignSelf: "flex-end",
  },
  receiver: {
    backgroundColor: "#e4e6eb",
    alignSelf: "flex-start",
  },
  timestamp: {
    fontSize: 10,
    color: "#888",
    marginTop: 4,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 12,
    marginHorizontal: 8,
  },
});

async function registerForPushNotificationsAsync() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Push notifications permission not granted');
    return;
  }
  const tokenData = await Notifications.getExpoPushTokenAsync();
  return tokenData.data;
} 
