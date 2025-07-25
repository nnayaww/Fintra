/* eslint-disable react-hooks/rules-of-hooks */
import { useSignUp } from "@/context/SignUpContext";
import { useTheme } from "@/lib/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {
  ResponsiveSafeArea,
  ScreenContainer,
  ResponsiveHeader,
  ResponsiveButton,
  ResponsiveInput,
  Heading1,
  BodyText,
  SmallText,
} from "@/components/ResponsiveComponents";
import { globalStyles } from "@/lib/globalStyles";
import { wp, hp, getIconSize } from "@/lib/responsive";

const signUp = () => {
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [termsError, setTermsError] = useState("");
  const { theme } = useTheme();
  const { email, setEmail, password, setPassword } = useSignUp();

  const handleSignUp = () => {
    let valid = true;
    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }
    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      valid = false;
    } else if (
      !/(?=.*[0-9])(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).+/.test(password)
    ) {
      setPasswordError(
        "Password must include at least 1 number and 1 special character"
      );
      valid = false;
    } else {
      setPasswordError("");
    }
    if (!agree) {
      setTermsError("Terms and Policy not accepted");
      valid = false;
    } else {
      setTermsError("");
    }

    if (valid) {
      router.push("/(auth)/SignUp-SelectAccountType");
    }
  };

  const iconSizes = getIconSize();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <ResponsiveSafeArea>
          <ScreenContainer scrollable scrollProps={{
            keyboardShouldPersistTaps: "handled",
            contentContainerStyle: { flexGrow: 1 }
          }}>
            <ResponsiveHeader
              title="Get Started with Fintra."
              onBack={() => router.back()}
            />
            
            <View style={globalStyles.formContainer}>
              <View style={globalStyles.marginVerticalMedium}>
                <Heading1>Create Account 👨‍💻</Heading1>
                <BodyText style={{ marginTop: hp(2) }}>
                  Please enter your email & password to sign up.
                </BodyText>
              </View>
              
              <ResponsiveInput
                label="Email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) setEmailError("");
                }}
                placeholder="Enter your email"
                keyboardType="email-address"
                leftIcon="mail"
                error={emailError}
                containerStyle={globalStyles.marginVerticalMedium}
              />
              
              <ResponsiveInput
                label="Password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) setPasswordError("");
                }}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                leftIcon="lock-closed"
                rightIcon={showPassword ? "eye-off" : "eye"}
                onRightIconPress={() => setShowPassword(!showPassword)}
                error={passwordError}
                containerStyle={globalStyles.marginVerticalMedium}
              />
              
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: hp(2),
                gap: wp(2)
              }}>
                <TouchableOpacity
                  onPress={() => {
                    setAgree(!agree);
                    if (termsError && !agree) setTermsError("");
                  }}
                  style={{
                    width: wp(6),
                    height: wp(6),
                    borderRadius: wp(1),
                    borderWidth: 1,
                    borderColor: '#196126',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme === 'dark' ? '#181A20' : '#fff'
                  }}
                >
                  {agree && (
                    <View style={{
                      width: wp(6),
                      height: wp(6),
                      borderRadius: wp(1),
                      backgroundColor: '#196126',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Ionicons name="checkmark-sharp" size={iconSizes.small} color="#fff" />
                    </View>
                  )}
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                  <BodyText>
                    I agree to FinTra{" "}
                    <Link
                      href={"/(auth)/terms-and-policy"}
                      style={{ color: '#196126', fontWeight: 'bold' }}
                    >
                      Terms & Policy.
                    </Link>
                  </BodyText>
                </View>
              </View>
              
              {termsError ? (
                <SmallText style={{ color: '#E53E3E', marginBottom: hp(1) }}>
                  {termsError}
                </SmallText>
              ) : null}
              
              <View style={[
                globalStyles.marginVerticalMedium,
                {
                  height: 1,
                  backgroundColor: theme === 'dark' ? '#374151' : '#e5e7eb'
                }
              ]} />
              
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: hp(2)
              }}>
                <BodyText>
                  Already have an account?{"  "}
                </BodyText>
                <Link href="/(auth)/sign-in">
                  <BodyText style={{ color: '#196126', fontWeight: 'bold' }}>
                    Sign in
                  </BodyText>
                </Link>
              </View>
              
              <ResponsiveButton
                title="Sign up"
                onPress={handleSignUp}
                style={globalStyles.marginVerticalMedium}
              />
            </View>
          </ScreenContainer>
        </ResponsiveSafeArea>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default signUp;