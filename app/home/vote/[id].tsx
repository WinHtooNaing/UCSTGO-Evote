import ImageCarouselScreen from "@/components/detail/ImageCarouselScreen";
import { useSession } from "@/hooks/useSession";
import { supabase } from "@/lib/supabase";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CandidateDetail() {
  const { id, category } = useLocalSearchParams();
  const { student } = useSession();

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);

  const [alreadyVotedCategory, setAlreadyVotedCategory] = useState(false);
  const [alreadyVotedCandidate, setAlreadyVotedCandidate] = useState(false);

  // ------------------------------------
  // FETCH DETAILS
  // ------------------------------------
  const fetchDetail = async () => {
    setLoading(true);

    // 1) Get candidate info
    const { data: candData } = await supabase
      .from("candidates")
      .select("*")
      .eq("id", id)
      .single();

    setCandidate(candData);

    // 2) Check student vote restrictions
    if (student?.id) {
      // Has voted this category already?
      const { data: categoryVote } = await supabase
        .from("votes")
        .select("*")
        .eq("student_id", student.id)
        .eq("category", category)
        .maybeSingle();

      setAlreadyVotedCategory(Boolean(categoryVote));

      // Has voted this candidate already (in ANY category)?
      const { data: sameCandidateVote } = await supabase
        .from("votes")
        .select("*")
        .eq("student_id", student.id)
        .eq("candidate_id", id)
        .maybeSingle();

      setAlreadyVotedCandidate(Boolean(sameCandidateVote));
    }

    setLoading(false);
  };

  useEffect(() => {
    if (student?.id) fetchDetail();
  }, [id, student]);

  // ------------------------------------
  // HANDLE VOTE
  // ------------------------------------
  const handleVote = async () => {
    if (alreadyVotedCategory)
      return Alert.alert("Error", `You already voted for ${category}.`);

    if (alreadyVotedCandidate)
      return Alert.alert(
        "Error",
        "You already voted this candidate in another category."
      );

    setVoting(true);

    try {
      // Insert into votes table
      const { error: voteError } = await supabase.from("votes").insert({
        student_id: student.id,
        candidate_id: candidate.id,
        category,
      });

      if (voteError) throw voteError;

      // -----------------------------
      // UPDATE student table (your code)
      // -----------------------------
      const voteField =
        category === "King"
          ? "voted_king"
          : category === "Queen"
          ? "voted_queen"
          : category === "Prince"
          ? "voted_prince"
          : category === "Princess"
          ? "voted_princess"
          : "voted_innocent";

      const { error: studentError } = await supabase
        .from("students")
        .update({ [voteField]: true })
        .eq("id", student.id);

      if (studentError) throw studentError;

      // Update UI state
      setAlreadyVotedCategory(true);

      Alert.alert("Success", "Vote submitted successfully!");
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setVoting(false);
    }
  };

  // ------------------------------------
  // UI
  // ------------------------------------
  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  if (!candidate)
    return (
      <Text style={{ marginTop: 40, textAlign: "center" }}>
        Candidate not found
      </Text>
    );

  const disable = alreadyVotedCategory || alreadyVotedCandidate || voting;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ImageCarouselScreen images={candidate.images || []} />

      <View style={styles.content}>
        <Text style={styles.name}>{candidate.name}</Text>
        <Text style={styles.info}>Section: {candidate.section}</Text>

        <TouchableOpacity
          style={[styles.voteBtn, disable && { backgroundColor: "#888" }]}
          disabled={disable}
          onPress={handleVote}
        >
          <Text style={styles.voteText}>
            {alreadyVotedCategory
              ? `Already voted ${category}`
              : alreadyVotedCandidate
              ? "Already voted this candidate"
              : voting
              ? "Voting..."
              : `Vote ${category}`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20 },
  name: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  info: { fontSize: 16, color: "#555" },
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
