import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CountryCard = (props: {
  name: any;
  flag: any;
  code: any;
  selected: boolean;
  onPress: () => void;
}) => {
  const { name, flag, code, selected, onPress } = props;

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          borderWidth: 2,
          borderColor: selected ? "#0D0D0D" : "#ebedf0",
          gap: 14,
          marginTop: 20,
        }}
        className="flex-row items-center bg-[#F6F8FA] w-full p-5 border rounded-lg"
      >
        <Image source={{ uri: flag }} style={{ width: 65, height: 45 }} />
        <Text
          className="font-UrbanistSemiBold text-primary"
          style={{ fontSize: 18 }}
        >
          {name}
        </Text>
        <FontAwesome6
          name="check"
          size={24}
          color={selected ? "#0D0D0D" : "transparent"}
          style={{ position: "absolute", right: 24 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CountryCard;
