import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
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

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => setActive(item.key)}
          >
            <View
              style={[
                styles.iconBox,
                active === item.key && { backgroundColor: "#4CAF50" },
              ]}
            >
              <Ionicons
                name={item.icon as any}
                size={28}
                color={active === item.key ? "#fff" : "#000"}
              />
            </View>
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
}

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
  item: {
    alignItems: "center",
    marginRight: 25,
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
  },
});
