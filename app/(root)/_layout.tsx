import { useTheme } from "@/lib/ThemeContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const RootLayout = () => {
  const { theme } = useTheme();
  return (
    <>
      <StatusBar
        style={theme === "dark" ? "light" : "dark"}
        backgroundColor={theme === "dark" ? "#181A20" : "#ffffff"}
        translucent={true}
      />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
};

export default RootLayout;
