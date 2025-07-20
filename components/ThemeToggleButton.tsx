import { useTheme } from "@/lib/ThemeContext";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import {
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      className="flex-row justify-between items-center p-3 w-full"
    >
      <Feather
        name={theme === "light" ? "moon" : "sun"}
        size={24}
        color={theme === "light" ? "#616161" : "#fff"}
        style={{ marginTop: 2, marginLeft: 11 }}
      />
      <Text
        className={`font-UrbanistBold ${theme === "dark" ? "text-dark-primary" : "text-primary"}`}
        style={{ fontSize: 18, marginLeft: -130 }}
      >
        Dark Mode
      </Text>
      <Switch value={theme === "dark"} onValueChange={toggleTheme} />
    </TouchableOpacity>
  );
};

export default ThemeToggleButton;
