import { StyleSheet, Image, Pressable } from "react-native";
import { Link, Stack } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: "Profile", headerShown: true }} />

      {/* Profile Header */}
      <ThemedView style={styles.profileHeader}>
        <Image
          source={require("@/assets/images/Profile.png")}
          style={styles.profileImage}
        />
        <ThemedText style={styles.profileName}>John Doe</ThemedText>
        <ThemedText style={styles.profileEmail}>
          john.doe@example.com
        </ThemedText>
      </ThemedView>

      {/* Profile Options */}
      <ThemedView style={styles.optionsContainer}>
        <ThemedView style={styles.optionItem}>
          <IconSymbol name="person.fill" size={24} color="#495E57" />
          <ThemedText style={styles.optionText}>
            Personal Information
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.optionItem}>
          <IconSymbol name="chevron.right" size={24} color="#495E57" />
          <ThemedText style={styles.optionText}>Payment Methods</ThemedText>
        </ThemedView>

        <ThemedView style={styles.optionItem}>
          <IconSymbol name="chevron.right" size={24} color="#495E57" />
          <ThemedText style={styles.optionText}>Order History</ThemedText>
        </ThemedView>

        <ThemedView style={styles.optionItem}>
          <IconSymbol name="chevron.right" size={24} color="#495E57" />
          <ThemedText style={styles.optionText}>Delivery Addresses</ThemedText>
        </ThemedView>

        <ThemedView style={styles.optionItem}>
          <IconSymbol name="chevron.right" size={24} color="#495E57" />
          <ThemedText style={styles.optionText}>Contact Support</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Logout Button */}
      <Link href="/onboarding" asChild>
        <Pressable style={styles.logoutButton}>
          <ThemedText style={styles.logoutText}>Logout</ThemedText>
        </Pressable>
      </Link>

      {/* Back to Home */}
      <Link href="/" asChild>
        <Pressable style={styles.backButton}>
          <ThemedText style={styles.backText}>Back to Home</ThemedText>
        </Pressable>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  profileHeader: {
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#F4CE14",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: "#EDEFEE",
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
    marginBottom: 10,
  },
  optionsContainer: {
    padding: 20,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EDEFEE",
  },
  optionText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#F4CE14",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  logoutText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    padding: 15,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  backText: {
    color: "#495E57",
    fontSize: 16,
  },
});
