import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TabIcon = ({ source, focused }: { source: any; focused: boolean }) => (
  <Image
    source={source}
    style={{
      width: 28,
      height: 28,
      tintColor: focused ? "#0D0D0D" : "#9CA3AF",
      marginTop: 15,
    }}
    resizeMode="contain"
  />
);

const Layout = () => (
  <SafeAreaView className="flex-1 bg-white" edges={["left", "right", "bottom"]}>
    <StatusBar style="dark" backgroundColor="transparent" />
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0D0D0D",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarShowLabel: true,
        headerShown: false,
        tabBarStyle: {
          height: 80,
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
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} source={icons.scan} />
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
  </SafeAreaView>
);

export default Layout;
