import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Based on standard iPhone 6/7/8 design (375x667)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;

// Responsive width function
export const wp = (percentage: number): number => {
  const value = (percentage * SCREEN_WIDTH) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

// Responsive height function
export const hp = (percentage: number): number => {
  const value = (percentage * SCREEN_HEIGHT) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

// Responsive font size
export const rf = (size: number): number => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Get screen dimensions
export const getScreenDimensions = () => ({
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
});

// Check if device is tablet
export const isTablet = (): boolean => {
  return SCREEN_WIDTH >= 768;
};

// Check if device is small screen (iPhone SE, etc.)
export const isSmallScreen = (): boolean => {
  return SCREEN_WIDTH <= 350;
};

// Check if device is large screen (iPhone Plus, Pro Max, etc.)
export const isLargeScreen = (): boolean => {
  return SCREEN_WIDTH >= 414;
};

// Responsive padding/margin
export const rs = (size: number): number => {
  const scale = Math.min(SCREEN_WIDTH / BASE_WIDTH, SCREEN_HEIGHT / BASE_HEIGHT);
  return Math.round(size * scale);
};

// Safe area padding for different devices
export const getSafeAreaPadding = () => {
  if (SCREEN_HEIGHT >= 812) {
    // iPhone X and newer
    return {
      top: hp(6),
      bottom: hp(3),
    };
  } else {
    // Older iPhones
    return {
      top: hp(3),
      bottom: hp(2),
    };
  }
};

// Dynamic button sizing
export const getButtonSize = () => {
  if (isSmallScreen()) {
    return {
      width: wp(80),
      height: hp(6.5),
      fontSize: rf(16),
    };
  } else if (isLargeScreen()) {
    return {
      width: wp(85),
      height: hp(7),
      fontSize: rf(18),
    };
  } else {
    return {
      width: wp(85),
      height: hp(6.8),
      fontSize: rf(17),
    };
  }
};

// Dynamic icon sizing
export const getIconSize = () => {
  if (isSmallScreen()) {
    return {
      small: rf(16),
      medium: rf(20),
      large: rf(24),
    };
  } else if (isLargeScreen()) {
    return {
      small: rf(18),
      medium: rf(24),
      large: rf(28),
    };
  } else {
    return {
      small: rf(17),
      medium: rf(22),
      large: rf(26),
    };
  }
};