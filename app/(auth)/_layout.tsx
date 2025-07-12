import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";

const _Layout = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" backgroundColor="transparent" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="welcome-GetStarted"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen
          name="SignUp-SelectAccountType"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SignUp-FullName" options={{ headerShown: false }} />
        <Stack.Screen
          name="SignUp-SelectCountry"
          options={{ headerShown: false }}
        />
      </Stack>
      <Stack.Screen
        name="SignUp-ProofofResidency"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp-IDCardPhoto"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      <Stack.Screen name="code-verification" options={{ headerShown: false }} />
      <Stack.Screen
        name="create-new-password"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="SignUp-Successful" options={{ headerShown: false }} />
      <Stack.Screen name="SignUp-SetPINCode" options={{ headerShown: false }} />
      <Stack.Screen name="initial-balance" options={{ headerShown: false }} />
      <Stack.Screen
        name="SignUp-CompleteUserProfile"
        options={{ headerShown: false }}
      />
    </SafeAreaView>
  );
};

export default _Layout;
