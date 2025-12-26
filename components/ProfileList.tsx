import { COLORS } from "@/data/color";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const categories = [
  { key: "king", title: "King", icon: "man-outline" },
  { key: "queen", title: "Queen", icon: "woman-outline" },
  { key: "prince", title: "Prince", icon: "body-outline" },
  { key: "princess", title: "Princess", icon: "rose-outline" },
  { key: "innocent", title: "Innocent", icon: "sparkles-outline" },
];

export default function ProfileList({ student }: { student: any }) {
  return (
    <View style={{ padding: 20 }}>
      {categories.map((item) => {
        const voted = student?.[`voted_${item.key}`] === true;

        return (
          <TouchableOpacity key={item.key} style={styles.card}>
            <View style={styles.iconBox}>
              <Ionicons name={item.icon as any} size={26} color="#fff" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>Vote your {item.title}</Text>
            </View>

            {voted ? (
              <Ionicons name="checkmark-circle" size={28} color="green" />
            ) : (
              <Ionicons name="close-circle" size={28} color="red" />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 10,
    elevation: 2,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  description: {
    fontSize: 13,
    color: "#666",
  },
});
