// import ActivityGallery from "@/components/ActivityGallery";
// import ImageCarousel from "@/components/ImageCarousel";
// import MusicPlayer from "@/components/MusicPlayer";
// import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const Index = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <ImageCarousel />

//       <View style={styles.playerWrapper}>
//         <MusicPlayer />
//       </View>
//       <Text style={styles.title}>University Activities</Text>

//       {/* ONLY Gallery Scroll */}
//       <ScrollView style={styles.galleryWrapper}>
//         <ActivityGallery />
//       </ScrollView>

//       <StatusBar barStyle="dark-content" />
//     </SafeAreaView>
//   );
// };

// export default Index;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   playerWrapper: {
//     paddingHorizontal: 16,
//     marginTop: 10,
//   },
//   galleryWrapper: {
//     flex: 1, // ⭐ remaining height only
//     marginTop: 10,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "700",
//     marginVertical: 10,
//     paddingHorizontal: 16,
//     paddingTop: 10,
//   },
// });

import ActivityGallery from "@/components/ActivityGallery";
import ImageCarousel from "@/components/ImageCarousel";
import MusicPlayer from "@/components/MusicPlayer";
import React, { useCallback, useRef, useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const [refreshing, setRefreshing] = useState(false);
  const galleryRef = useRef<{ reload: () => void }>(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    galleryRef.current?.reload();

    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageCarousel />

      <View style={styles.playerWrapper}>
        <MusicPlayer />
      </View>

      <Text style={styles.title}>University Activities</Text>

      {/* ✅ ONLY Gallery Scroll */}
      <View style={styles.galleryWrapper}>
        <ActivityGallery />
      </View>

      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  playerWrapper: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  galleryWrapper: {
    flex: 1,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 10,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
});
