/**
 * Examples and Documentation for the Global Responsive System
 * 
 * This file shows how to use the global responsive components and styles
 * across all screens in the app for consistent, responsive design.
 */

import React from 'react';
import { View } from 'react-native';
import {
  ResponsiveSafeArea,
  ScreenContainer,
  ResponsiveHeader,
  ResponsiveButton,
  ResponsiveInput,
  ResponsiveCard,
  Heading1,
  Heading2,
  Heading3,
  BodyText,
  SmallText,
  CaptionText,
  Loading,
  EmptyState,
  ResponsiveModal,
} from './ResponsiveComponents';
import { useResponsiveTheme, useColors, useThemedStyles } from '@/lib/ResponsiveThemeProvider';
import { globalStyles } from '@/lib/globalStyles';

// Example: Complete Login Screen using global system
export const ResponsiveLoginExample = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  
  const { theme } = useResponsiveTheme();
  const colors = useColors();

  const handleLogin = () => {
    setLoading(true);
    // Login logic here
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <ResponsiveSafeArea>
      <ScreenContainer scrollable>
        <ResponsiveHeader
          title="Sign In"
          onBack={() => console.log('Go back')}
        />
        
        <View style={globalStyles.formContainer}>
          <Heading1>Welcome back 👋</Heading1>
          <BodyText>Please enter your email & password to sign in.</BodyText>
          
          <ResponsiveInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            leftIcon="mail"
          />
          
          <ResponsiveInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            leftIcon="lock-closed"
            rightIcon={showPassword ? "eye-off" : "eye"}
            onRightIconPress={() => setShowPassword(!showPassword)}
          />
          
          <ResponsiveButton
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            style={globalStyles.marginVerticalMedium}
          />
          
          <ResponsiveButton
            title="Create Account"
            variant="secondary"
            onPress={() => console.log('Sign up')}
          />
        </View>
      </ScreenContainer>
    </ResponsiveSafeArea>
  );
};

// Example: Card-based List Screen
export const ResponsiveListExample = () => {
  const colors = useColors();
  const transactions = [
    { id: 1, title: 'Coffee Shop', amount: -4.50, date: 'Today' },
    { id: 2, title: 'Salary', amount: 2500.00, date: 'Yesterday' },
    { id: 3, title: 'Gas Station', amount: -45.20, date: '2 days ago' },
  ];

  return (
    <ResponsiveSafeArea>
      <ScreenContainer>
        <ResponsiveHeader title="Transactions" />
        
        <View style={globalStyles.screenPadding}>
          <Heading2 style={globalStyles.marginVerticalMedium}>
            Recent Transactions
          </Heading2>
          
          {transactions.map((transaction) => (
            <ResponsiveCard key={transaction.id} onPress={() => console.log('Transaction details')}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <Heading3>{transaction.title}</Heading3>
                  <SmallText>{transaction.date}</SmallText>
                </View>
                <BodyText
                  color={transaction.amount > 0 ? colors.success : colors.error}
                  style={{ fontWeight: 'bold' }}
                >
                  ${Math.abs(transaction.amount).toFixed(2)}
                </BodyText>
              </View>
            </ResponsiveCard>
          ))}
        </View>
      </ScreenContainer>
    </ResponsiveSafeArea>
  );
};

// Example: Form Screen with validation
export const ResponsiveFormExample = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setLoading(true);
      // Submit logic here
      setTimeout(() => setLoading(false), 2000);
    }
  };

  return (
    <ResponsiveSafeArea>
      <ScreenContainer scrollable>
        <ResponsiveHeader
          title="Personal Info"
          onBack={() => console.log('Go back')}
        />
        
        <View style={globalStyles.formContainer}>
          <Heading2>Update Your Information</Heading2>
          <BodyText>Please fill in all required fields.</BodyText>
          
          <ResponsiveInput
            label="Full Name *"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Enter your full name"
            error={errors.name}
            leftIcon="person"
          />
          
          <ResponsiveInput
            label="Email Address *"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            placeholder="Enter your email"
            keyboardType="email-address"
            error={errors.email}
            leftIcon="mail"
          />
          
          <ResponsiveInput
            label="Phone Number *"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            error={errors.phone}
            leftIcon="call"
          />
          
          <View style={globalStyles.marginVerticalLarge}>
            <ResponsiveButton
              title="Update Information"
              onPress={handleSubmit}
              loading={loading}
              size="large"
            />
          </View>
        </View>
      </ScreenContainer>
    </ResponsiveSafeArea>
  );
};

// Example: Empty State Screen
export const ResponsiveEmptyStateExample = () => {
  return (
    <ResponsiveSafeArea>
      <ScreenContainer>
        <ResponsiveHeader title="Notifications" />
        
        <EmptyState
          title="No Notifications"
          description="You're all caught up! We'll notify you when something new happens."
          actionButton={
            <ResponsiveButton
              title="Refresh"
              onPress={() => console.log('Refresh')}
              variant="secondary"
            />
          }
        />
      </ScreenContainer>
    </ResponsiveSafeArea>
  );
};

// Example: Modal usage
export const ResponsiveModalExample = () => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <ResponsiveSafeArea>
      <ScreenContainer>
        <ResponsiveHeader title="Modal Example" />
        
        <View style={[globalStyles.centerContainer, globalStyles.screenPadding]}>
          <ResponsiveButton
            title="Show Modal"
            onPress={() => setShowModal(true)}
          />
        </View>
        
        <ResponsiveModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          title="Confirmation"
          size="medium"
        >
          <View>
            <BodyText style={globalStyles.marginVerticalMedium}>
              Are you sure you want to proceed with this action?
            </BodyText>
            
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <ResponsiveButton
                title="Cancel"
                variant="secondary"
                onPress={() => setShowModal(false)}
                style={{ flex: 1 }}
              />
              <ResponsiveButton
                title="Confirm"
                onPress={() => {
                  console.log('Confirmed');
                  setShowModal(false);
                }}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </ResponsiveModal>
      </ScreenContainer>
    </ResponsiveSafeArea>
  );
};

/**
 * HOW TO USE THE GLOBAL RESPONSIVE SYSTEM:
 * 
 * 1. Wrap your app with ResponsiveThemeProvider:
 *    <ResponsiveThemeProvider>
 *      <YourApp />
 *    </ResponsiveThemeProvider>
 * 
 * 2. Use responsive components instead of regular React Native components:
 *    - ResponsiveSafeArea instead of SafeAreaView
 *    - ScreenContainer instead of View for screen containers
 *    - ResponsiveButton instead of TouchableOpacity for buttons
 *    - ResponsiveInput instead of TextInput
 *    - Heading1, Heading2, etc. instead of Text with custom styles
 * 
 * 3. Use responsive styles from globalStyles:
 *    import { globalStyles } from '@/lib/globalStyles';
 *    <View style={globalStyles.screenPadding}>
 * 
 * 4. Use responsive theme hooks:
 *    const colors = useColors();
 *    const styles = useThemedStyles();
 *    const { isSmallScreen, isTablet } = useDeviceInfo();
 * 
 * 5. For custom responsive dimensions:
 *    import { wp, hp, rf, rs } from '@/lib/responsive';
 *    width: wp(80), // 80% of screen width
 *    height: hp(10), // 10% of screen height
 *    fontSize: rf(16), // responsive font size
 *    padding: rs(12), // responsive spacing
 */