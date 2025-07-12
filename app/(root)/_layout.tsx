import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";

const _Layout = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" backgroundColor="transparent" />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
};

export default _Layout;
