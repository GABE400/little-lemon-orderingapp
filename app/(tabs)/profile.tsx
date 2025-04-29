import { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  Pressable,
  View,
  TextInput,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function ProfileScreen() {
  // Form field states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Notification preferences
  const [orderStatusNotif, setOrderStatusNotif] = useState(true);
  const [passwordChangesNotif, setPasswordChangesNotif] = useState(true);
  const [newsletterNotif, setNewsletterNotif] = useState(false);

  // Load user data from AsyncStorage
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Load first name
        const storedFirstName = await AsyncStorage.getItem("userFirstName");
        if (storedFirstName) {
          setFirstName(storedFirstName);
        }

        // Load last name
        const storedLastName = await AsyncStorage.getItem("userLastName");
        if (storedLastName) {
          setLastName(storedLastName);
        }

        // Load email
        const storedEmail = await AsyncStorage.getItem("userEmail");
        if (storedEmail) {
          setEmail(storedEmail);
        }

        // Load phone
        const storedPhone = await AsyncStorage.getItem("userPhone");
        if (storedPhone) {
          setPhone(storedPhone);
        }

        // Load notification preferences
        const storedOrderStatusNotif = await AsyncStorage.getItem(
          "orderStatusNotif"
        );
        if (storedOrderStatusNotif !== null) {
          setOrderStatusNotif(storedOrderStatusNotif === "true");
        }

        const storedPasswordChangesNotif = await AsyncStorage.getItem(
          "passwordChangesNotif"
        );
        if (storedPasswordChangesNotif !== null) {
          setPasswordChangesNotif(storedPasswordChangesNotif === "true");
        }

        const storedNewsletterNotif = await AsyncStorage.getItem(
          "newsletterNotif"
        );
        if (storedNewsletterNotif !== null) {
          setNewsletterNotif(storedNewsletterNotif === "true");
        }
      } catch (error) {
        console.error("Error loading user data", error);
      }
    };

    loadUserData();
  }, []);

  // Handle back button press - in profile screen, it navigates to home
  const handleBackPress = () => {
    router.push("/(tabs)");
  };

  // Handle saving profile changes
  const handleSaveChanges = async () => {
    try {
      // Save user information
      await AsyncStorage.setItem("userFirstName", firstName);
      await AsyncStorage.setItem("userLastName", lastName);
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userPhone", phone);

      // Save notification preferences
      await AsyncStorage.setItem(
        "orderStatusNotif",
        orderStatusNotif.toString()
      );
      await AsyncStorage.setItem(
        "passwordChangesNotif",
        passwordChangesNotif.toString()
      );
      await AsyncStorage.setItem("newsletterNotif", newsletterNotif.toString());

      // Show success message with visual feedback
      Alert.alert("Success", "Your profile has been updated successfully.", [
        { text: "OK" },
      ]);
    } catch (error) {
      console.error("Error saving profile data", error);
      Alert.alert("Error", "Failed to save changes. Please try again.");
    }
  };

  // Handle logout
  const handleLogout = async () => {
    console.log("Logout button pressed");
    try {
      // Show a confirmation alert
      Alert.alert("Logout", "Are you sure you want to log out?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              // Clear onboarding status and user data
              await AsyncStorage.removeItem("onboardingComplete");
              await AsyncStorage.removeItem("userFirstName");
              await AsyncStorage.removeItem("userLastName");
              await AsyncStorage.removeItem("userEmail");
              await AsyncStorage.removeItem("userPhone");

              // Clear notification preferences
              await AsyncStorage.removeItem("orderStatusNotif");
              await AsyncStorage.removeItem("passwordChangesNotif");
              await AsyncStorage.removeItem("newsletterNotif");

              // Navigate to onboarding screen
              console.log("Navigating to onboarding screen");
              router.replace("/onboarding");
            } catch (error) {
              console.error("Error during logout", error);
              Alert.alert("Error", "Failed to log out. Please try again.");
            }
          },
        },
      ]);
    } catch (error) {
      console.error("Error during logout", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Navigation Bar with Back Button and Logout Button */}
      <ThemedView style={styles.navBar}>
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleBackPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <IconSymbol name="arrow.left" size={24} color="#333" />
          <ThemedText style={styles.backButtonText}>Back</ThemedText>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleLogout}
          android_ripple={{ color: "#e6b800" }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <View style={styles.buttonContent}>
            <IconSymbol
              name="rectangle.portrait.and.arrow.right"
              size={20}
              color="#333"
            />
            <ThemedText style={styles.logoutText}>Logout</ThemedText>
          </View>
        </Pressable>
      </ThemedView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <ThemedView style={styles.profileHeader}>
          <Image
            source={require("@/assets/images/Profile.png")}
            style={styles.profileImage}
          />
          <ThemedText style={styles.profileName}>
            {firstName} {lastName}
          </ThemedText>
          <ThemedText style={styles.profileEmail}>{email}</ThemedText>
        </ThemedView>

        {/* Personal Information Section */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Personal Information
          </ThemedText>

          <ThemedView style={styles.formGroup}>
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
              />
            </View>
          </ThemedView>

          <ThemedView style={styles.formGroup}>
            <ThemedText style={styles.inputLabel}>Last Name</ThemedText>
            <View style={styles.inputWrapper}>
              <IconSymbol
                name="person.fill"
                size={20}
                color="#495E57"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter your last name"
                placeholderTextColor="#999"
              />
            </View>
          </ThemedView>

          <ThemedView style={styles.formGroup}>
            <ThemedText style={styles.inputLabel}>Email</ThemedText>
            <View style={styles.inputWrapper}>
              <IconSymbol
                name="envelope.fill"
                size={20}
                color="#495E57"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
            </View>
          </ThemedView>

          <ThemedView style={styles.formGroup}>
            <ThemedText style={styles.inputLabel}>Phone Number</ThemedText>
            <View style={styles.inputWrapper}>
              <IconSymbol
                name="phone.fill"
                size={20}
                color="#495E57"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                placeholderTextColor="#999"
              />
            </View>
          </ThemedView>
        </ThemedView>

        {/* Email Notifications Section */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Email Notifications
          </ThemedText>

          <ThemedView style={styles.checkboxContainer}>
            <View style={styles.checkboxWrapper}>
              <Switch
                value={orderStatusNotif}
                onValueChange={setOrderStatusNotif}
                trackColor={{ false: "#CCCCCC", true: "#495E57" }}
                thumbColor={orderStatusNotif ? "#F4CE14" : "#f4f3f4"}
              />
              <ThemedText style={styles.checkboxLabel}>Order Status</ThemedText>
            </View>
            <ThemedText style={styles.checkboxDescription}>
              Receive updates regarding your order status
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.checkboxContainer}>
            <View style={styles.checkboxWrapper}>
              <Switch
                value={passwordChangesNotif}
                onValueChange={setPasswordChangesNotif}
                trackColor={{ false: "#CCCCCC", true: "#495E57" }}
                thumbColor={passwordChangesNotif ? "#F4CE14" : "#f4f3f4"}
              />
              <ThemedText style={styles.checkboxLabel}>
                Password Changes
              </ThemedText>
            </View>
            <ThemedText style={styles.checkboxDescription}>
              Receive emails about password changes and security updates
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.checkboxContainer}>
            <View style={styles.checkboxWrapper}>
              <Switch
                value={newsletterNotif}
                onValueChange={setNewsletterNotif}
                trackColor={{ false: "#CCCCCC", true: "#495E57" }}
                thumbColor={newsletterNotif ? "#F4CE14" : "#f4f3f4"}
              />
              <ThemedText style={styles.checkboxLabel}>Newsletter</ThemedText>
            </View>
            <ThemedText style={styles.checkboxDescription}>
              Receive emails about special promotions and news
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Save Button */}
        <Pressable
          style={({ pressed }) => [
            styles.saveButton,
            pressed && styles.saveButtonPressed,
          ]}
          onPress={handleSaveChanges}
          android_ripple={{ color: "#3e4a44" }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ThemedText style={styles.saveButtonText}>Save Changes</ThemedText>
        </Pressable>

        {/* Bottom padding */}
        <View style={{ height: 30 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    paddingBottom: 20, // Add some bottom padding
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "white",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4CE14",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
  profileHeader: {
    alignItems: "center",
    padding: 20,
    paddingTop: 20, // Reduced padding to make room for logout button
    paddingBottom: 30,
    backgroundColor: "#F4CE14",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    backgroundColor: "#EDEFEE",
    borderWidth: 3,
    borderColor: "white",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: "#495E57",
    marginBottom: 5,
  },
  section: {
    padding: 20,
    borderBottomWidth: 8,
    borderBottomColor: "#F8F8F8",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 16,
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
  checkboxContainer: {
    marginBottom: 16,
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginLeft: 10,
  },
  checkboxDescription: {
    fontSize: 14,
    color: "#666",
    marginLeft: 50,
  },
  saveButton: {
    backgroundColor: "#495E57",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  saveButtonPressed: {
    backgroundColor: "#3e4a44",
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 0.5,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4CE14",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonPressed: {
    backgroundColor: "#e6b800",
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
});
