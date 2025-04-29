import {
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  View,
} from "react-native";
import { useState, useMemo } from "react";
import { useRouter } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

// Define menu item type
type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: any;
  category: string;
};

// Menu data
const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Greek Salad",
    description:
      "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese.",
    price: "$12.99",
    image: require("@/assets/images/Greek salad.png"),
    category: "Starters",
  },
  {
    id: "2",
    name: "Bruschetta",
    description:
      "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
    price: "$7.99",
    image: require("@/assets/images/Bruschetta.png"),
    category: "Starters",
  },
  {
    id: "3",
    name: "Grilled Fish",
    description:
      "Fresh fish, grilled to perfection and served with a side of vegetables and our special sauce.",
    price: "$18.99",
    image: require("@/assets/images/Grilled fish.png"),
    category: "Mains",
  },
  {
    id: "4",
    name: "Pasta",
    description:
      "Homemade pasta with your choice of sauce - marinara, alfredo, or pesto.",
    price: "$14.99",
    image: require("@/assets/images/Pasta.png"),
    category: "Mains",
  },
  {
    id: "5",
    name: "Lemon Dessert",
    description:
      "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
    price: "$6.99",
    image: require("@/assets/images/Lemon dessert.png"),
    category: "Desserts",
  },
  {
    id: "6",
    name: "Cheesecake",
    description:
      "Rich and creamy New York style cheesecake topped with seasonal berries.",
    price: "$8.99",
    image: require("@/assets/images/Greek salad.png"), // Temporarily using Greek salad image as placeholder
    category: "Desserts",
  },
  {
    id: "7",
    name: "Lemonade",
    description:
      "Freshly squeezed lemons with just the right amount of sweetness.",
    price: "$3.99",
    image: require("@/assets/images/Lemon dessert.png"), // Temporarily using Lemon dessert image as placeholder
    category: "Drinks",
  },
  {
    id: "8",
    name: "Wine",
    description:
      "A selection of fine wines from our cellar, perfect to pair with your meal.",
    price: "$9.99",
    image: require("@/assets/images/Bruschetta.png"), // Temporarily using Bruschetta image as placeholder
    category: "Drinks",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("Starters");
  const [searchText, setSearchText] = useState("");

  // No need for handleBackPress anymore as we're using inline function

  // Filter menu items based on active category and search text
  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item) => {
      // First filter by category
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      // Then filter by search text if any
      const matchesSearch =
        searchText === "" ||
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchText]);

  return (
    <ThemedView style={styles.container}>
      {/* Navigation Bar */}
      <ThemedView style={styles.navBar}>
        <Image
          source={require("@/assets/images/Logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Pressable
          style={({ pressed }) => [
            styles.profileButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.push("/profile")}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <IconSymbol name="person.fill" size={24} color="#333" />
        </Pressable>
      </ThemedView>

      <ScrollView>
        {/* Hero Section */}
        <ThemedView style={styles.heroSection}>
          <View style={styles.heroContent}>
            <ThemedText style={styles.heroHeading}>Little Lemon</ThemedText>
            <ThemedText style={styles.heroSubheading}>Chicago</ThemedText>
            <ThemedText style={styles.heroText}>
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </ThemedText>
          </View>
          <Image
            source={require("@/assets/images/Hero image.png")}
            style={styles.heroImage}
          />
        </ThemedView>

        {/* Search Bar */}
        <ThemedView style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <IconSymbol
              name="magnifyingglass"
              size={20}
              color="#666"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search menu items"
              value={searchText}
              onChangeText={setSearchText}
              clearButtonMode="while-editing"
            />
          </View>
        </ThemedView>

        {/* Menu Breakdown */}
        <ThemedView style={styles.deliverySection}>
          <ThemedText style={styles.deliveryText}>
            ORDER FOR DELIVERY
          </ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {["All", "Starters", "Mains", "Desserts", "Drinks"].map(
              (category) => (
                <Pressable
                  key={category}
                  style={[
                    styles.categoryButton,
                    activeCategory === category && styles.activeCategoryButton,
                  ]}
                  onPress={() => setActiveCategory(category)}
                >
                  <ThemedText
                    style={[
                      styles.categoryText,
                      activeCategory === category && styles.activeCategoryText,
                    ]}
                  >
                    {category}
                  </ThemedText>
                </Pressable>
              )
            )}
          </ScrollView>
        </ThemedView>

        {/* Menu Items */}
        <ThemedView style={styles.menuItems}>
          {filteredMenuItems.length === 0 ? (
            <ThemedView style={styles.noResultsContainer}>
              <ThemedText style={styles.noResultsText}>
                No menu items found. Try a different search or category.
              </ThemedText>
            </ThemedView>
          ) : (
            filteredMenuItems.map((item) => (
              <ThemedView key={item.id} style={styles.menuItem}>
                <ThemedView style={styles.menuItemContent}>
                  <ThemedText style={styles.menuItemName}>
                    {item.name}
                  </ThemedText>
                  <ThemedText style={styles.menuItemDescription}>
                    {item.description}
                  </ThemedText>
                  <ThemedText style={styles.menuItemPrice}>
                    {item.price}
                  </ThemedText>
                </ThemedView>
                <Image source={item.image} style={styles.menuItemImage} />
              </ThemedView>
            ))
          )}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  logo: {
    width: 150,
    height: 40,
  },
  heroSection: {
    backgroundColor: "#495E57", // Green background for hero section
    padding: 24,
    paddingVertical: 32, // More vertical padding
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroContent: {
    flex: 1,
    paddingRight: 24,
    maxWidth: "55%", // Ensure text takes up to 55% of the width
    backgroundColor: "transparent", // Ensure no background color
    justifyContent: "center", // Center content vertically
  },
  heroHeading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#F4CE14", // Yellow heading
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  heroSubheading: {
    fontSize: 22,
    fontWeight: "500",
    color: "white",
    marginBottom: 10,
  },
  heroText: {
    color: "white",
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  heroImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    alignSelf: "center", // Center vertically
    marginLeft: "auto", // Push to the right
  },
  searchContainer: {
    padding: 16,
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEFEE",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 14,
  },
  deliverySection: {
    padding: 16,
    paddingBottom: 8,
    backgroundColor: "white",
  },
  deliveryText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "black",
  },
  categoriesScroll: {
    marginBottom: 8,
  },
  categoryButton: {
    backgroundColor: "#EDEFEE",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    marginRight: 12,
  },
  activeCategoryButton: {
    backgroundColor: "#495E57",
  },
  categoryText: {
    color: "#333",
    fontWeight: "500",
  },
  activeCategoryText: {
    color: "white",
  },
  menuItems: {
    padding: 16,
    backgroundColor: "white",
  },
  menuItem: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EDEFEE",
    paddingVertical: 16,
  },
  menuItemContent: {
    flex: 1,
    paddingRight: 10,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "black",
  },
  menuItemDescription: {
    color: "#495E57",
    fontSize: 14,
    marginBottom: 8,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#495E57",
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  noResultsContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  noResultsText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  profileButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4CE14",
    padding: 10,
    borderRadius: 25, // Make it round
    width: 50,
    height: 50,
  },
  buttonPressed: {
    backgroundColor: "#e6b800",
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});
