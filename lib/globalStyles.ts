import { StyleSheet } from 'react-native';
import { wp, hp, rf, rs, getSafeAreaPadding, isSmallScreen, isLargeScreen, getButtonSize, getIconSize } from './responsive';

const safeArea = getSafeAreaPadding();
const buttonSize = getButtonSize();
const iconSizes = getIconSize();

// Global responsive styles that can be used across all screens
export const globalStyles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
    paddingTop: safeArea.top,
    paddingBottom: safeArea.bottom,
  },
  screenPadding: {
    paddingHorizontal: wp(5),
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    borderBottomWidth: 1,
  },
  headerTitle: {
    flex: 1,
    fontSize: rf(20),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    padding: rs(8),
    borderRadius: rs(20),
  },
  
  // Button Styles
  primaryButton: {
    backgroundColor: '#196126',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(2),
    borderRadius: rs(25),
    minHeight: buttonSize.height,
    marginVertical: hp(1),
  },
  secondaryButton: {
    borderWidth: rs(1),
    borderColor: '#196126',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(2),
    borderRadius: rs(25),
    minHeight: buttonSize.height,
    marginVertical: hp(1),
  },
  buttonText: {
    fontWeight: '600',
    fontSize: buttonSize.fontSize,
    color: '#fff',
  },
  secondaryButtonText: {
    fontWeight: '600',
    fontSize: buttonSize.fontSize,
    color: '#196126',
  },
  
  // Input Styles
  input: {
    borderWidth: rs(1),
    borderRadius: rs(12),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    fontSize: rf(16),
    minHeight: hp(6),
  },
  inputContainer: {
    marginVertical: hp(1),
  },
  inputLabel: {
    fontSize: rf(16),
    fontWeight: '600',
    marginBottom: hp(0.5),
  },
  inputError: {
    fontSize: rf(14),
    color: '#E53E3E',
    marginTop: hp(0.5),
    marginLeft: wp(2),
  },
  
  // Text Styles
  heading1: {
    fontSize: rf(isSmallScreen() ? 26 : isLargeScreen() ? 34 : 30),
    fontWeight: 'bold',
    lineHeight: rf(isSmallScreen() ? 32 : isLargeScreen() ? 42 : 38),
  },
  heading2: {
    fontSize: rf(isSmallScreen() ? 22 : isLargeScreen() ? 28 : 24),
    fontWeight: 'bold',
    lineHeight: rf(isSmallScreen() ? 28 : isLargeScreen() ? 36 : 32),
  },
  heading3: {
    fontSize: rf(isSmallScreen() ? 18 : isLargeScreen() ? 22 : 20),
    fontWeight: '600',
    lineHeight: rf(isSmallScreen() ? 24 : isLargeScreen() ? 30 : 26),
  },
  bodyLarge: {
    fontSize: rf(18),
    lineHeight: rf(26),
  },
  bodyMedium: {
    fontSize: rf(16),
    lineHeight: rf(24),
  },
  bodySmall: {
    fontSize: rf(14),
    lineHeight: rf(20),
  },
  caption: {
    fontSize: rf(12),
    lineHeight: rf(16),
  },
  
  // Card Styles
  card: {
    backgroundColor: '#fff',
    borderRadius: rs(12),
    padding: wp(4),
    marginVertical: hp(1),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: rs(8),
    shadowOffset: { width: 0, height: rs(2) },
    elevation: 3,
  },
  cardSmall: {
    backgroundColor: '#fff',
    borderRadius: rs(8),
    padding: wp(3),
    marginVertical: hp(0.5),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: rs(4),
    shadowOffset: { width: 0, height: rs(1) },
    elevation: 2,
  },
  
  // List Styles
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    borderBottomWidth: rs(1),
  },
  listItemContent: {
    flex: 1,
    marginLeft: wp(3),
  },
  listItemTitle: {
    fontSize: rf(16),
    fontWeight: '600',
  },
  listItemSubtitle: {
    fontSize: rf(14),
    marginTop: hp(0.3),
  },
  
  // Icon Styles
  iconSmall: {
    width: iconSizes.small,
    height: iconSizes.small,
  },
  iconMedium: {
    width: iconSizes.medium,
    height: iconSizes.medium,
  },
  iconLarge: {
    width: iconSizes.large,
    height: iconSizes.large,
  },
  
  // Spacing Styles
  marginVerticalSmall: {
    marginVertical: hp(1),
  },
  marginVerticalMedium: {
    marginVertical: hp(2),
  },
  marginVerticalLarge: {
    marginVertical: hp(3),
  },
  marginHorizontalSmall: {
    marginHorizontal: wp(2),
  },
  marginHorizontalMedium: {
    marginHorizontal: wp(4),
  },
  marginHorizontalLarge: {
    marginHorizontal: wp(6),
  },
  
  // Padding Styles
  paddingVerticalSmall: {
    paddingVertical: hp(1),
  },
  paddingVerticalMedium: {
    paddingVertical: hp(2),
  },
  paddingVerticalLarge: {
    paddingVertical: hp(3),
  },
  paddingHorizontalSmall: {
    paddingHorizontal: wp(2),
  },
  paddingHorizontalMedium: {
    paddingHorizontal: wp(4),
  },
  paddingHorizontalLarge: {
    paddingHorizontal: wp(6),
  },
  
  // Form Styles
  formContainer: {
    padding: wp(5),
    gap: hp(2),
  },
  formGroup: {
    marginBottom: hp(2),
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: rs(20),
    padding: wp(6),
    width: wp(85),
    maxHeight: hp(80),
  },
  
  // Loading Styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(4),
  },
  
  // Empty State Styles
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(8),
  },
  emptyStateImage: {
    width: wp(isSmallScreen() ? 40 : 50),
    height: wp(isSmallScreen() ? 40 : 50),
    marginBottom: hp(3),
  },
  emptyStateTitle: {
    fontSize: rf(20),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp(1),
  },
  emptyStateDescription: {
    fontSize: rf(16),
    textAlign: 'center',
    lineHeight: rf(22),
  },
});

// Theme-aware color functions
export const getThemeColors = (theme: 'light' | 'dark') => ({
  // Background Colors
  primary: theme === 'dark' ? '#181A20' : '#ffffff',
  secondary: theme === 'dark' ? '#23262F' : '#f9fafb',
  accent: '#196126',
  
  // Text Colors
  textPrimary: theme === 'dark' ? '#ffffff' : '#111827',
  textSecondary: theme === 'dark' ? '#a3a3a3' : '#64748b',
  textMuted: theme === 'dark' ? '#6b7280' : '#9ca3af',
  
  // Border Colors
  border: theme === 'dark' ? '#374151' : '#e5e7eb',
  borderLight: theme === 'dark' ? '#4b5563' : '#f3f4f6',
  
  // Status Colors
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Interactive Colors
  buttonPrimary: '#196126',
  buttonSecondary: theme === 'dark' ? '#374151' : '#f3f4f6',
  inputBackground: theme === 'dark' ? '#23262F' : '#f9fafb',
  cardBackground: theme === 'dark' ? '#23262F' : '#ffffff',
});

// Combined theme-aware styles function
export const createThemedStyles = (theme: 'light' | 'dark') => {
  const colors = getThemeColors(theme);
  
  return StyleSheet.create({
    // Override global styles with theme colors
    container: {
      ...globalStyles.container,
      backgroundColor: colors.primary,
    },
    header: {
      ...globalStyles.header,
      backgroundColor: colors.primary,
      borderBottomColor: colors.border,
      marginTop: 32
    },
    headerTitle: {
      ...globalStyles.headerTitle,
      color: colors.textPrimary,
    },
    input: {
      ...globalStyles.input,
      backgroundColor: colors.inputBackground,
      borderColor: colors.border,
      color: colors.textPrimary,
    },
    inputLabel: {
      ...globalStyles.inputLabel,
      color: colors.textPrimary,
    },
    card: {
      ...globalStyles.card,
      backgroundColor: colors.cardBackground,
      shadowColor: theme === 'dark' ? '#000' : '#000',
    },
    cardSmall: {
      ...globalStyles.cardSmall,
      backgroundColor: colors.cardBackground,
      shadowColor: theme === 'dark' ? '#000' : '#000',
    },
    listItem: {
      ...globalStyles.listItem,
      borderBottomColor: colors.borderLight,
    },
    listItemTitle: {
      ...globalStyles.listItemTitle,
      color: colors.textPrimary,
    },
    listItemSubtitle: {
      ...globalStyles.listItemSubtitle,
      color: colors.textSecondary,
    },
    heading1: {
      ...globalStyles.heading1,
      color: colors.textPrimary,
    },
    heading2: {
      ...globalStyles.heading2,
      color: colors.textPrimary,
    },
    heading3: {
      ...globalStyles.heading3,
      color: colors.textPrimary,
    },
    bodyLarge: {
      ...globalStyles.bodyLarge,
      color: colors.textPrimary,
    },
    bodyMedium: {
      ...globalStyles.bodyMedium,
      color: colors.textPrimary,
    },
    bodySmall: {
      ...globalStyles.bodySmall,
      color: colors.textSecondary,
    },
    caption: {
      ...globalStyles.caption,
      color: colors.textMuted,
    },
    modalContent: {
      ...globalStyles.modalContent,
      backgroundColor: colors.cardBackground,
    },
    emptyStateTitle: {
      ...globalStyles.emptyStateTitle,
      color: colors.textPrimary,
    },
    emptyStateDescription: {
      ...globalStyles.emptyStateDescription,
      color: colors.textSecondary,
    },
  });
};