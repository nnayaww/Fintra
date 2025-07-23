import { useTheme } from "@/lib/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { wp, hp, rf, rs, getSafeAreaPadding, isSmallScreen, getIconSize } from "@/lib/responsive";

export default function ChatScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const safeArea = getSafeAreaPadding();
  const iconSizes = getIconSize();

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
            size={iconSizes.medium} 
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
              size={wp(isSmallScreen() ? 12 : 14)} 
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
                size={iconSizes.small} 
                color={theme === 'dark' ? '#22c55e' : '#16a34a'} 
              />
              <Text style={[styles.featureText, { color: theme === 'dark' ? '#a3a3a3' : '#64748b' }]}>
                Real-time messaging
              </Text>
            </View>
            
            <View style={styles.feature}>
              <Ionicons 
                name="checkmark-circle" 
                size={iconSizes.small} 
                color={theme === 'dark' ? '#22c55e' : '#16a34a'} 
              />
              <Text style={[styles.featureText, { color: theme === 'dark' ? '#a3a3a3' : '#64748b' }]}>
                File & image sharing
              </Text>
            </View>
            
            <View style={styles.feature}>
              <Ionicons 
                name="checkmark-circle" 
                size={iconSizes.small} 
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
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    borderBottomWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
  },
  backButton: {
    padding: rs(4),
  },
  headerTitle: {
    flex: 1,
    fontSize: rf(20),
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: wp(8), // Compensate for back button
  },
  placeholder: {
    width: wp(8), // Same as back button width
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(8),
  },
  comingSoonContainer: {
    alignItems: 'center',
    maxWidth: wp(85),
  },
  iconContainer: {
    width: wp(isSmallScreen() ? 20 : 24),
    height: wp(isSmallScreen() ? 20 : 24),
    borderRadius: wp(isSmallScreen() ? 10 : 12),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(3),
  },
  title: {
    fontSize: rf(isSmallScreen() ? 24 : 28),
    fontWeight: 'bold',
    marginBottom: hp(1),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: rf(isSmallScreen() ? 18 : 20),
    fontWeight: '600',
    marginBottom: hp(2),
    textAlign: 'center',
  },
  description: {
    fontSize: rf(15),
    textAlign: 'center',
    lineHeight: rf(22),
    marginBottom: hp(4),
  },
  featuresContainer: {
    alignSelf: 'stretch',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  featureText: {
    fontSize: rf(15),
    marginLeft: wp(3),
  },
});