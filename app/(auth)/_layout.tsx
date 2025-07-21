import { SignUpProvider } from "@/context/SignUpContext";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <SignUpProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SignUpProvider>
  );
};

export default AuthLayout;
