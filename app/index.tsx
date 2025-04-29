import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";

// This redirects to the appropriate screen based on onboarding status
export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    async function checkOnboardingStatus() {
      try {
        const onboardingComplete = await AsyncStorage.getItem(
          "onboardingComplete"
        );
        setIsOnboarded(onboardingComplete === "true");
      } catch (error) {
        console.error("Failed to check onboarding status:", error);
      } finally {
        setIsLoading(false);
      }
    }

    checkOnboardingStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#495E57" />
      </View>
    );
  }

  // Redirect to tabs if onboarded, otherwise to onboarding
  return <Redirect href={isOnboarded ? "/(tabs)" : "/onboarding"} />;
}
