/* eslint-disable no-unused-expressions */
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Dimensions, Image, View } from "react-native";
import Swiper from "react-native-swiper";
import { onboarding } from "../../constants";
import {
  ResponsiveSafeArea,
  ScreenContainer,
  ResponsiveButton,
  Heading1,
  BodyText,
} from "@/components/ResponsiveComponents";
import { useTheme } from "@/lib/ThemeContext";
import { globalStyles } from "@/lib/globalStyles";
import { wp, hp } from "@/lib/responsive";
import "../global.css";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme } = useTheme();
  const { width, height } = Dimensions.get("window");

  const goToNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <ResponsiveSafeArea>
      <ScreenContainer>
        <Swiper
          ref={swiperRef}
          loop={false}
          showsPagination={false}
          onIndexChanged={(index) => setActiveIndex(index)}
        >
          {onboarding.map((item) => (
            <View
              key={item.id}
              style={[globalStyles.centerContainer, { overflow: "hidden" }]}
            >
              <View
                style={{
                  width: width,
                  height: height * 0.4,
                  backgroundColor: "#82E394",
                  borderBottomLeftRadius: width,
                  borderBottomRightRadius: width,
                  zIndex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={item.image}
                  style={{
                    width: wp(80),
                    height: hp(35),
                    resizeMode: "contain",
                  }}
                />
              </View>

              <View
                style={[
                  globalStyles.centerContainer,
                  globalStyles.screenPadding,
                  { gap: hp(6), paddingTop: hp(8) },
                ]}
              >
                <View style={{ alignItems: "center" }}>
                  <Heading1
                    style={{ textAlign: "center", lineHeight: hp(5.5) }}
                  >
                    {item.title}
                  </Heading1>
                </View>
                <BodyText
                  style={{
                    textAlign: "center",
                    lineHeight: hp(3.2),
                    marginTop: -hp(4),
                  }}
                >
                  {item.description}
                </BodyText>
              </View>
            </View>
          ))}
        </Swiper>

        {/* 👇 Custom Pagination Dots BELOW the Swiper content */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: hp(4),
            marginBottom: hp(6),
          }}
        >
          {onboarding.map((_, index) => (
            <View
              key={index}
              style={{
                width: index === activeIndex ? wp(10) : wp(2),
                height: wp(2),
                marginHorizontal: wp(1.5),
                backgroundColor:
                  index === activeIndex
                    ? "#196126"
                    : theme === "dark"
                    ? "#374151"
                    : "#e5e7eb",
                borderRadius: wp(1),
              }}
            />
          ))}
        </View>

        {/* 👇 Buttons */}
        <View
          style={[
            globalStyles.screenPadding,
            {
              flexDirection: "row",
              gap: wp(4),
              alignItems: "center",
              marginBottom: hp(4),
            },
          ]}
        >
          {isLastSlide ? (
            <ResponsiveButton
              title="Get Started"
              onPress={() => router.replace("/(auth)/welcome-GetStarted")}
              style={{ flex: 1 }}
            />
          ) : (
            <>
              <ResponsiveButton
                title="Skip"
                variant="secondary"
                onPress={() => router.replace("/(auth)/welcome-GetStarted")}
                style={{ flex: 1 }}
              />
              <ResponsiveButton
                title="Continue"
                onPress={goToNext}
                style={{ flex: 1 }}
              />
            </>
          )}
        </View>
      </ScreenContainer>
    </ResponsiveSafeArea>
  );
};

export default Onboarding;
