import { useTheme } from "@/lib/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ChatScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme === 'dark' ? '#181A20' : '#f9fafb' }]}>
      {/* Header */}
      <View style={[styles.header, { 
        backgroundColor: theme === 'dark' ? '#23262F' : '#fff', 
        borderBottomColor: theme === 'dark' ? '#23262F' : '#e5e7eb' 
      }]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
          accessibilityLabel="Go back"
        >
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color={theme === 'dark' ? '#fff' : '#666'} 
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme === 'dark' ? '#fff' : '#111827' }]}>
          Chat
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Coming Soon Content */}
      <View style={styles.content}>
        <View style={styles.comingSoonContainer}>
          <View style={[styles.iconContainer, { backgroundColor: theme === 'dark' ? '#2563eb' : '#3b82f6' }]}>
            <Ionicons 
              name="chatbubbles" 
              size={48} 
              color="#fff" 
            />
          </View>
          
          <Text style={[styles.title, { color: theme === 'dark' ? '#fff' : '#111827' }]}>
            Chat Feature
          </Text>
          
          <Text style={[styles.subtitle, { color: theme === 'dark' ? '#a3a3a3' : '#64748b' }]}>
            We're Coming Soon!
          </Text>
          
          <Text style={[styles.description, { color: theme === 'dark' ? '#a3a3a3' : '#64748b' }]}>
            We're working hard to bring you an amazing chat experience. 
            Stay tuned for real-time messaging, file sharing, and more exciting features.
          </Text>
          
          <View style={styles.featuresContainer}>
            <View style={styles.feature}>
              <Ionicons 
                name="checkmark-circle" 
                size={20} 
                color={theme === 'dark' ? '#22c55e' : '#16a34a'} 
              />
              <Text style={[styles.featureText, { color: theme === 'dark' ? '#a3a3a3' : '#64748b' }]}>
                Real-time messaging
              </Text>
            </View>
            
            <View style={styles.feature}>
              <Ionicons 
                name="checkmark-circle" 
                size={20} 
                color={theme === 'dark' ? '#22c55e' : '#16a34a'} 
              />
              <Text style={[styles.featureText, { color: theme === 'dark' ? '#a3a3a3' : '#64748b' }]}>
                File & image sharing
              </Text>
            </View>
            
            <View style={styles.feature}>
              <Ionicons 
                name="checkmark-circle" 
                size={20} 
                color={theme === 'dark' ? '#22c55e' : '#16a34a'} 
              />
              <Text style={[styles.featureText, { color: theme === 'dark' ? '#a3a3a3' : '#64748b' }]}>
                Push notifications
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 32, // Compensate for back button
  },
  placeholder: {
    width: 32, // Same as back button width
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  comingSoonContainer: {
    alignItems: 'center',
    maxWidth: 320,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  featuresContainer: {
    alignSelf: 'stretch',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 12,
  },
});