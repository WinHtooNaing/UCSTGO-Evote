import React, { useState } from "react";
import { Dimensions, Image, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

const images = [
  require("@/assets/slide1.png"),
  require("@/assets/slide2.png"),
  require("@/assets/slide3.png"),
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={{ width: "100%" }}>
      <Carousel
        width={width}
        height={220}
        autoPlay={true}
        loop={true}
        autoPlayInterval={3000}
        scrollAnimationDuration={1800}
        data={images}
        onSnapToItem={(i) => setCurrentIndex(i)}
        mode="parallax"
        modeConfig={{
          parallaxScrollingOffset: 60,
          parallaxScrollingScale: 0.95,
        }}
        renderItem={({ item }) => (
          <Image
            source={item}
            style={{
              width: "100%",
              height: 220,
            }}
            resizeMode="cover"
          />
        )}
      />

      {/* Pagination Dots */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
          marginBottom: 5,
        }}
      >
        {images.map((_, i) => (
          <View
            key={i}
            style={{
              width: currentIndex === i ? 24 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: currentIndex === i ? "#007bff" : "#b6c8ff",
              marginHorizontal: 4,
            }}
          />
        ))}
      </View>
    </View>
  );
}
