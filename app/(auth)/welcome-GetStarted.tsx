import { images } from "@/constants";
import { router } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
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

const welcome = () => {
  const { theme } = useTheme();
  return (
    <ResponsiveSafeArea>
      <ScreenContainer>
        <View
          style={[
            globalStyles.centerContainer,
            { marginBottom: hp(16) }
          ]}
        >
          <Image
            source={theme === 'dark' ? images.BlackLogo : images.GreenLogo}
            style={{
              width: wp(80),
              height: hp(28),
              maxWidth: wp(75),
              resizeMode: 'contain'
            }}
          />
          
          <View style={globalStyles.marginVerticalLarge}>
            <Heading1 style={{ textAlign: 'center' }}>
              Let's Get Started!
            </Heading1>
          </View>
          
          <View style={[
            globalStyles.screenPadding,
            { alignItems: 'center', marginTop: -hp(3) }
          ]}>
            <BodyText style={{ textAlign: 'center' }}>
              With FinTra, sending and receiving money is
            </BodyText>
            <BodyText style={{ textAlign: 'center' }}>
              easier than ever before.
            </BodyText>
          </View>
        </View>
        
        <View
          style={[
            globalStyles.screenPadding,
            {
              position: "absolute",
              bottom: hp(6),
              left: 0,
              right: 0,
              flexDirection: 'row',
              gap: wp(4),
              alignItems: 'center'
            }
          ]}
        >
          <ResponsiveButton
            title="Sign up"
            variant="secondary"
            onPress={() => router.push("/(auth)/sign-up")}
            style={{ flex: 1 }}
          />
          <ResponsiveButton
            title="Sign in"
            onPress={() => router.push("/(auth)/sign-in")}
            style={{ flex: 1 }}
          />
        </View>
      </ScreenContainer>
    </ResponsiveSafeArea>
  );
};

export default welcome;
