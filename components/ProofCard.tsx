import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ProofCard = (props: {
  icon: any;
  label: any;
  selected: boolean;
  onPress: () => void;
}) => {
  const { icon, label, selected, onPress } = props;

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          borderWidth: 2,
          borderColor: selected ? "#0D0D0D" : "#ebedf0",
          gap: 14,
          marginTop: 18,
        }}
        className="flex-row items-center bg-[#F6F8FA] w-full p-5 border rounded-lg"
      >
        {icon}
        <Text
          className="font-UrbanistSemiBold text-primary"
          style={{ fontSize: 18 }}
        >
          {label}
        </Text>
        <FontAwesome6
          name="check"
          size={22}
          color={selected ? "#0D0D0D" : "transparent"}
          style={{ position: "absolute", right: 24 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProofCard;
