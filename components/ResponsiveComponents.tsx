import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Image,
  Modal,
  ViewStyle,
  TextStyle,
  ImageStyle,
  TextInputProps,
  TouchableOpacityProps,
  ScrollViewProps,
  ImageProps,
  ModalProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/lib/ThemeContext';
import { globalStyles, createThemedStyles } from '@/lib/globalStyles';
import { wp, hp, rf, getIconSize } from '@/lib/responsive';

// Enhanced SafeAreaView with theme support
interface ResponsiveSafeAreaProps {
  children: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
}

export const ResponsiveSafeArea: React.FC<ResponsiveSafeAreaProps> = ({
  children,
  style,
  backgroundColor,
}) => {
  const { theme } = useTheme();
  const themedStyles = createThemedStyles(theme);

  return (
    <SafeAreaView
      style={[
        themedStyles.container,
        backgroundColor && { backgroundColor },
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

// Responsive Screen Container
interface ScreenContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: boolean;
  scrollable?: boolean;
  scrollProps?: ScrollViewProps;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
  padding = true,
  scrollable = false,
  scrollProps,
}) => {
  const { theme } = useTheme();
  const themedStyles = createThemedStyles(theme);

  const containerStyle = [
    themedStyles.container,
    padding && globalStyles.screenPadding,
    style,
  ];

  if (scrollable) {
    return (
      <ScrollView
        style={containerStyle}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        {...scrollProps}
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={containerStyle}>{children}</View>;
};

// Responsive Header Component
interface ResponsiveHeaderProps {
  title: string;
  onBack?: () => void;
  rightComponent?: React.ReactNode;
  style?: ViewStyle;
  titleStyle?: TextStyle;
}

export const ResponsiveHeader: React.FC<ResponsiveHeaderProps> = ({
  title,
  onBack,
  rightComponent,
  style,
  titleStyle,
}) => {
  const { theme } = useTheme();
  const themedStyles = createThemedStyles(theme);
  const iconSizes = getIconSize();

  return (
    <View style={[themedStyles.header, style]}>
      {onBack ? (
        <TouchableOpacity style={globalStyles.backButton} onPress={onBack}>
          <Ionicons
            name="arrow-back"
            size={iconSizes.medium}
            color={theme === 'dark' ? '#fff' : '#666'}
          />
        </TouchableOpacity>
      ) : (
        <View style={{ width: wp(8) }} />
      )}
      
      <Text style={[themedStyles.headerTitle, titleStyle]}>{title}</Text>
      
      {rightComponent ? (
        rightComponent
      ) : (
        <View style={{ width: wp(8) }} />
      )}
    </View>
  );
};

// Responsive Button Component
interface ResponsiveButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  icon?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const ResponsiveButton: React.FC<ResponsiveButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  icon,
  style,
  textStyle,
  disabled,
  ...props
}) => {
  const { theme } = useTheme();
  const iconSizes = getIconSize();

  const getButtonStyle = () => {
    const baseStyle = variant === 'primary' ? globalStyles.primaryButton : globalStyles.secondaryButton;
    const sizeStyle = {
      small: { paddingVertical: hp(1.2), minHeight: hp(5) },
      medium: { paddingVertical: hp(1.8), minHeight: hp(6) },
      large: { paddingVertical: hp(2.2), minHeight: hp(7) },
    };

    return [
      baseStyle,
      sizeStyle[size],
      disabled && { opacity: 0.6 },
      style,
    ];
  };

  const getTextStyle = () => {
    const baseTextStyle = variant === 'primary' ? globalStyles.buttonText : globalStyles.secondaryButtonText;
    const sizeTextStyle = {
      small: { fontSize: rf(14) },
      medium: { fontSize: rf(16) },
      large: { fontSize: rf(18) },
    };

    return [baseTextStyle, sizeTextStyle[size], textStyle];
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : '#196126'} size="small" />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {icon && (
            <Ionicons
              name={icon as any}
              size={iconSizes.small}
              color={variant === 'primary' ? '#fff' : '#196126'}
              style={{ marginRight: wp(2) }}
            />
          )}
          <Text style={getTextStyle()}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// Responsive Input Component
interface ResponsiveInputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

export const ResponsiveInput: React.FC<ResponsiveInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  labelStyle,
  ...props
}) => {
  const { theme } = useTheme();
  const themedStyles = createThemedStyles(theme);
  const iconSizes = getIconSize();

  return (
    <View style={[globalStyles.inputContainer, containerStyle]}>
      {label && (
        <Text style={[themedStyles.inputLabel, labelStyle]}>{label}</Text>
      )}
      
      <View style={{ position: 'relative' }}>
        {leftIcon && (
          <Ionicons
            name={leftIcon as any}
            size={iconSizes.small}
            color={theme === 'dark' ? '#a3a3a3' : '#9ca3af'}
            style={{
              position: 'absolute',
              left: wp(3),
              top: hp(1.8),
              zIndex: 1,
            }}
          />
        )}
        
        <TextInput
          style={[
            themedStyles.input,
            leftIcon && { paddingLeft: wp(10) },
            rightIcon && { paddingRight: wp(10) },
            inputStyle,
          ]}
          placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
          {...props}
        />
        
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={{
              position: 'absolute',
              right: wp(3),
              top: hp(1.8),
            }}
          >
            <Ionicons
              name={rightIcon as any}
              size={iconSizes.small}
              color={theme === 'dark' ? '#a3a3a3' : '#9ca3af'}
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text style={globalStyles.inputError}>{error}</Text>
      )}
    </View>
  );
};

// Responsive Card Component
interface ResponsiveCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'small';
  style?: ViewStyle;
  onPress?: () => void;
}

export const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  children,
  variant = 'default',
  style,
  onPress,
}) => {
  const { theme } = useTheme();
  const themedStyles = createThemedStyles(theme);

  const cardStyle = variant === 'small' ? themedStyles.cardSmall : themedStyles.card;

  if (onPress) {
    return (
      <TouchableOpacity style={[cardStyle, style]} onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[cardStyle, style]}>{children}</View>;
};

// Responsive Text Components
interface ResponsiveTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  color?: string;
  numberOfLines?: number;
}

export const Heading1: React.FC<ResponsiveTextProps> = ({ children, style, color, ...props }) => {
  const { theme } = useTheme();
  const themedStyles = createThemedStyles(theme);
  return <Text style={[themedStyles.heading1, color && { color }, style]} {...props}>{children}</Text>;
};

export const Heading2: React.FC<ResponsiveTextProps> = ({ children, style, color, ...props }) => {
  const { theme } = useTheme();
  const themedStyles = createThemedStyles(theme);
  return <Text style={[themedStyles.heading2, color && { color }, style]} {...props}>{children}</Text>;
};

export const Heading3: React.FC<ResponsiveTextProps> = ({ children, style, color, ...props }) => {
  const { theme } = useTheme();
  const themedStyles = createThemedStyles(theme);
  return <Text style={[themedStyles.heading3, color && { color }, style]} {...props}>{children}</Text>;
};

export const BodyText: React.FC<ResponsiveTextProps> = ({ children, style, color, ...props }) => {
  const { theme } = useTheme();
  const themedStyles = createThemedStyles(theme);
  return <Text style={[themedStyles.bodyMedium, color && { color }, style]} {...props}>{children}</Text>;
};

export const SmallText: React.FC<ResponsiveTextProps> = ({ children, style, color, ...props }) => {
  const { theme } = useTheme();
  const themedStyles = createThemedStyles(theme);
  return <Text style={[themedStyles.bodySmall, color && { color }, style]} {...props}>{children}</Text>;
};

export const CaptionText: React.FC<ResponsiveTextProps> = ({ children, style, color, ...props }) => {
  const { theme } = useTheme();
  const themedStyles = createThemedStyles(theme);
  return <Text style={[themedStyles.caption, color && { color }, style]} {...props}>{children}</Text>;
};

// Loading Component
interface LoadingProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({ size = 'large', color, text }) => {
  const { theme } = useTheme();
  const themedStyles = createThemedStyles(theme);

  return (
    <View style={globalStyles.loadingContainer}>
      <ActivityIndicator size={size} color={color || '#196126'} />
      {text && (
        <Text style={[themedStyles.bodyMedium, { marginTop: hp(2), textAlign: 'center' }]}>
          {text}
        </Text>
      )}
    </View>
  );
};

// Empty State Component
interface EmptyStateProps {
  image?: any;
  title: string;
  description?: string;
  actionButton?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  image,
  title,
  description,
  actionButton,
}) => {
  const { theme } = useTheme();
  const themedStyles = createThemedStyles(theme);

  return (
    <View style={globalStyles.emptyState}>
      {image && (
        <Image source={image} style={globalStyles.emptyStateImage} resizeMode="contain" />
      )}
      <Text style={themedStyles.emptyStateTitle}>{title}</Text>
      {description && (
        <Text style={themedStyles.emptyStateDescription}>{description}</Text>
      )}
      {actionButton && <View style={{ marginTop: hp(3) }}>{actionButton}</View>}
    </View>
  );
};

// Responsive Modal Component
interface ResponsiveModalProps extends ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
  title?: string;
  size?: 'small' | 'medium' | 'large';
}

export const ResponsiveModal: React.FC<ResponsiveModalProps> = ({
  children,
  onClose,
  title,
  size = 'medium',
  ...props
}) => {
  const { theme } = useTheme();
  const themedStyles = createThemedStyles(theme);

  const sizeStyles = {
    small: { width: wp(75), maxHeight: hp(50) },
    medium: { width: wp(85), maxHeight: hp(70) },
    large: { width: wp(95), maxHeight: hp(90) },
  };

  return (
    <Modal transparent animationType="fade" {...props}>
      <View style={globalStyles.modalOverlay}>
        <View style={[themedStyles.modalContent, sizeStyles[size]]}>
          {title && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: hp(2) }}>
              <Heading3>{title}</Heading3>
              {onClose && (
                <TouchableOpacity onPress={onClose}>
                  <Ionicons name="close" size={24} color={theme === 'dark' ? '#fff' : '#000'} />
                </TouchableOpacity>
              )}
            </View>
          )}
          {children}
        </View>
      </View>
    </Modal>
  );
};