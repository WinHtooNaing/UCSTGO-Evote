import { Stack } from "expo-router";
import React from "react";
import FlashMessage from "react-native-flash-message";
const Layout = () => {
  return (
    <>
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
    </>
  );
};

export default Layout;
