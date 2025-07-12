import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const SignUpSelectAccountType = () => {
  return (
    <View className="flex-1 bg-white p-5 gap-10">
      <View className="flex-row items-center gap-10">
        <TouchableOpacity
          onPress={() => {
            router.push("/(auth)/sign-up");
          }}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#0D0D0D"
            style={{ padding: 6, marginTop: 22 }}
          />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: "#e5eaf0",
            width: "60%",
            height: 12,
            borderRadius: 9999,
            marginTop: 22,
          }}
        ></View>
        <View
          style={{
            backgroundColor: "#82E394",
            width: "12%",
            height: 12,
            borderRadius: 9999,
            marginTop: 22,
            position: "absolute",
            left: 75,
          }}
        ></View>
      </View>
      <View className="flex gap-10">
        <Text
          style={{ lineHeight: 40 }}
          className="font-UrbanistBold text-primary text-3xl"
        >
          What kind of account do you want to open? 💳
        </Text>
        <Text className="font-UrbanistMedium text-secondary text-lg -mt-2">
          You can always add another account later.
        </Text>
      </View>
      <TouchableOpacity
        className="flex-row justify-between"
        onPress={() => {
          router.push("/(auth)/SignUp-FullName");
        }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderColor: "#e5eaf0",
            borderRadius: 9999,
            borderStyle: "solid",
            borderWidth: 2,
          }}
          className="flex items-center justify-center"
        >
          <FontAwesome5 name="user-alt" size={24} color="#196126" />
        </View>
        <View className="flex-row items-center" style={{ paddingLeft: 10 }}>
          <View style={{ width: "80%" }}>
            <Text
              className="font-UrbanistBold text-primary text-xl"
              style={{ fontSize: 19 }}
            >
              Personal Account
            </Text>
            <Text
              className="font-UrbanistMedium text-secondary text-lg"
              style={{ marginTop: 6, lineHeight: 26 }}
            >
              Shop, send and receive money around the world at lower costs.
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              router.push("/(auth)/SignUp-FullName");
            }}
            style={{ paddingLeft: 8 }}
          >
            <MaterialCommunityIcons
              name="greater-than"
              size={26}
              color="#616161"
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row justify-between"
        onPress={() => {
          router.push("/(auth)/SignUp-FullName");
        }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderColor: "#e5eaf0",
            borderRadius: 9999,
            borderStyle: "solid",
            borderWidth: 2,
          }}
          className="flex items-center justify-center"
        >
          <FontAwesome name="briefcase" size={24} color="#196126" />
        </View>
        <View className="flex-row items-center" style={{ paddingLeft: 10 }}>
          <View style={{ width: "80%" }}>
            <Text
              className="font-UrbanistBold text-primary text-xl"
              style={{ fontSize: 19 }}
            >
              Business Account
            </Text>
            <Text
              className="font-UrbanistMedium text-secondary text-lg"
              style={{ marginTop: 6, lineHeight: 26 }}
            >
              Grow your business with more advanced features.
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              router.push("/(auth)/SignUp-FullName");
            }}
            style={{ paddingLeft: 8 }}
          >
            <MaterialCommunityIcons
              name="greater-than"
              size={26}
              color="#616161"
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpSelectAccountType;
