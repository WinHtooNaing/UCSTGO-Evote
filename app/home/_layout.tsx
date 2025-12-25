import CustomNavBar from "@/components/CustomNavBar";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";
import React from "react";
const _layout = () => {
  return (
    <Tabs tabBar={(props) => <CustomNavBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="vote"
        options={{
          headerShown: false,
          title: "Vote",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="vote-yea" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <AntDesign name="profile" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
