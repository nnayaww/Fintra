import { formatTransactions } from "@/constants";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

const TransactionDetail = () => {
  const { id, amount, name, avatar, email } = useLocalSearchParams(); // Get the id from the URL
  const transactions = formatTransactions().flatMap((section) => section.data);
  const transaction = transactions.find((t) => t.id === id);
  const [contactImage, setContactImage] = useState<string | null>(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showRequestDeclinedModal, setShowRequestDeclinedModal] =
    useState(false);

  return (
    <View className="flex-1 bg-white">
      <View
        style={{ height: "45%", paddingTop: 30 }}
        className="bg-general w-full p-5"
      >
        <View
          className="flex-row justify-between items-center"
          style={{ marginTop: 20 }}
        >
          <TouchableOpacity
            onPress={() => {
              router.push(
                "/(root)/(home)/(transaction-history)/transaction-history"
              );
            }}
          >
            <Ionicons
              name="arrow-back"
              size={28}
              color="#0D0D0D"
              style={{ padding: 6 }}
            />
          </TouchableOpacity>
          <Text
            className="font-UrbanistBold text-primary"
            style={{ fontSize: 25, marginLeft: -18 }}
          >
            {transaction?.category}
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <SimpleLineIcons
              name="options-vertical"
              size={22}
              color="#0D0D0D"
            />
          </TouchableOpacity>
        </View>
        <View className="flex items-center gap-5 mt-8">
          <View
            className="rounded-full flex items-center justify-center bg-[#F6F8FA]"
            style={{ width: 90, height: 90 }}
          >
            {contactImage ? (
              <>
                <Image
                  source={{ uri: contactImage }}
                  style={{ width: 90, height: 90 }}
                  resizeMode="cover"
                />
              </>
            ) : (
              <FontAwesome5 name="user-alt" size={26} color="#9CA3AF" />
            )}
          </View>
          <View className="flex-row gap-2 justify-center">
            <Text
              className="font-UrbanistBold text-primary"
              style={{ fontSize: 40 }}
            >
              {transaction?.category === "Income"
                ? `+ ${Number(transaction?.amount).toFixed(2)}`
                : transaction?.category === "Sent"
                ? `- ${Number(transaction?.amount).toFixed(2)}`
                : transaction?.category === "Incoming Request"
                ? `${Number(transaction?.amount).toFixed(2)}`
                : `${Number(transaction?.amount).toFixed(2)}`}
            </Text>
            <FontAwesome6
              name="cedi-sign"
              size={20}
              color="#0D0D0D"
              style={{ marginTop: 16 }}
            />
          </View>
          <View className="flex gap-3 items-center">
            <Text className="font-UrbanistBold" style={{ fontSize: 26 }}>
              {transaction?.name}
            </Text>
            <Text className="font-UrbanistMedium" style={{ fontSize: 19 }}>
              {transaction?.email}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex mt-5">
        <Row label="You sent" value={`₵ ${transaction?.amount.toFixed(2)}`} />
        <Row label="To" value={transaction?.name} />
        <Row label="Email" value={transaction?.email} />
        {transaction?.category === "Incoming Request" && (
          <Row label="Status" value={transaction?.status} />
        )}
        <Row label="Date" value={transaction?.date} />
        <Row label="Transaction ID" value={transaction?.transactionId} />
        <Row label="Reference ID" value={transaction?.referenceId} />
      </View>
      {transaction?.category === "Incoming Request" &&
      transaction?.status === "Unpaid" ? (
        <View
          className="flex-row gap-4 items-center"
          style={{ position: "absolute", right: 20, left: 20, bottom: 36 }}
        >
          <TouchableOpacity
            onPress={() => {
              setShowDeclineModal(true);
            }}
            className="bg-white flex-1 items-center justify-center p-5 border-[1.5px] border-general rounded-full"
          >
            <Text className="font-UrbanistSemiBold text-xl text-primary">
              Decline
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowAcceptModal(true);
            }}
            className="bg-general flex-1 items-center justify-center p-5 border-none rounded-full"
          >
            <Text className="font-UrbanistSemiBold text-xl text-primary">
              Accept
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            position: "absolute",
            left: 20,
            right: 20,
            bottom: 36,
            paddingHorizontal: 6,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              router.push(
                `/(root)/(home)/(transaction-history)/receipt?id=${id}`
              )
            }
            className="flex items-center rounded-full p-5"
            style={{
              borderStyle: "solid",
              borderWidth: 1.5,
              borderColor: "#82E394",
            }}
          >
            <Text className="font-UrbanistBold text-primary text-xl">
              View Receipt
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        isVisible={showAcceptModal}
        onBackdropPress={() => setShowAcceptModal(false)}
        onSwipeComplete={() => setShowAcceptModal(false)}
        swipeDirection="down"
        style={{ justifyContent: "flex-end", margin: 0 }}
        propagateSwipe
      >
        <View
          style={{
            height: "64%",
            width: "100%",
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 10,
            gap: 10,
          }}
        >
          {/* Optional: Add a swipe indicator */}
          <View
            style={{
              width: 40,
              height: 3,
              backgroundColor: "#ccc",
              borderRadius: 3,
              alignSelf: "center",
            }}
          />
          <View className="flex mt-2 self-center">
            <Text className="font-UrbanistBold" style={{ fontSize: 24 }}>
              Accept Request
            </Text>
          </View>
          <View
            className="h-[1px] self-center"
            style={{ width: "90%", backgroundColor: "#e6e6e6", marginTop: 8 }}
          />
          <View
            className="bg-[#F6F8FA] flex items-center justify-center gap-5 self-center mt-3 rounded-lg"
            style={{ width: "90%", height: "35%" }}
          >
            <Text className="text-secondary text-xl font-UrbanistMedium">
              Amount requested
            </Text>
            <Text
              className="font-UrbanistBold text-primary"
              style={{ fontSize: 34 }}
            >
              {`₵ ${Number(transaction?.amount).toFixed(2)}`}
            </Text>
            <Text className="text-secondary text-md font-UrbanistMedium">
              This amount will be charged from your balance
            </Text>
          </View>
          <View>
            <View
              className="flex-row px-4 items-center gap-4"
              style={{ marginTop: 5 }}
            >
              <Text
                className="font-UrbanistSemiBold text-xl"
                style={{ color: "#8f949b" }}
              >
                Send to
              </Text>
              <View
                className="h-[1px]"
                style={{ width: "78%", backgroundColor: "#e6e6e6" }}
              />
            </View>
            <View className="flex-row py-3 items-center">
              <View
                className="rounded-full flex items-center justify-center bg-[#F6F8FA]"
                style={{ width: 70, height: 70 }}
              >
                {contactImage ? (
                  <>
                    <Image
                      source={{ uri: contactImage }}
                      style={{ width: 70, height: 70 }}
                      resizeMode="cover"
                    />
                  </>
                ) : (
                  <FontAwesome5 name="user-alt" size={21} color="#9CA3AF" />
                )}
              </View>
              <View className="gap-2 ml-4">
                <Text className="font-UrbanistBold" style={{ fontSize: 20 }}>
                  {transaction?.name}
                </Text>
                <Text
                  className="font-UrbanistMedium text-secondary"
                  style={{ fontSize: 16 }}
                >
                  {transaction?.email}
                </Text>
              </View>
            </View>
            <View
              className="h-[1px] self-center"
              style={{ width: "90%", backgroundColor: "#e6e6e6", marginTop: 4 }}
            />
          </View>
          <View
            className="flex-row gap-4"
            style={{ position: "absolute", right: 20, left: 20, bottom: 26 }}
          >
            <TouchableOpacity
              onPress={() => {
                setShowAcceptModal(false);
              }}
              className="bg-white flex-1 items-center justify-center py-5 border-[1.5px] border-general rounded-full"
            >
              <Text className="font-UrbanistSemiBold text-buttontext text-primary">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowAcceptModal(false);
                router.push({
                  pathname: "/(root)/(home)/(send)/send-money-sent",
                  params: {
                    amount: transaction?.amount,
                    name: transaction?.name,
                    email: transaction?.email,
                  },
                });
              }}
              className="bg-general flex-1 items-center justify-center py-5 border-none rounded-full"
            >
              <Text className="font-UrbanistSemiBold text-buttontext text-primary">
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={showDeclineModal}
        onBackdropPress={() => setShowDeclineModal(false)}
        onSwipeComplete={() => setShowDeclineModal(false)}
        swipeDirection="down"
        style={{ justifyContent: "flex-end", margin: 0 }}
        propagateSwipe
      >
        <View
          style={{
            height: "35%",
            width: "100%",
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
            alignItems: "center",
            gap: 10,
          }}
        >
          {/* Optional: Add a swipe indicator */}
          <View
            style={{
              width: 40,
              height: 3,
              backgroundColor: "#ccc",
              borderRadius: 3,
              alignSelf: "center",
            }}
          />
          {/* Your modal content */}
          <View style={{ marginTop: 10 }}>
            <Text
              style={{ fontSize: 24 }}
              className="font-UrbanistBold text-primary"
            >
              Decline Request
            </Text>
          </View>
          <View
            className="h-[1px]"
            style={{ width: "100%", backgroundColor: "#e6e6e6", marginTop: 14 }}
          />
          <View style={{ marginTop: 26 }}>
            <Text
              className="font-UrbanistSemiBold text-primary"
              style={{ fontSize: 20 }}
            >
              Decline request of {`₵ ${transaction?.amount}`} from{" "}
              {transaction?.name}?
            </Text>
          </View>
          <View
            className="flex-row w-full gap-4 mt-4"
            style={{ position: "absolute", bottom: 30 }}
          >
            <TouchableOpacity
              onPress={() => setShowDeclineModal(false)}
              className="bg-white flex-1 items-center justify-center py-5 border-[1.5px] border-general rounded-full"
            >
              <Text className="font-UrbanistSemiBold text-xl text-primary">
                No, don't decline
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowDeclineModal(false);
                setShowRequestDeclinedModal(true);
              }}
              className="bg-general flex-1 items-center justify-center py-5 border-none rounded-full"
            >
              <Text className="font-UrbanistSemiBold text-primary text-xl">
                Yes, Decline
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={showRequestDeclinedModal}
        onBackdropPress={() => setShowRequestDeclinedModal(false)}
        onSwipeComplete={() => setShowRequestDeclinedModal(false)}
        swipeDirection="down"
        style={{ justifyContent: "flex-end", margin: 0 }}
        propagateSwipe
      >
        <View
          style={{
            height: "25%",
            width: "100%",
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
            alignItems: "center",
            gap: 10,
          }}
        >
          {/* Optional: Add a swipe indicator */}
          <View
            style={{
              width: 40,
              height: 3,
              backgroundColor: "#ccc",
              borderRadius: 3,
              alignSelf: "center",
            }}
          />
          {/* Your modal content */}
          <View className="mt-6 flex items-center">
            <View
              style={{
                width: 80,
                height: 80,
                backgroundColor: "#82E394",
                borderStyle: "solid",
                borderWidth: 2,
                borderColor: "#0D0D0D",
              }}
              className="rounded-full border flex items-center justify-center"
            >
              <FontAwesome6 name="check" size={34} color="#0D0D0D" />
            </View>
            <Text
              className="font-UrbanistSemiBold self-center mt-4 text-primary"
              style={{ fontSize: 20 }}
            >
              Request declined!
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TransactionDetail;

function Row({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) {
  return (
    <View className="flex-row justify-between items-center px-6 my-3">
      <Text className="font-UrbanistMedium text-secondary text-xl">
        {label}
      </Text>
      {label === "Status" && value === "Paid" ? (
        <View className="p-3 bg-general rounded-md">
          <Text className="font-UrbanistBold text-xl text-primary">
            {value}
          </Text>
        </View>
      ) : label === "Status" && (value === "Declined" || value === "Unpaid") ? (
        <View className="p-3 bg-[#f54f4f] rounded-md">
          <Text className="font-UrbanistBold text-xl text-white">{value}</Text>
        </View>
      ) : (
        <Text className="font-UrbanistBold text-xl text-primary">{value}</Text>
      )}
    </View>
  );
}
