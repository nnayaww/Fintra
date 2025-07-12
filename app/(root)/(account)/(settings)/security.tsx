import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Switch } from "react-native-switch";

const Security = () => {
  const [isRememberMeEnabled, setIsRememberMeEnabled] = useState(true);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isFaceIDEnabled, setIsFaceIDEnabled] = useState(false);
  const [isSMSEnabled, setIsSMSEnabled] = useState(false);
  const [isGoogleEnabled, setIsGoogleEnabled] = useState(false);

  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex-row items-center mt-3">
        <TouchableOpacity
          onPress={() => {
            router.replace("/(root)/(tabs)/account");
          }}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#0D0D0D"
            style={{ padding: 6, marginTop: 22 }}
          />
        </TouchableOpacity>
        <Text
          className="font-UrbanistBold text-3xl text-primary mt-5"
          style={{ marginHorizontal: 80 }}
        >
          Security
        </Text>
      </View>
      <View className="flex p-2 mt-5" style={{ gap: 30 }}>
        <View className="flex-row justify-between items-center">
          <Text
            className="font-UrbanistSemiBold text-primary"
            style={{ fontSize: 19, width: "70%" }}
          >
            Remember Me
          </Text>
          <Switch
            value={isRememberMeEnabled}
            onValueChange={setIsRememberMeEnabled}
            disabled={false}
            circleSize={28} // Thumb size
            circleBorderWidth={0}
            barHeight={32} // Track height
            backgroundActive={"#82E394"}
            backgroundInactive={"#e6e6e6"}
            circleActiveColor={"#fff"}
            circleInActiveColor={"#fff"}
            changeValueImmediately={true}
            innerCircleStyle={{
              alignItems: "center",
              justifyContent: "center",
            }} // Custom thumb style
            renderActiveText={false}
            renderInActiveText={false}
          />
        </View>
        <View className="flex-row justify-between items-center">
          <Text
            className="font-UrbanistSemiBold text-primary"
            style={{ fontSize: 19, width: "70%" }}
          >
            Biometric ID
          </Text>
          <Switch
            value={isBiometricEnabled}
            onValueChange={setIsBiometricEnabled}
            disabled={false}
            circleSize={28} // Thumb size
            circleBorderWidth={0}
            barHeight={32} // Track height
            backgroundActive={"#82E394"}
            backgroundInactive={"#e6e6e6"}
            circleActiveColor={"#fff"}
            circleInActiveColor={"#fff"}
            changeValueImmediately={true}
            innerCircleStyle={{
              alignItems: "center",
              justifyContent: "center",
            }} // Custom thumb style
            renderActiveText={false}
            renderInActiveText={false}
          />
        </View>
        <View className="flex-row justify-between items-center">
          <Text
            className="font-UrbanistSemiBold text-primary"
            style={{ fontSize: 19, width: "70%" }}
          >
            Face ID
          </Text>
          <Switch
            value={isFaceIDEnabled}
            onValueChange={setIsFaceIDEnabled}
            disabled={false}
            circleSize={28} // Thumb size
            circleBorderWidth={0}
            barHeight={32} // Track height
            backgroundActive={"#82E394"}
            backgroundInactive={"#e6e6e6"}
            circleActiveColor={"#fff"}
            circleInActiveColor={"#fff"}
            changeValueImmediately={true}
            innerCircleStyle={{
              alignItems: "center",
              justifyContent: "center",
            }} // Custom thumb style
            renderActiveText={false}
            renderInActiveText={false}
          />
        </View>
        <View className="flex-row justify-between items-center">
          <Text
            className="font-UrbanistSemiBold text-primary"
            style={{ fontSize: 19, width: "70%" }}
          >
            SMS Authenticator
          </Text>
          <Switch
            value={isSMSEnabled}
            onValueChange={setIsSMSEnabled}
            disabled={false}
            circleSize={28} // Thumb size
            circleBorderWidth={0}
            barHeight={32} // Track height
            backgroundActive={"#82E394"}
            backgroundInactive={"#e6e6e6"}
            circleActiveColor={"#fff"}
            circleInActiveColor={"#fff"}
            changeValueImmediately={true}
            innerCircleStyle={{
              alignItems: "center",
              justifyContent: "center",
            }} // Custom thumb style
            renderActiveText={false}
            renderInActiveText={false}
          />
        </View>
        <View className="flex-row justify-between items-center">
          <Text
            className="font-UrbanistSemiBold text-primary"
            style={{ fontSize: 19, width: "70%" }}
          >
            Google Authenticator
          </Text>
          <Switch
            value={isGoogleEnabled}
            onValueChange={setIsGoogleEnabled}
            disabled={false}
            circleSize={28} // Thumb size
            circleBorderWidth={0}
            barHeight={32} // Track height
            backgroundActive={"#82E394"}
            backgroundInactive={"#e6e6e6"}
            circleActiveColor={"#fff"}
            circleInActiveColor={"#fff"}
            changeValueImmediately={true}
            innerCircleStyle={{
              alignItems: "center",
              justifyContent: "center",
            }} // Custom thumb style
            renderActiveText={false}
            renderInActiveText={false}
          />
        </View>
        <View className="flex-row justify-between items-center">
          <TouchableOpacity
            className="flex-row justify-between items-center w-full"
            onPress={() => {}}
          >
            <Text
              className="font-UrbanistSemiBold text-primary"
              style={{ fontSize: 19, width: "70%" }}
            >
              Device Management
            </Text>
            <MaterialCommunityIcons
              name="greater-than"
              size={25}
              color="#0D0D0D"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="bg-white flex items-center justify-center p-5 border rounded-full"
          style={{
            borderStyle: "solid",
            borderWidth: 1.5,
            borderColor: "#82E394",
          }}
          onPress={() => {}}
        >
          <Text className="font-UrbanistSemiBold text-buttontext text-primary">
            Change Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Security;
