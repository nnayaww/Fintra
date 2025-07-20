import { icons } from "@/constants";
import { useTheme } from "@/lib/ThemeContext";
import { Tabs } from "expo-router";
import { Image } from "react-native";

const TabIcon = ({ source, focused }: { source: any; focused: boolean }) => {
  const { theme } = useTheme();
  return (
    <Image
      source={source}
      style={{
        width: 28,
        height: 28,
        tintColor: focused
          ? theme === "dark"
            ? "#fff"
            : "#0D0D0D"
          : theme === "dark"
          ? "#A0A0A0"
          : "#9CA3AF",
        marginTop: 15,
      }}
      resizeMode="contain"
    />
  );
};

const TabsLayout = () => {
  const { theme } = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme === "dark" ? "#fff" : "#0D0D0D",
        tabBarInactiveTintColor: theme === "dark" ? "#A0A0A0" : "#9CA3AF",
        tabBarShowLabel: true,
        headerShown: false,
        tabBarStyle: {
          height: 80,
          backgroundColor: theme === "dark" ? "#121212" : "#fff",
        },
        tabBarLabelStyle: {
          marginTop: 15,
          fontFamily: "Urbanist-Bold",
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              source={focused ? icons.home : icons.homeOutline}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: "Contacts",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              source={focused ? icons.usergroups : icons.usergroupsOutline}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="qr-code"
        options={{
          title: "QR-Code",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.qrcode} />
          ),
        }}
      />
      <Tabs.Screen
        name="crypto"
        options={{
          title: "Crypto",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.bitcoin} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              source={focused ? icons.user : icons.userOutline}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
