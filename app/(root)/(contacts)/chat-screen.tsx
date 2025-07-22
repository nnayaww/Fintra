import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/lib/ThemeContext';


interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

interface User {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export default function ChatScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey! How's your day going?",
      timestamp: new Date(Date.now() - 3600000),
      isOwn: false,
      status: 'read'
    },
    {
      id: '2',
      text: "Pretty good! Just working on some projects. What about you?",
      timestamp: new Date(Date.now() - 3500000),
      isOwn: true,
      status: 'read'
    },
    {
      id: '3',
      text: "Same here! I'm excited about the new features we're building.",
      timestamp: new Date(Date.now() - 3000000),
      isOwn: false,
      status: 'read'
    },
    {
      id: '4',
      text: "That sounds awesome! Can't wait to see what you come up with 🚀",
      timestamp: new Date(Date.now() - 2500000),
      isOwn: true,
      status: 'delivered'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [currentUser] = useState<User>({
    id: '2',
    name: 'Alex Johnson',
    avatar: '',
    isOnline: true
  });

  const [chatUser] = useState<User>({
    id: '1',
    name: 'Sarah Chen',
    avatar: '',
    isOnline: true,
    lastSeen: new Date()
  });

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      timestamp: new Date(),
      isOwn: true,
      status: 'sent'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 1000);

    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, status: 'read' } : msg
      ));
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'sent':
        return <View style={[styles.statusDot, { backgroundColor: '#a0aec0' }]} />;
      case 'delivered':
        return <View style={[styles.statusDot, { backgroundColor: '#3b82f6' }]} />;
      case 'read':
        return <View style={[styles.statusDot, { backgroundColor: '#22c55e' }]} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'dark' ? '#181A20' : '#f9fafb' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#181A20' : '#f9fafb' }]}> 
          {/* Header */}
          <View style={[styles.header, { backgroundColor: theme === 'dark' ? '#23262F' : '#fff', borderBottomColor: theme === 'dark' ? '#23262F' : '#e5e7eb', shadowColor: theme === 'dark' ? '#000' : '#000' }]}> 
            <TouchableOpacity style={styles.headerButton} accessibilityLabel="Back" onPress={() => {
              router.back();
            }}>
              <Ionicons name="arrow-back" size={24} color={theme === 'dark' ? '#fff' : '#666'} />
            </TouchableOpacity>
            <View style={styles.headerUserInfo}>
              <View style={styles.avatarWrapper}>
                <View style={[styles.avatarCircle, { backgroundColor: theme === 'dark' ? '#6366f1' : '#6366f1' }]}> 
                  <Text style={styles.avatarText}>
                    {chatUser.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                {chatUser.isOnline && (
                  <View style={styles.onlineDot} />
                )}
              </View>
              <View>
                <Text style={[styles.headerName, { color: theme === 'dark' ? '#fff' : '#111827' }]}>{chatUser.name}</Text>
                <Text style={[styles.headerStatus, { color: theme === 'dark' ? '#a3a3a3' : '#64748b' }]}> 
                  {chatUser.isOnline ? 'Online' : `Last seen ${formatTime(chatUser.lastSeen!)}`}
                </Text>
              </View>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={[styles.headerButton, { marginRight: 16 }]} accessibilityLabel="Video call">
                <Feather name="video" size={20} color={theme === 'dark' ? '#fff' : '#666'} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton} accessibilityLabel="Phone call">
                <Feather name="phone" size={20} color={theme === 'dark' ? '#fff' : '#666'} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton} accessibilityLabel="More options">
                <Feather name="more-vertical" size={20} color={theme === 'dark' ? '#fff' : '#666'} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Messages */}
          <ScrollView
            style={[styles.messagesContainer, { backgroundColor: theme === 'dark' ? '#181A20' : '#f9fafb' }]}
            contentContainerStyle={{ padding: 16, paddingBottom: 8 }}
            ref={scrollViewRef}
          >
            {messages.map((message) => (
              <View
                key={message.id}
                style={[styles.messageRow, message.isOwn ? styles.messageRowOwn : styles.messageRowOther]}
              >
                <View style={[
                  styles.messageBubble,
                  message.isOwn
                    ? [styles.messageBubbleOwn, { backgroundColor: theme === 'dark' ? '#2563eb' : '#3b82f6' }]
                    : [styles.messageBubbleOther, { backgroundColor: theme === 'dark' ? '#23262F' : '#fff', borderColor: theme === 'dark' ? '#23262F' : '#e5e7eb', shadowColor: theme === 'dark' ? '#000' : '#000' }],
                ]}>
                  <Text style={[styles.messageText, { color: message.isOwn ? '#fff' : (theme === 'dark' ? '#fff' : '#111827') }]}>{message.text}</Text>
                  <View style={styles.messageMeta}>
                    <Text style={[
                      styles.messageTime,
                      message.isOwn
                        ? { color: theme === 'dark' ? '#dbeafe' : '#dbeafe' }
                        : { color: theme === 'dark' ? '#a3a3a3' : '#64748b' },
                    ]}>
                      {formatTime(message.timestamp)}
                    </Text>
                    {message.isOwn && getStatusIcon(message.status)}
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Input */}
          <View style={[styles.inputContainer, { backgroundColor: theme === 'dark' ? '#23262F' : '#fff', borderTopColor: theme === 'dark' ? '#23262F' : '#e5e7eb' }]}> 
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme === 'dark' ? '#181A20' : '#f1f5f9',
                  color: theme === 'dark' ? '#fff' : '#111827',
                },
              ]}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Type a message..."
              placeholderTextColor={theme === 'dark' ? '#a3a3a3' : '#9CA3AF'}
              onSubmitEditing={handleSendMessage}
              returnKeyType="send"
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              disabled={newMessage.trim() === ''}
              style={[
                styles.sendButton,
                newMessage.trim() === '' ? styles.sendButtonDisabled : {},
                { backgroundColor: newMessage.trim() === '' ? (theme === 'dark' ? '#23262F' : '#e5e7eb') : (theme === 'dark' ? '#2563eb' : '#3b82f6') },
              ]}
              accessibilityLabel="Send message"
            >
              <Feather name="send" size={20} color={newMessage.trim() === '' ? (theme === 'dark' ? '#a3a3a3' : '#a3a3a3') : '#fff'} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
  },
  headerButton: {
    padding: 1,
    borderRadius: 999,
  },
  headerUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 8,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#fff',
  },
  headerName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#111827',
  },
  headerStatus: {
    fontSize: 12,
    color: '#64748b',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  messageRowOwn: {
    justifyContent: 'flex-end',
  },
  messageRowOther: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
  },
  messageBubbleOwn: {
    backgroundColor: '#3b82f6',
    borderBottomRightRadius: 6,
  },
  messageBubbleOther: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 1 },
  },
  messageText: {
    fontSize: 15,
    color: '#111827',
  },
  messageMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
    gap: 4,
  },
  messageTime: {
    fontSize: 12,
    marginRight: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: '#111827',
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 999,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#e5e7eb',
  },
});