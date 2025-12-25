// import { supabase } from "@/lib/supabase";
// import { useEffect, useState } from "react";
// import { Image, StyleSheet, View } from "react-native";

// const ActivityGallery = () => {
//   const [images, setImages] = useState<any[]>([]);

//   useEffect(() => {
//     loadImages();
//   }, []);

//   const loadImages = async () => {
//     const { data } = await supabase
//       .from("activity_images")
//       .select("id, image_url")
//       .order("created_at", { ascending: false });

//     if (data) setImages(data);
//   };

//   return (
//     <View style={styles.grid}>
//       {images.map((item) => (
//         <Image
//           key={item.id}
//           source={{ uri: item.image_url }}
//           style={styles.image}
//         />
//       ))}
//     </View>
//   );
// };

// export default ActivityGallery;

// const styles = StyleSheet.create({
//   grid: {
//     paddingHorizontal: 16,
//     marginTop: 20,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   image: {
//     width: "48%",
//     height: 130,
//     borderRadius: 12,
//     marginBottom: 10,
//     backgroundColor: "#eee",
//   },
// });
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur"; // If not using Expo, use View with backgroundColor: 'rgba(0,0,0,0.8)'
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const ActivityGallery = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    const { data } = await supabase
      .from("activity_images")
      .select("id, image_url")
      .order("created_at", { ascending: false });

    if (data) setImages(data);
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{ marginTop: 50 }}
        />
      ) : (
        <View style={styles.grid}>
          {images.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.9}
              style={styles.card}
              onPress={() => setSelectedImage(item.image_url)}
            >
              <Image source={{ uri: item.image_url }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Modern Pop-up Modal */}
      <Modal
        visible={!!selectedImage}
        transparent={true}
        animationType="fade"
        statusBarTranslucent
      >
        <BlurView intensity={80} tint="dark" style={styles.modalOverlay}>
          <Pressable
            style={styles.closeButton}
            onPress={() => setSelectedImage(null)}
          >
            <Ionicons name="close-circle" size={44} color="white" />
          </Pressable>

          {/* <View style={styles.modalContent}>
            <Image
              source={{ uri: selectedImage || "" }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          </View> */}
          <View style={styles.modalContent}>
            <Image
              source={{ uri: selectedImage || "" }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          </View>
        </BlurView>
      </Modal>
    </ScrollView>
  );
};

export default ActivityGallery;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1a1a1a",
    marginHorizontal: 16,
    marginTop: 60,
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  card: {
    width: width / 2 - 20,
    height: 220,
    marginBottom: 16,
    borderRadius: 20,
    // Soft Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  // Modal UI
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
  },
  modalContent: {
    width: width,
    height: height * 0.8,
    borderRadius: 20,
    overflow: "hidden",
  },

  fullImage: {
    width: "96%",
    height: "100%",
    alignSelf: "center",
  },
});
