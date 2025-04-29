import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  // Track whether the user has completed onboarding
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Check onboarding status on app start
  useEffect(() => {
    async function checkOnboardingStatus() {
      try {
        // Check if user has completed onboarding
        const onboardingComplete = await AsyncStorage.getItem(
          "onboardingComplete"
        );
        console.log(
          "Onboarding status:",
          onboardingComplete === "true" ? "completed" : "not completed"
        );
        setIsOnboarded(onboardingComplete === "true");
      } catch (e) {
        console.error("Failed to get onboarding status", e);
        setIsOnboarded(false);
      }

      if (loaded) {
        SplashScreen.hideAsync();
      }
    }

    checkOnboardingStatus();
  }, [loaded]);

  if (!loaded || isOnboarded === null) {
    return null;
  }

  // Set initial route based on onboarding status
  const initialRoute = isOnboarded ? "(tabs)" : "onboarding";

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName={initialRoute}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen
          name="profile"
          options={{ headerShown: true, title: "Profile" }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
