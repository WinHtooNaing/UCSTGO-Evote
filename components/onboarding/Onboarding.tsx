import { COLORS } from "@/data/color";
import data, { OnboardItem } from "@/data/onboarding";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
const { width, height } = Dimensions.get("window");

export const SIZES = {
  base: 10,
  width,
  height,
};

const Onboarding = () => {
  const router = useRouter();
  const flatlistRef = useRef<FlatList<OnboardItem>>(null);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [viewableItems, setViewableItems] = useState<ViewToken[]>([]);

  const handleViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      setViewableItems(viewableItems);
    }
  );

  useEffect(() => {
    if (!viewableItems[0]) return;
    if (viewableItems[0].index !== null) {
      setCurrentPage(viewableItems[0].index);
    }
  }, [viewableItems]);

  const handleNext = () => {
    if (currentPage === data.length - 1) return;
    flatlistRef.current?.scrollToIndex({
      animated: true,
      index: currentPage + 1,
    });
  };

  const handleBack = () => {
    if (currentPage === 0) return;
    flatlistRef.current?.scrollToIndex({
      animated: true,
      index: currentPage - 1,
    });
  };

  const handleSkipToEnd = () => {
    flatlistRef.current?.scrollToIndex({
      animated: true,
      index: data.length - 1,
    });
  };

  const renderTopSection = () => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: SIZES.base * 2,
      }}
    >
      {/* Back Button */}
      <TouchableOpacity onPress={handleBack} style={{ padding: SIZES.base }}>
        <AntDesign
          name="left"
          size={25}
          color={COLORS.black}
          style={{ opacity: currentPage === 0 ? 0 : 1 }}
        />
      </TouchableOpacity>

      {/* Skip Button */}
      <TouchableOpacity onPress={handleSkipToEnd}>
        <Text
          style={{
            fontSize: 18,
            color: COLORS.black,
            opacity: currentPage === data.length - 1 ? 0 : 1,
          }}
        >
          Skip
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderBottomSection = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: SIZES.base * 2,
        paddingVertical: SIZES.base * 2,
      }}
    >
      {/* Pagination dots */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {data.map((_, index) => (
          <View
            key={index}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor:
                index === currentPage ? COLORS.primary : COLORS.primary + "20",
              marginRight: 8,
            }}
          />
        ))}
      </View>

      {/* Next or Get Started */}
      {currentPage !== data.length - 1 ? (
        <TouchableOpacity
          onPress={handleNext}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.primary,
          }}
        >
          <AntDesign
            name="right"
            size={18}
            color={COLORS.white}
            style={{ opacity: 0.3 }}
          />
          <AntDesign
            name="right"
            size={25}
            color={COLORS.white}
            style={{ marginLeft: -15 }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.setItem("onboarding_completed", "true");
            router.replace("/login");
          }}
          style={{
            paddingHorizontal: SIZES.base * 2,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.primary,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: COLORS.white, fontSize: 18 }}>Get Started</Text>

          <AntDesign
            name="right"
            size={18}
            color={COLORS.white}
            style={{ opacity: 0.3, marginLeft: SIZES.base }}
          />
          <AntDesign
            name="right"
            size={25}
            color={COLORS.white}
            style={{ marginLeft: -15 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );

  const renderFlatlistItem = ({ item }: { item: OnboardItem }) => (
    <View
      style={{
        width: SIZES.width,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ alignItems: "center", marginVertical: SIZES.base * 2 }}>
        <LottieView
          source={item.img}
          autoPlay
          loop
          style={{ width: 335, height: 300 }}
        />
      </View>

      <View
        style={{
          paddingHorizontal: SIZES.base * 4,
          marginVertical: SIZES.base * 4,
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}>
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 18,
            opacity: 0.4,
            textAlign: "center",
            marginTop: 15,
            lineHeight: 28,
          }}
        >
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {renderTopSection()}

      <FlatList
        ref={flatlistRef}
        data={data}
        horizontal
        pagingEnabled
        renderItem={renderFlatlistItem}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        onViewableItemsChanged={handleViewableItemsChanged.current}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
      />

      {renderBottomSection()}
    </View>
  );
};

export default Onboarding;
