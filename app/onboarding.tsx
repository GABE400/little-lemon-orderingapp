import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Link, Stack, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function OnboardingScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Create references for the input fields
  const lastNameInputRef = useRef(null);
  const emailInputRef = useRef(null);

  // Check for existing user data when the onboarding screen loads
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Check if we have existing user data
        const storedFirstName = await AsyncStorage.getItem("userFirstName");
        const storedLastName = await AsyncStorage.getItem("userLastName");
        const storedEmail = await AsyncStorage.getItem("userEmail");

        // If we have data, pre-fill the form
        if (storedFirstName) {
          setFirstName(storedFirstName);
        }

        if (storedLastName) {
          setLastName(storedLastName);
        }

        if (storedEmail) {
          setEmail(storedEmail);
        }
      } catch (error) {
        console.error("Error loading user data", error);
      }
    };

    loadUserData();
  }, []);

  const handleGetStarted = async () => {
    if (firstName && email) {
      try {
        // Save user information (in a real app, you would send this to a server)
        await AsyncStorage.setItem("userFirstName", firstName);
        await AsyncStorage.setItem("userLastName", lastName);
        await AsyncStorage.setItem("userEmail", email);

        // Mark onboarding as complete
        await AsyncStorage.setItem("onboardingComplete", "true");

        // Navigate to the main app - try different navigation methods
        try {
          router.replace("/(tabs)");
        } catch (navError) {
          console.error("Navigation error:", navError);
          // Fallback navigation method
          router.navigate("/(tabs)");
        }
      } catch (error) {
        console.error("Error saving onboarding data", error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={styles.container}>
          <Stack.Screen options={{ headerShown: false }} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* Logo */}
            <ThemedView style={styles.logoContainer}>
              <Image
                source={require("@/assets/images/Logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <ThemedText style={styles.welcomeToText}>Welcome to</ThemedText>
            </ThemedView>

            {/* Welcome Section */}
            <ThemedView style={styles.welcomeSection}>
              <View style={styles.welcomeContent}>
                <ThemedText style={styles.welcomeHeading}>
                  Welcome to Little Lemon
                </ThemedText>
                <ThemedText style={styles.welcomeSubheading}>
                  Chicago
                </ThemedText>

                <View style={styles.descriptionContainer}>
                  <ThemedText style={styles.welcomeDescription}>
                    We are a family owned Mediterranean restaurant, focused on
                    traditional recipes served with a modern twist.
                  </ThemedText>
                </View>
              </View>

              <Image
                source={require("@/assets/images/Hero image.png")}
                style={styles.welcomeImage}
              />
            </ThemedView>

            {/* Form Section */}
            <ThemedView style={styles.formSection}>
              <ThemedText style={styles.formHeading}>
                Let's get to know you
              </ThemedText>

              <ThemedView style={styles.inputContainer}>
                <ThemedText style={styles.inputLabel}>First Name</ThemedText>
                <View style={styles.inputWrapper}>
                  <IconSymbol
                    name="person.fill"
                    size={20}
                    color="#495E57"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="Enter your first name"
                    placeholderTextColor="#999"
                    autoFocus={true}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      lastNameInputRef.current?.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </View>
              </ThemedView>

              <ThemedView style={styles.inputContainer}>
                <ThemedText style={styles.inputLabel}>Last Name</ThemedText>
                <View style={styles.inputWrapper}>
                  <IconSymbol
                    name="person.fill"
                    size={20}
                    color="#495E57"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    ref={lastNameInputRef}
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Enter your last name"
                    placeholderTextColor="#999"
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      emailInputRef.current?.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </View>
              </ThemedView>

              <ThemedView style={styles.inputContainer}>
                <ThemedText style={styles.inputLabel}>Email</ThemedText>
                <View style={styles.inputWrapper}>
                  <IconSymbol
                    name="envelope.fill"
                    size={20}
                    color="#495E57"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    ref={emailInputRef}
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#999"
                    returnKeyType="done"
                    onSubmitEditing={() => {
                      if (firstName && email) {
                        handleGetStarted();
                      }
                    }}
                  />
                </View>
              </ThemedView>

              <Pressable
                style={[
                  styles.getStartedButton,
                  (!firstName || !email) && styles.disabledButton,
                ]}
                onPress={handleGetStarted}
                disabled={!firstName || !email}
              >
                <View style={styles.buttonContent}>
                  <ThemedText style={styles.getStartedText}>
                    Get Started
                  </ThemedText>
                  <IconSymbol name="chevron.right" size={24} color="#333" />
                </View>
              </Pressable>

              <ThemedText style={styles.privacyText}>
                By clicking Get Started, you agree to our Terms of Service and
                Privacy Policy.
              </ThemedText>
            </ThemedView>
          </ScrollView>
        </ThemedView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 50, // Add extra padding at the bottom for keyboard
  },
  logoContainer: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 10,
  },
  logo: {
    width: 200,
    height: 50,
    marginBottom: 10,
  },
  welcomeToText: {
    fontSize: 18,
    color: "#495E57",
    fontWeight: "500",
    marginBottom: 10,
  },
  welcomeSection: {
    backgroundColor: "#495E57",
    padding: 24,
    paddingVertical: 32, // More vertical padding
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  welcomeContent: {
    flex: 1,
    paddingRight: 24,
    maxWidth: "55%", // Ensure text takes up to 55% of the width
    backgroundColor: "transparent", // Ensure no background color
    justifyContent: "center", // Center content vertically
  },
  welcomeHeading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#F4CE14",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  welcomeSubheading: {
    fontSize: 22,
    fontWeight: "500",
    color: "white",
    marginBottom: 10,
  },
  descriptionContainer: {
    marginBottom: 15,
    backgroundColor: "transparent",
  },
  welcomeDescription: {
    color: "white",
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  welcomeImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    alignSelf: "center", // Center vertically
    marginLeft: "auto", // Push to the right
  },
  formSection: {
    padding: 24,
    paddingTop: 20,
    paddingBottom: 30,
    flex: 1,
    backgroundColor: "white",
  },
  formHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
    fontWeight: "500",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEFEE",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingLeft: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: "#333",
  },
  getStartedButton: {
    backgroundColor: "#F4CE14",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  getStartedText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 8,
  },
  privacyText: {
    color: "#666",
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
