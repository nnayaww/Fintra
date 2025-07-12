import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SignUpIDCardPhoto = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState("");
  const { name } = useLocalSearchParams();

  const pickImage = async () => {
    // Ask for permission
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }
    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1586, 1000], // ID-1 card aspect ratio
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
      setPhotoError(""); // Clear error when image is picked
    }
  };

  return (
    <SafeAreaView
      className="flex-1 p-5 gap-10"
      style={{ backgroundColor: "#181A20" }}
    >
      <StatusBar style="light" backgroundColor="transparent" />
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/SignUp-ProofofResidency");
        }}
      >
        <Ionicons
          name="arrow-back"
          size={28}
          color="white"
          style={{ padding: 6, marginTop: 22 }}
        />
      </TouchableOpacity>
      <View className="flex" style={{ gap: 30 }}>
        <Text
          className="font-UrbanistBold text-3xl text-center"
          style={{ color: "white" }}
        >
          Photo of your ID Card
        </Text>
        <Text
          className="font-UrbanistMedium text-lg text-center"
          style={{ color: "white" }}
        >
          Please upload photo of your ID card
        </Text>
      </View>
      <View className="flex items-center">
        <View
          className="flex w-full justify-center items-center"
          style={{
            height: 225,
            backgroundColor: "lightgray",
            marginTop: 54,
          }}
        >
          {profileImage ? (
            <>
              <Image
                source={{ uri: profileImage }}
                style={{ height: 225 }}
                resizeMode="cover"
                className="w-full"
              />
              {/* Remove button (shows only when image is set) */}
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "#fff",
                  borderRadius: 12,
                  padding: 2,
                  elevation: 2,
                }}
                onPress={() => setProfileImage(null)}
              >
                <MaterialCommunityIcons
                  name="close-circle"
                  size={28}
                  color="#E53E3E"
                />
              </TouchableOpacity>
            </>
          ) : (
            <MaterialIcons name="photo" size={100} color="gray" />
          )}
        </View>
        {photoError ? (
          <Text
            style={{
              color: "#E53E3E",
              marginTop: 12,
              fontSize: 16,
              fontFamily: "Urbanist-Medium",
            }}
          >
            {photoError}
          </Text>
        ) : null}
      </View>
      <View
        style={{
          gap: 20,
          position: "absolute",
          bottom: 180,
          right: 146,
        }}
      >
        <TouchableOpacity
          className="rounded-full flex items-center justify-center border"
          style={{
            width: 90,
            height: 90,
            backgroundColor: "white",
          }}
          onPress={pickImage}
        >
          <MaterialIcons name="photo" size={38} color="#196126" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: "absolute",
          left: 20,
          right: 20,
          bottom: 48,
        }}
      >
        <TouchableOpacity
          className="bg-general flex items-center justify-center p-5 border-none rounded-full"
          onPress={() => {
            if (!profileImage) {
              setPhotoError("Please upload ID Card photo");
            } else {
              setPhotoError("");
              router.push({
                pathname: "/(auth)/SignUp-CompleteUserProfile",
                params: { name },
              });
            }
          }}
        >
          <Text className="font-UrbanistSemiBold text-buttontext text-primary">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUpIDCardPhoto;
