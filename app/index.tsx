import LoginScreen from "@/components/Login";
import WelcomeScreen from "@/components/Welcome";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false); // After 5 seconds → show login
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {showWelcome ? <WelcomeScreen /> : <LoginScreen />}
      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
