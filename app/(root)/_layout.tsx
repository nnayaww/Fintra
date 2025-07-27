import { useTheme } from "@/lib/ThemeContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

const RootLayout = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#181A20" : "#ffffff" },
      ]}
      edges={['top', 'left', 'right']} // Avoid bottom edge if you have a tab bar
    >
      <StatusBar
        style={theme === "dark" ? "light" : "dark"}
        backgroundColor={theme === "dark" ? "#181A20" : "#ffffff"}
        translucent={true}
      />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RootLayout;
