import LottieView from "lottie-react-native";
import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";

export default function WelcomeScreen() {
  const animationRef = useRef<LottieView>(null);

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        autoPlay
        loop={false}
        style={{ width: 300, height: 300 }}
        source={require("../assets/animation/vote.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});
