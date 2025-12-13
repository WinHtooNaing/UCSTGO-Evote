// import Onboarding from "@/components/onboarding/Onboarding";
// import WelcomeScreen from "@/components/Welcome";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useRouter } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { StatusBar, StyleSheet } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function Index() {
//   const router = useRouter();
//   const [showWelcome, setShowWelcome] = useState(true);
//   const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

//   useEffect(() => {
//     const checkOnboardingStatus = async () => {
//       const completed = await AsyncStorage.getItem("onboarding_completed");
//       setShowOnboarding(completed !== "true"); // true → show onboarding
//     };

//     checkOnboardingStatus();
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowWelcome(false);
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, []);

//   // Redirect automatically when onboarding is already completed
//   useEffect(() => {
//     if (showOnboarding === false && !showWelcome) {
//       router.replace("/login");
//     }
//   }, [showOnboarding, showWelcome]);

//   // Still loading async storage
//   if (showOnboarding === null) return null;

//   return (
//     <SafeAreaView style={styles.container}>
//       {showWelcome ? <WelcomeScreen /> : showOnboarding ? <Onboarding /> : null}

//       <StatusBar barStyle="dark-content" />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

import Onboarding from "@/components/onboarding/Onboarding";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Onboarding />
    </SafeAreaView>
  );
};

export default Index;
