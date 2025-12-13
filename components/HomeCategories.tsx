import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const categories = [
  { key: "king", label: "King", icon: "man-outline" },
  { key: "queen", label: "Queen", icon: "woman-outline" },
  { key: "prince", label: "Prince", icon: "body-outline" },
  { key: "princess", label: "Princess", icon: "rose-outline" },
  { key: "innocence", label: "Innocent", icon: "sparkles-outline" },
];

export default function HomeCategories() {
  const [active, setActive] = useState("king");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>

      {/* Row 1 - 3 items */}
      <View style={styles.row}>
        {categories.slice(0, 3).map((item) => (
          <CategoryItem
            key={item.key}
            item={item}
            active={active}
            setActive={setActive}
          />
        ))}
      </View>

      {/* Row 2 - 2 items (LEFT aligned) */}
      <View style={styles.rowLeft}>
        {categories.slice(3, 5).map((item) => (
          <CategoryItem
            key={item.key}
            item={item}
            active={active}
            setActive={setActive}
          />
        ))}
      </View>
    </View>
  );
}

const CategoryItem = ({ item, active, setActive }) => (
  <TouchableOpacity style={styles.item} onPress={() => setActive(item.key)}>
    <View
      style={[
        styles.iconBox,
        active === item.key && { backgroundColor: "#4CAF50" },
      ]}
    >
      <Ionicons
        name={item.icon}
        size={28}
        color={active === item.key ? "#fff" : "#000"}
      />
    </View>
    <Text style={styles.label}>{item.label}</Text>
  </TouchableOpacity>
);

const itemWidth = Dimensions.get("window").width / 4.2; // responsive width

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
  },

  // First row: full width, evenly spaced
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  // Second row: LEFT-aligned, not centered
  rowLeft: {
    flexDirection: "row",
    justifyContent: "flex-start",
    columnGap: 25, // spacing between items (adjustable)
    marginBottom: 10,
  },

  item: {
    alignItems: "center",
    width: itemWidth,
  },

  iconBox: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
});
