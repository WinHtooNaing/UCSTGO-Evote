import { COLORS } from "@/data/color";
import React from "react";
import { StyleSheet, View } from "react-native";
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
          dotColor={COLORS.primary}
        />
      </View>
    </View>
  );
};

export default ImageCarouselScreen;

const styles = StyleSheet.create({
  container: {
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
    // flex: 1,
  },

  carouselContainer: {
    height: 400, // ← IMPORTANT (fix carousel height)
  },
});
