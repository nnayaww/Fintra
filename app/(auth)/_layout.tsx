import { Stack } from "expo-router";
import { SignUpProvider } from "./context/SignUpContext";

const AuthLayout = () => {
  return (
    <SignUpProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SignUpProvider>
  );
};

export default AuthLayout;
