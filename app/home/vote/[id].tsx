import { useSession } from "@/hooks/useSession";
import { supabase } from "@/lib/supabase";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CandidateDetail() {
  const { id, category } = useLocalSearchParams();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const { student } = useSession();
  const fetchDetail = async () => {
    const { data } = await supabase
      .from("candidates")
      .select("*")
      .eq("id", id)
      .single();

    setCandidate(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  if (!candidate)
    return (
      <Text style={{ marginTop: 40, textAlign: "center" }}>
        Candidate not found
      </Text>
    );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* BACK BUTTON */}
      {/* <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity> */}

      {/* IMAGE */}
      <Image
        source={{ uri: candidate.images?.[0] }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.name}>{candidate.name}</Text>

        <Text style={styles.info}> {candidate.section}</Text>

        {/* Vote Button */}
        <TouchableOpacity style={styles.voteBtn}>
          <Text style={styles.voteText}>Vote</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  back: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  backText: {
    fontSize: 16,
    color: "#444",
  },
  image: {
    width: "100%",
    height: 300,
    backgroundColor: "#ddd",
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginVertical: 4,
    color: "#555",
  },
  voteBtn: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 25,
    alignItems: "center",
  },
  voteText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});
