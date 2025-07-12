import ProofCard from "@/components/ProofCard";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const SignUpProofofResidency = () => {
  const [selectedProof, setSelectedProof] = useState<string | null>(null);
  const [ProofError, setProofError] = useState("");
  const { name } = useLocalSearchParams();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-white p-5 gap-10">
        <View className="flex-row items-center gap-10">
          <TouchableOpacity
            onPress={() => {
              router.push("/(auth)/SignUp-SelectCountry");
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
              width: "48%",
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
            Proof of residency 💳
          </Text>
          <Text
            className="font-UrbanistMedium text-secondary text-lg -mt-2"
            style={{ width: 320 }}
          >
            Choose a verification method. You will be asked for photo proof of
            residence in the next step.
          </Text>
        </View>
        <View>
          <ProofCard
            icon={
              <MaterialCommunityIcons
                name="card-account-details"
                size={26}
                color="#196126"
              />
            }
            label="National Identity Card"
            selected={selectedProof === "national_id"}
            onPress={() => {
              setSelectedProof("national_id");
              setProofError("");
            }}
          />
          <ProofCard
            icon={
              <MaterialCommunityIcons
                name="passport-biometric"
                size={32}
                color="#196126"
              />
            }
            label="Passport"
            selected={selectedProof === "passport"}
            onPress={() => setSelectedProof("passport")}
          />
          <ProofCard
            icon={
              <FontAwesome name="drivers-license" size={24} color="#196126" />
            }
            label="Driver License"
            selected={selectedProof === "driver_license"}
            onPress={() => setSelectedProof("driver_license")}
          />
          {ProofError ? (
            <Text
              style={{
                color: "#E53E3E",
                marginLeft: 8,
                marginTop: 12,
                fontSize: 16,
                fontFamily: "Urbanist-Medium",
              }}
            >
              {ProofError}
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
            onPress={() => {
              if (!selectedProof) {
                setProofError("Please select a verification method");
              } else {
                setProofError("");
                router.push({
                  pathname: "/(auth)/SignUp-IDCardPhoto",
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
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUpProofofResidency;
