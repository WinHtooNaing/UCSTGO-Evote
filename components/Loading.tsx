import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007bff" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: 200,
    backgroundColor: "#fff",
  },
  text: {
    marginTop: 12,
    fontSize: 18,
    color: "#444",
    fontWeight: "600",
  },
});
