import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const PaymentMethodCard = (props: {
  id: any;
  name: any;
  status: any;
  number: any;
  image: any;
  selected: boolean;
  onPress: () => void;
}) => {
  const { id, name, status, number, image, selected, onPress } = props;

  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          borderWidth: 2,
          borderColor: selected ? "#0D0D0D" : "#ebedf0",
          gap: 14,
          marginTop: 20,
        }}
        className="flex-row items-center bg-[#F6F8FA] w-full p-5 border rounded-lg"
      >
        <Image
          source={image}
          style={{ width: 55, height: 55, borderRadius: 9999 }}
        />
        {name === "Mastercard" || name === "Visa" ? (
          <Text
            className="font-UrbanistBold text-primary"
            style={{ fontSize: 15 }}
          >
            {number}
          </Text>
        ) : (
          <Text
            className="font-UrbanistBold text-primary"
            style={{ fontSize: 19 }}
          >
            {name}
          </Text>
        )}
        <FontAwesome6
          name="check"
          size={24}
          color={selected ? "#0D0D0D" : "transparent"}
          style={{ position: "absolute", right: 24 }}
        />
        <Text
          className="font-UrbanistBold text-[#196126]"
          style={{ fontSize: 18, position: "absolute", right: 24 }}
        >
          {status}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentMethodCard;
