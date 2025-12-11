// import VoteTabs from "@/components/VoteTabs";
// import React, { useState } from "react";
// import { StatusBar, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const Vote = () => {
//   const [activeTab, setActiveTab] = useState("King");

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
//       {/* Top Tabs */}
//       <VoteTabs onChange={setActiveTab} />

//       <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
//         <Text style={{ fontSize: 22, fontWeight: "bold" }}>
//           {activeTab} Selection
//         </Text>
//       </View>

//       <StatusBar barStyle="dark-content" />
//     </SafeAreaView>
//   );
// };

// export default Vote;
// import VoteTabs from "@/components/VoteTabs";
// import { supabase } from "@/lib/supabase";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function Vote() {
//   const [activeTab, setActiveTab] = useState("King");
//   const [candidates, setCandidates] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // gender logic
//   const genderFilter = {
//     King: "boy",
//     Queen: "girl",
//     Prince: "boy",
//     Princess: "girl",
//     Innocence: null, // show all
//   };

//   const fetchCandidates = async () => {
//     setLoading(true);

//     let query = supabase.from("candidates").select("*");

//     const gender = genderFilter[activeTab];
//     if (gender) {
//       query = query.eq("gender", gender);
//     }

//     const { data, error } = await query;

//     if (!error) {
//       setCandidates(data);
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchCandidates();
//   }, [activeTab]);

//   const renderItem = ({ item }) => (
//     <TouchableOpacity style={styles.card}>
//       <Image
//         source={{ uri: item.images?.[0] }}
//         style={styles.image}
//         resizeMode="cover"
//       />

//       <View style={{ padding: 10 }}>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.section}>Section: {item.section}</Text>
//         <Text style={styles.gender}>Gender: {item.gender}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
//       {/* Top Tabs */}
//       <VoteTabs onChange={setActiveTab} />

//       <View style={styles.titleRow}>
//         <Text style={styles.titleText}>{activeTab} Selection</Text>
//       </View>

//       {loading ? (
//         <View style={styles.loadingBox}>
//           <ActivityIndicator size="large" color="#ff4d4d" />
//           <Text style={{ marginTop: 10, fontSize: 16 }}>Loading...</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={candidates}
//           keyExtractor={(item) => item.id}
//           renderItem={renderItem}
//           contentContainerStyle={{ paddingBottom: 40 }}
//         />
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   titleRow: {
//     marginTop: 20,
//     paddingHorizontal: 20,
//   },
//   titleText: {
//     fontSize: 22,
//     fontWeight: "bold",
//   },
//   loadingBox: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   card: {
//     backgroundColor: "#fff",
//     marginHorizontal: 20,
//     marginTop: 16,
//     borderRadius: 18,
//     overflow: "hidden",
//     elevation: 3,
//     borderWidth: 1,
//     borderColor: "#eee",
//   },
//   image: {
//     width: "100%",
//     height: 200,
//   },
//   name: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   section: {
//     marginTop: 4,
//     color: "#666",
//   },
//   gender: {
//     marginTop: 2,
//     color: "#999",
//   },
// });
import VoteTabs from "@/components/VoteTabs";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Vote() {
  const [activeTab, setActiveTab] = useState("King");
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // Gender filter mapping
  const genderFilter = {
    King: "boy",
    Queen: "girl",
    Prince: "boy",
    Princess: "girl",
    Innocent: null,
  };

  const fetchCandidates = async () => {
    setLoading(true);

    let query = supabase.from("candidates").select("*");

    const gender = genderFilter[activeTab];
    if (gender) query = query.eq("gender", gender);

    const { data } = await query;
    setCandidates(data || []);

    setLoading(false);
  };

  useEffect(() => {
    fetchCandidates();
  }, [activeTab]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: `/home/vote/[id]`,
          params: { id: item.id, category: activeTab },
        })
      }
    >
      <Image
        source={{ uri: item.images?.[0] }}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <VoteTabs onChange={setActiveTab} />

      <View style={{ marginTop: 15, paddingHorizontal: 15 }}>
        <Text style={styles.title}>{activeTab} Candidates</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={candidates}
          numColumns={2} // ⬅️ Two columns
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ padding: 15 }}
        />
      )}
      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  card: {
    width: "48%", // two per row
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
    shadowOpacity: 0.1,
  },
  image: {
    width: "100%",
    height: 150,
    backgroundColor: "#eee",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    paddingVertical: 10,
  },
});
