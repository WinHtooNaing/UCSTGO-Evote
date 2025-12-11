import { Candidate } from "@/hooks/candidates";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  item: Candidate;
  onPress: (candidate: Candidate) => void;
};

export default function CandidateCard({ item, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <Image source={{ uri: item.images[0] }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.section}>{item.section}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    paddingBottom: 10,
  },
  image: {
    width: "100%",
    height: 140,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  section: {
    textAlign: "center",
    fontSize: 13,
    color: "#777",
  },
});
