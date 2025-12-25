// import ImageCarouselScreen from "@/components/detail/ImageCarouselScreen";
// import Loading from "@/components/Loading";
// import { COLORS } from "@/data/color";
// import { useSession } from "@/hooks/useSession";
// import { supabase } from "@/lib/supabase";
// import { useLocalSearchParams } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function CandidateDetail() {
//   const { id, category } = useLocalSearchParams();
//   const { student } = useSession();

//   const [candidate, setCandidate] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [voting, setVoting] = useState(false);

//   const [alreadyVotedCategory, setAlreadyVotedCategory] = useState(false);
//   const [alreadyVotedCandidate, setAlreadyVotedCandidate] = useState(false);

//   const [votingOpen, setVotingOpen] = useState(false);

//   const fetchVotingStatus = async () => {
//     const { data, error } = await supabase
//       .from("voting_settings")
//       .select("is_open")
//       .single();

//     if (!error) {
//       setVotingOpen(data.is_open);
//     }
//   };

//   // ------------------------------------
//   // FETCH DETAILS
//   // ------------------------------------
//   const fetchDetail = async () => {
//     setLoading(true);

//     // 1) Get candidate info
//     const { data: candData } = await supabase
//       .from("candidates")
//       .select("*")
//       .eq("id", id)
//       .single();

//     setCandidate(candData);

//     // 2) Check student vote restrictions
//     if (student?.id) {
//       // Has voted this category already?
//       const { data: categoryVote } = await supabase
//         .from("votes")
//         .select("*")
//         .eq("student_id", student.id)
//         .eq("category", category)
//         .maybeSingle();

//       setAlreadyVotedCategory(Boolean(categoryVote));

//       // Has voted this candidate already (in ANY category)?
//       const { data: sameCandidateVote } = await supabase
//         .from("votes")
//         .select("*")
//         .eq("student_id", student.id)
//         .eq("candidate_id", id)
//         .maybeSingle();

//       setAlreadyVotedCandidate(Boolean(sameCandidateVote));
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     if (student?.id) {
//       fetchDetail();
//       fetchVotingStatus();
//     }
//   }, [id, student]);

//   // ------------------------------------
//   // HANDLE VOTE
//   // ------------------------------------
//   const handleVote = async () => {
//     if (alreadyVotedCategory)
//       return Alert.alert("Error", `You already voted for ${category}.`);

//     if (alreadyVotedCandidate)
//       return Alert.alert(
//         "Error",
//         "You already voted this candidate in another category."
//       );

//     setVoting(true);

//     try {
//       // Insert into votes table
//       const { error: voteError } = await supabase.from("votes").insert({
//         student_id: student.id,
//         candidate_id: candidate.id,
//         category,
//       });

//       if (voteError) throw voteError;

//       // -----------------------------
//       // UPDATE student table (your code)
//       // -----------------------------
//       const voteField =
//         category === "King"
//           ? "voted_king"
//           : category === "Queen"
//           ? "voted_queen"
//           : category === "Prince"
//           ? "voted_prince"
//           : category === "Princess"
//           ? "voted_princess"
//           : "voted_innocent";

//       const { error: studentError } = await supabase
//         .from("students")
//         .update({ [voteField]: true })
//         .eq("id", student.id);

//       if (studentError) throw studentError;

//       // Update UI state
//       setAlreadyVotedCategory(true);

//       Alert.alert("Success", "Vote submitted successfully!");
//     } catch (err) {
//       console.log(err);
//       Alert.alert("Error", "Something went wrong.");
//     } finally {
//       setVoting(false);
//     }
//   };

//   // ------------------------------------
//   // UI
//   // ------------------------------------
//   if (loading) return <Loading />;

//   if (!candidate)
//     return (
//       <Text style={{ marginTop: 40, textAlign: "center" }}>
//         Candidate not found
//       </Text>
//     );

//   const disable = alreadyVotedCategory || alreadyVotedCandidate || voting;

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
//       <ImageCarouselScreen images={candidate.images || []} />

//       <View style={styles.content}>
//         <Text style={styles.name}>{candidate.name}</Text>
//         <Text style={styles.info}>{candidate.section}</Text>

//         {votingOpen ? (
//           <>
//             <TouchableOpacity
//               style={[
//                 styles.voteBtn,
//                 disable && { backgroundColor: "#cececeff" },
//               ]}
//               disabled={disable}
//               onPress={handleVote}
//             >
//               <Text style={styles.voteText}>
//                 {alreadyVotedCategory
//                   ? `Already voted for ${category}`
//                   : alreadyVotedCandidate
//                   ? "Already voted for this candidate"
//                   : voting
//                   ? "Voting..."
//                   : `Vote ${category}`}
//               </Text>
//             </TouchableOpacity>
//           </>
//         ) : (
//           <>
//             <Text style={styles.noteText}>
//               Voting is currently closed. Admin will open it soon.
//             </Text>
//           </>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   content: { padding: 20, marginTop: 20 },
//   name: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
//   info: { fontSize: 16, color: "#555" },
//   voteBtn: {
//     backgroundColor: COLORS.primary,
//     paddingVertical: 14,
//     borderRadius: 10,
//     marginTop: 25,
//     alignItems: "center",
//   },
//   voteText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "700",
//   },
//   noteText: {
//     marginTop: 20,
//     color: "#888",
//     fontSize: 14,
//     textAlign: "center",
//   },
// });
import ImageCarouselScreen from "@/components/detail/ImageCarouselScreen";
import Loading from "@/components/Loading";
import { COLORS } from "@/data/color";
import { useSession } from "@/hooks/useSession";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CandidateDetail() {
  const router = useRouter();
  const { id, category } = useLocalSearchParams();
  const { student } = useSession();

  const [candidate, setCandidate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);

  const [alreadyVotedCategory, setAlreadyVotedCategory] = useState(false);
  const [alreadyVotedCandidate, setAlreadyVotedCandidate] = useState(false);
  const [votingOpen, setVotingOpen] = useState(false);

  // -------------------------------
  // FETCH VOTING STATUS
  // -------------------------------
  const fetchVotingStatus = async () => {
    const { data } = await supabase
      .from("voting_settings")
      .select("is_open")
      .single();

    if (data) setVotingOpen(data.is_open);
  };

  // -------------------------------
  // FETCH DETAIL
  // -------------------------------
  const fetchDetail = async () => {
    setLoading(true);

    const { data: candData } = await supabase
      .from("candidates")
      .select("*")
      .eq("id", id)
      .single();

    setCandidate(candData);

    if (student?.id) {
      const { data: categoryVote } = await supabase
        .from("votes")
        .select("id")
        .eq("student_id", student.id)
        .eq("category", category)
        .maybeSingle();

      setAlreadyVotedCategory(!!categoryVote);

      const { data: sameCandidateVote } = await supabase
        .from("votes")
        .select("id")
        .eq("student_id", student.id)
        .eq("candidate_id", id)
        .maybeSingle();

      setAlreadyVotedCandidate(!!sameCandidateVote);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (student?.id) {
      fetchDetail();
      fetchVotingStatus();
    }
  }, [id, student]);

  // -------------------------------
  // HANDLE VOTE
  // -------------------------------
  const handleVote = async () => {
    if (alreadyVotedCategory)
      return Alert.alert("Error", `You already voted for ${category}`);

    if (alreadyVotedCandidate)
      return Alert.alert("Error", "You already voted this candidate");

    setVoting(true);

    try {
      const { error } = await supabase.from("votes").insert({
        student_id: student.id,
        candidate_id: candidate.id,
        category,
      });

      if (error) throw error;

      Alert.alert("Success", "Vote submitted successfully!");
      setAlreadyVotedCategory(true);
    } catch {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setVoting(false);
    }
  };

  // -------------------------------
  // UI
  // -------------------------------
  if (loading) return <Loading />;

  if (!candidate)
    return (
      <Text style={{ marginTop: 40, textAlign: "center" }}>Not found</Text>
    );

  const disable = alreadyVotedCategory || alreadyVotedCandidate || voting;

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER (Back button NOT on image) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* IMAGE */}
        <ImageCarouselScreen images={candidate.images || []} />

        {/* CONTENT */}
        <View style={styles.content}>
          <Text style={styles.name}>{candidate.name}</Text>
          <Text style={styles.info}>{candidate.section}</Text>

          {/* VOTE BUTTON / NOTE */}
          {votingOpen ? (
            <TouchableOpacity
              style={[styles.voteBtn, disable && styles.disabledBtn]}
              disabled={disable}
              onPress={handleVote}
            >
              <Text style={styles.voteText}>
                {alreadyVotedCategory
                  ? "Already Voted ✅"
                  : voting
                  ? "Voting..."
                  : `Vote ${category}`}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.noteText}>
              Voting is currently closed. Admin will open it soon.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },

  content: {
    padding: 20,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 6,
  },

  info: {
    fontSize: 16,
    color: "#555",
  },

  voteBtn: {
    marginTop: 25,
    backgroundColor: COLORS.secondary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  disabledBtn: {
    backgroundColor: "#cfcfcf",
  },

  voteText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  noteText: {
    marginTop: 20,
    textAlign: "center",
    color: "#888",
  },

  extraBox: {
    marginTop: 30,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#f9f9f9",
  },

  extraTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },

  extraText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
});
