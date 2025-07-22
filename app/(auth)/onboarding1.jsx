import { useTheme } from "@/lib/ThemeContext";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";
import { onboarding } from "../../constants";
import "../global.css";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme } = useTheme();

  const goToNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <View
      className={`flex-1 items-center justify-between h-full w-full`}>
      <Swiper
        ref={swiperRef}
        loop={false}
        paginationStyle={{ bottom: "19%" }}
        dot={<View className={`w-2 h-2 mx-1.5 ${theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-border'} rounded-full`} />}
        activeDot={<View className={`w-10 h-2 mx-1.5 ${theme === 'dark' ? 'bg-dark-primary' : 'bg-primary'} rounded-full`} />}
        onIndexChanged={(index) => setActiveIndex(index)}>
        {onboarding.map((item) => (
          <ScrollView key={item.id} className="flex-1 items-center overflow-hidden">
            <View
              className="w-[170%] h-[54%] bg-general border-none shadow rounded-b-[300px] flex justify-center items-center"
              style={{ zIndex: 1 }}>
              <Image
                source={item.image}
                style={{ width: 385, height: 380, marginLeft: -14 }}
              />
            </View>
            <View
              key={item.id}
              className="flex justify-center items-center gap-14 p-5">
              {/* Insert your image here */}
              <View className="flex flex-row w-full items-center justify-center">
                <Text className={`text-onboardingmaintext font-UrbanistBold text-center leading-[43px] ${theme === 'dark' ? 'text-dark-primary' : 'text-primary'}`}>
                  {item.title}
                </Text>
              </View>
              <Text className={`text-onboardingsubtext font-UrbanistMedium text-center leading-8 -mt-10 ${theme === 'dark' ? 'text-dark-secondary' : 'text-secondary'}`}>
                {item.description}
              </Text>
              <View
                className="flex-row gap-4 items-center"
                style={{
                  position: "absolute",
                  right: 20,
                  left: 20,
                  bottom: -112,
                }}>
                {isLastSlide ? (
                  <TouchableOpacity
                    className="bg-general flex-1 items-center justify-center py-5 border-none rounded-full"
                    onPress={() => {
                      router.replace("/(auth)/welcome-GetStarted");
                    }}>
                    <Text className={`font-UrbanistSemiBold text-buttontext ${theme === 'dark' ? 'text-dark-primary' : 'text-primary'}`}>
                      Get Started
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        router.replace("/(auth)/welcome-GetStarted");
                      }}
                      className={`flex-1 items-center justify-center py-5 border-[1.5px] border-general rounded-full ${theme === 'dark' ? 'bg-dark-background' : 'bg-white'}`}>
                      <Text className={`font-UrbanistSemiBold text-buttontext ${theme === 'dark' ? 'text-dark-primary' : 'text-primary'}`}>
                        Skip
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        isLastSlide
                          ? router.replace("/(auth)/welcome-GetStarted")
                          : goToNext();
                      }}
                      className="bg-general flex-1 items-center justify-center py-5 border-none rounded-full">
                      <Text className={`font-UrbanistSemiBold text-buttontext ${theme === 'dark' ? 'text-dark-primary' : 'text-primary'}`}>
                        Continue
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </ScrollView>
        ))}
      </Swiper>
    </View>
  );
};

export default Onboarding;
