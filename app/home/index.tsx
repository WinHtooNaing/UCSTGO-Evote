import CountdownTimer from "@/components/CountdownTimer";
import HomeCategories from "@/components/HomeCategories";
import ImageCarousel from "@/components/ImageCarousel";
import { ScrollView, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: "#fff" }}>
        <ImageCarousel />
        <HomeCategories />
        <View style={{ flex: 1, top: 20, alignItems: "center" }}>
          <CountdownTimer targetDate="2025-12-30T11:59:59" />
        </View>
      </ScrollView>
      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
};

export default Index;
