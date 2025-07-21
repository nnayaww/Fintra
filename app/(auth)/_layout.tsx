import { SignUpProvider } from "@/context/SignUpContext";
import { useTheme } from "@/lib/ThemeContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  const { theme } = useTheme();
  return (
    <SignUpProvider>
      <StatusBar
        style={theme === "dark" ? "light" : "dark"}
        backgroundColor={theme === "dark" ? "#181A20" : "#ffffff"}
        translucent={true}
      />
      <Stack screenOptions={{ headerShown: false }} />
    </SignUpProvider>
  );
};

export default AuthLayout;
