import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";
import { onboarding } from "../../constants";
import "../global.css";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <View className="flex-1 items-center justify-between bg-white h-full w-full">
      <Swiper
        ref={swiperRef}
        loop={false}
        paginationStyle={{ bottom: "19%" }}
        dot={<View className="w-2 h-2 mx-1.5 bg-[#E2E8F0] rounded-full" />}
        activeDot={<View className="w-10 h-2 mx-1.5 bg-primary rounded-full" />}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex-1 items-center overflow-hidden">
            <View
              className="w-[170%] h-[54%] bg-general border-none shadow rounded-b-[300px] flex justify-center items-center"
              style={{ zIndex: 1 }}
            >
              <Image
                source={item.image}
                style={{ width: 385, height: 380, marginLeft: -14 }}
              />
            </View>
            <View
              key={item.id}
              className="flex justify-center items-center gap-14 p-5"
            >
              {/* Insert your image here */}
              <View className="flex flex-row w-full items-center justify-center">
                <Text className="text-primary text-onboardingmaintext font-UrbanistBold text-center leading-[43px]">
                  {item.title}
                </Text>
              </View>
              <Text className="text-onboardingsubtext font-UrbanistMedium text-center text-secondary leading-8 -mt-10">
                {item.description}
              </Text>
              <View className="flex-row w-full items-center gap-4 mt-5">
                {isLastSlide ? (
                  <TouchableOpacity
                    className="bg-general flex-1 items-center justify-center py-5 border-none rounded-full"
                    onPress={() => {
                      router.replace("/(auth)/welcome-GetStarted");
                    }}
                  >
                    <Text className="font-UrbanistSemiBold text-buttontext text-primary">
                      Get Started
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        router.replace("/(auth)/welcome-GetStarted");
                      }}
                      className="bg-white flex-1 items-center justify-center py-5 border-[1.5px] border-general rounded-full"
                    >
                      <Text className="font-UrbanistSemiBold text-buttontext text-primary">
                        Skip
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        isLastSlide
                          ? router.replace("/(auth)/welcome-GetStarted")
                          : goToNext();
                      }}
                      className="bg-general flex-1 items-center justify-center py-5 border-none rounded-full"
                    >
                      <Text className="font-UrbanistSemiBold text-buttontext text-primary">
                        Continue
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default Onboarding;
