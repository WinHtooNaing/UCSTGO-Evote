import { Stack } from "expo-router";
import React from "react";
import { AlertNotificationRoot } from "react-native-alert-notification";
import FlashMessage from "react-native-flash-message";
const Layout = () => {
  return (
    <AlertNotificationRoot
      theme={"light"}
      colors={[
        {
          // LIGHT THEME
          label: "#000",
          card: "#fff",
          overlay: "rgba(0, 0, 0, 0.5)",
          success: "#2ecc71",
          danger: "#e74c3c",
          warning: "#f1c40f",
          info: "#3c7a89", // Your custom info color for light mode
        },
        {
          // DARK THEME
          label: "#fff",
          card: "#1a1a1a",
          overlay: "rgba(0, 0, 0, 0.8)",
          success: "#27ae60",
          danger: "#c0392b",
          warning: "#f39c12",
          info: "#3c7a89", // Your custom info color for dark mode
        },
      ]}
    >
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="home"
          options={{ animation: "slide_from_left", headerShown: false }}
        />
        <Stack.Screen
          name="login"
          options={{ animation: "slide_from_bottom", headerShown: false }}
        />
      </Stack>
      <FlashMessage
        position="bottom"
        floating
        duration={2500}
        style={{
          marginBottom: 150,
          borderRadius: 30,
          width: "50%",
          alignSelf: "center",
        }}
        titleStyle={{
          textAlign: "center",
          alignSelf: "center",
        }}
      />
    </AlertNotificationRoot>
  );
};

export default Layout;
