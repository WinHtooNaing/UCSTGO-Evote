import Loading from "@/components/Loading";
import VoteTabs from "@/components/VoteTabs";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
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

      <View style={{ marginTop: 15, marginBottom: 5, paddingHorizontal: 15 }}>
        <Text style={styles.title}>{activeTab}</Text>
      </View>

      {loading ? (
        <Loading />
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
