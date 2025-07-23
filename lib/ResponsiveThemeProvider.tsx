import React, { createContext, useContext, useEffect, useState } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme as useOriginalTheme } from './ThemeContext';
import { getThemeColors, createThemedStyles } from './globalStyles';
import { getScreenDimensions, isTablet, isSmallScreen, isLargeScreen } from './responsive';

interface ResponsiveThemeContextType {
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  colors: ReturnType<typeof getThemeColors>;
  styles: ReturnType<typeof createThemedStyles>;
  
  // Device info
  screenDimensions: { width: number; height: number };
  isTablet: boolean;
  isSmallScreen: boolean;
  isLargeScreen: boolean;
  orientation: 'portrait' | 'landscape';
  
  // Loading state
  isLoading: boolean;
}

const ResponsiveThemeContext = createContext<ResponsiveThemeContextType | undefined>(undefined);

interface ResponsiveThemeProviderProps {
  children: React.ReactNode;
}

export const ResponsiveThemeProvider: React.FC<ResponsiveThemeProviderProps> = ({ children }) => {
  const { theme, toggleTheme } = useOriginalTheme();
  const [screenDimensions, setScreenDimensions] = useState(getScreenDimensions());
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [isLoading, setIsLoading] = useState(true);

  // Update screen dimensions and orientation on change
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenDimensions({ width: window.width, height: window.height });
      setOrientation(window.width > window.height ? 'landscape' : 'portrait');
    });

    return () => subscription?.remove();
  }, []);

  // Initialize theme and screen info
  useEffect(() => {
    const initializeTheme = async () => {
      try {
        // You can add any initialization logic here
        // For example, loading saved preferences
        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing theme:', error);
        setIsLoading(false);
      }
    };

    initializeTheme();
  }, []);

  // Update status bar based on theme
  useEffect(() => {
    StatusBar.setBarStyle(theme === 'dark' ? 'light-content' : 'dark-content');
  }, [theme]);

  const colors = getThemeColors(theme);
  const styles = createThemedStyles(theme);

  const contextValue: ResponsiveThemeContextType = {
    // Theme
    theme,
    toggleTheme,
    colors,
    styles,
    
    // Device info
    screenDimensions,
    isTablet: isTablet(),
    isSmallScreen: isSmallScreen(),
    isLargeScreen: isLargeScreen(),
    orientation,
    
    // Loading state
    isLoading,
  };

  return (
    <ResponsiveThemeContext.Provider value={contextValue}>
      {children}
    </ResponsiveThemeContext.Provider>
  );
};

export const useResponsiveTheme = (): ResponsiveThemeContextType => {
  const context = useContext(ResponsiveThemeContext);
  if (context === undefined) {
    throw new Error('useResponsiveTheme must be used within a ResponsiveThemeProvider');
  }
  return context;
};

// Utility hooks for specific use cases
export const useColors = () => {
  const { colors } = useResponsiveTheme();
  return colors;
};

export const useThemedStyles = () => {
  const { styles } = useResponsiveTheme();
  return styles;
};

export const useDeviceInfo = () => {
  const { screenDimensions, isTablet, isSmallScreen, isLargeScreen, orientation } = useResponsiveTheme();
  return { screenDimensions, isTablet, isSmallScreen, isLargeScreen, orientation };
};

// HOC for components that need responsive theme
export const withResponsiveTheme = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => {
    const responsiveTheme = useResponsiveTheme();
    return <Component {...props} responsiveTheme={responsiveTheme} />;
  };
};