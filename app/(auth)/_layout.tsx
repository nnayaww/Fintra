import { SignUpProvider } from "@/context/SignUpContext";
import { useTheme } from "@/lib/ThemeContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

const AuthLayout = () => {
  const { theme } = useTheme();

  return (
    <SignUpProvider>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: theme === "dark" ? "#181A20" : "#ffffff" },
        ]}
        edges={["top", "left", "right"]}
      >
        <StatusBar
          style={theme === "dark" ? "light" : "dark"}
          backgroundColor={theme === "dark" ? "#181A20" : "#ffffff"}
          translucent={true}
        />
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </SignUpProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AuthLayout;
