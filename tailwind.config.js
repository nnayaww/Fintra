/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./constants/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        Urbanist: ["Urbanist", "sans-serif"],
        UrbanistBold: ["Urbanist-Bold", "sans-serif"],
        UrbanistExtraBold: ["Urbanist-ExtraBold", "sans-serif"],
        UrbanistExtraLight: ["Urbanist-ExtraLight", "sans-serif"],
        UrbanistLight: ["Urbanist-Light", "sans-serif"],
        UrbanistMedium: ["Urbanist-Medium", "sans-serif"],
        UrbanistSemiBold: ["Urbanist-SemiBold", "sans-serif"],
      },
      colors: {
        general: "#82E394",
        primary: "#0D0D0D",
        secondary: "#616161",
        border: "#e5eaf0",
        dark: {
          primary: "#FFFFFF",
          secondary: "#A0A0A0",
          background: "#121212",
          border: "#444",
        },
        light: {
          primary: "#0D0D0D",
          secondary: "#616161",
          background: "#FFFFFF",
          border: "#e5eaf0",
        },
      },
      fontSize: {
        heading: 36,
        subtext: 18,
        buttontext: 19.2,
        onboardingsubtext: 17,
        onboardingmaintext: 30,
      },
    },
  },
  plugins: [],
};