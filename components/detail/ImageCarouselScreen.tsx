import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import CustomImageCarousal from "./CustomImageCarousal";

const ImageCarouselScreen = ({ images }) => {
  const data =
    images?.map((img) => ({
      image: { uri: img },
    })) || [];

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <CustomImageCarousal
          data={data}
          autoPlay={false}
          pagination={true}
          dotColor={"blue"}
        />
      </View>
    </View>
  );
};

export default ImageCarouselScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },

  carouselContainer: {
    height: 300, // ← IMPORTANT (fix carousel height)
  },
});
