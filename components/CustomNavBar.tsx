import { COLORS } from "@/data/color";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const { width } = Dimensions.get("window");

const PRIMARY_COLOR = COLORS.primary;
const SECONDARY_COLOR = "#fff";

const CustomNavBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          if (["_sitemap", "+not-found"].includes(route.name)) return null;

          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <AnimatedTouchableOpacity
              key={route.key}
              layout={LinearTransition.springify().mass(0.5)}
              onPress={onPress}
              style={[styles.tabItem, isFocused && styles.activeTabItem]}
            >
              {getIcon(route.name, isFocused)}
              {isFocused && (
                <Animated.Text
                  entering={FadeIn.duration(150)}
                  exiting={FadeOut.duration(150)}
                  style={styles.text}
                >
                  {label}
                </Animated.Text>
              )}
            </AnimatedTouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

function getIcon(route: string, active: boolean) {
  const color = active ? PRIMARY_COLOR : SECONDARY_COLOR;

  switch (route) {
    case "index":
      return <Feather name="home" size={20} color={color} />;
    case "vote":
      return <FontAwesome6 name="vote-yea" size={20} color={color} />;
    case "profile":
      return <Feather name="user" size={20} color={color} />;
    default:
      return <Feather name="home" size={20} color={color} />;
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 25,
    width: "100%",
    alignItems: "center",
  },

  container: {
    flexDirection: "row",
    backgroundColor: PRIMARY_COLOR,
    width: width * 0.82, // 82% of screen width (responsive)
    maxWidth: 420, // prevents huge size on tablets
    height: width * 0.16, // height also responsive
    maxHeight: 70,
    minHeight: 55,
    borderRadius: 40,
    paddingHorizontal: width * 0.03,
    alignItems: "center",
    justifyContent: "space-between",

    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },

  tabItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    height: "70%",
    borderRadius: 30,
    flex: 1,
  },

  activeTabItem: {
    backgroundColor: SECONDARY_COLOR,
  },

  text: {
    marginLeft: 6,
    fontSize: 14,
    color: PRIMARY_COLOR,
    fontWeight: "600",
  },
});

export default CustomNavBar;
