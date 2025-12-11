import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const tabs = ["King", "Queen", "Prince", "Princess", "Innocent"];

export default function VoteTabs({ onChange }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePress = (index: number) => {
    setActiveIndex(index);
    onChange?.(tabs[index]);
  };

  return (
    <View style={{ marginTop: 10 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeIndex === index && styles.activeTab]}
            onPress={() => handlePress(index)}
          >
            <Text
              style={[styles.text, activeIndex === index && styles.activeText]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },

  tab: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#efefef",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  activeTab: {
    backgroundColor: "#ff4d4d",
    borderColor: "#ff4d4d",
  },

  text: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },

  activeText: {
    color: "white",
    fontWeight: "700",
  },
});
