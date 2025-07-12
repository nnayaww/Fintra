import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const SignUpFullName = () => {
  const [FullName, setFullName] = useState("");
  const [FullNameFocused, setFullNameFocused] = useState(false);
  const [FullNameError, setFullNameError] = useState("");

  const handleFullName = () => {
    let valid = true;
    if (!FullName.trim()) {
      setFullNameError("This field is required");
      valid = false;
    } else if (!/^[A-Za-z\s]+$/.test(FullName.trim())) {
      setFullNameError("Name can only contain letters and spaces");
      valid = false;
    } else {
      setFullNameError("");
    }
    if (valid) {
      router.push({pathname:"/(auth)/SignUp-SelectCountry", params:{name: FullName}});
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-white p-5 gap-10">
        <View className="flex-row items-center gap-10">
          <TouchableOpacity
            onPress={() => {
              router.push("/(auth)/SignUp-SelectAccountType");
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
              width: "24%",
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
            What is your name? 👤
          </Text>
          <Text className="font-UrbanistMedium text-secondary text-lg -mt-2">
            Enter your full legal name according to the identity card.
          </Text>
        </View>
        <View>
          <Text className="text-2xl font-UrbanistSemiBold">Full Name</Text>
          <TextInput
            value={FullName}
            onChangeText={(text) => {
              setFullName(text);
              if (FullNameError) setFullNameError("");
            }}
            placeholder="Full Name"
            placeholderTextColor="#9CA3AF"
            className="text-xl font-UrbanistSemiBold border-none rounded-lg w-full p-5 bg-[#F6F8FA] text-primary mt-3 opacity-4 focus:outline-none focus:border-blue-400"
            onFocus={() => setFullNameFocused(true)}
            onBlur={() => setFullNameFocused(false)}
          />
          {FullNameError ? (
            <Text
              style={{
                color: "#E53E3E",
                marginLeft: 8,
                marginTop: 4,
                fontSize: 16,
                fontFamily: "Urbanist-Medium",
              }}
            >
              {FullNameError}
            </Text>
          ) : null}
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
            onPress={handleFullName}
          >
            <Text className="font-UrbanistSemiBold text-buttontext text-primary">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUpFullName;
