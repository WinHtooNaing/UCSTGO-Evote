import React, { useLayoutEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const CustomImage = ({ item, x, index, size, spacer }) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  useLayoutEffect(() => {
    if (!item?.image) return;

    if (item.image.uri) {
      // Remote image
      Image.getSize(
        item.image.uri,
        (width, height) => setAspectRatio(width / height),
        () => setAspectRatio(1)
      );
    } else {
      // Local image
      const { width, height } = Image.resolveAssetSource(item.image);
      setAspectRatio(width / height);
    }
  }, [item.image]);

  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [(index - 2) * size, (index - 1) * size, index * size],
      [0.8, 1, 0.8]
    );
    return {
      transform: [{ scale }],
    };
  });

  if (!item.image) {
    return <View style={{ width: spacer }} key={index} />;
  }

  return (
    <View style={{ width: size }} key={index}>
      <Animated.View style={[styles.imageContainer, style]}>
        <Image
          resizeMode="contain"
          source={item.image}
          style={[styles.image, { aspectRatio }]}
        />
      </Animated.View>
    </View>
  );
};

export default CustomImage;

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 20,
    overflow: "hidden",
    borderColor: "#D4D4D4",
    borderWidth: 2,
  },
  image: {
    width: "100%",
    height: undefined,
  },
});
