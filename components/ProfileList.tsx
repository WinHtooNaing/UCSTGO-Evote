// import { Ionicons } from "@expo/vector-icons";
// import React from "react";
// import {
//   FlatList,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// export type VoteCategory =
//   | "king"
//   | "queen"
//   | "prince"
//   | "princess"
//   | "innocence";

// export interface CategoryItem {
//   key: VoteCategory;
//   title: string;
//   description: string;
//   icon: string;
// }

// const categories: CategoryItem[] = [
//   {
//     key: "king",
//     title: "King",
//     description: "Vote your King candidate",
//     icon: "man-outline",
//   },
//   {
//     key: "queen",
//     title: "Queen",
//     description: "Vote your Queen candidate",
//     icon: "woman-outline",
//   },
//   {
//     key: "prince",
//     title: "Prince",
//     description: "Vote your Prince nominee",
//     icon: "body-outline",
//   },
//   {
//     key: "princess",
//     title: "Princess",
//     description: "Vote your Princess nominee",
//     icon: "rose-outline",
//   },
//   {
//     key: "innocence",
//     title: "Innocence",
//     description: "Vote the most Innocent student",
//     icon: "sparkles-outline",
//   },
// ];

// export default function ProfileList() {
//   // Replace this with your API or local storage value
//   const userVote: VoteCategory = "king";

//   return (
//     <FlatList
//       data={categories}
//       keyExtractor={(item) => item.key}
//       contentContainerStyle={{ padding: 20 }}
//       renderItem={({ item }) => {
//         const voted = item.key === userVote;

//         return (
//           <TouchableOpacity style={styles.card}>
//             <View style={styles.iconBox}>
//               <Ionicons name={item.icon as any} size={26} color="#fff" />
//             </View>

//             <View style={{ flex: 1 }}>
//               <Text style={styles.title}>{item.title}</Text>
//               <Text style={styles.description}>{item.description}</Text>
//             </View>

//             {/* RESULT MARK */}
//             {voted ? (
//               <Ionicons name="checkmark-circle" size={28} color="green" />
//             ) : (
//               <Ionicons name="close-circle" size={28} color="red" />
//             )}
//           </TouchableOpacity>
//         );
//       }}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     padding: 18,
//     borderRadius: 14,
//     alignItems: "center",
//     marginBottom: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 2,
//   },
//   iconBox: {
//     width: 48,
//     height: 48,
//     borderRadius: 12,
//     backgroundColor: "#007bff",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 15,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#222",
//   },
//   description: {
//     fontSize: 13,
//     color: "#666",
//     marginTop: 2,
//   },
// });

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export type VoteCategory =
  | "king"
  | "queen"
  | "prince"
  | "princess"
  | "innocent";

export interface CategoryItem {
  key: VoteCategory;
  title: string;
  description: string;
  icon: string;
}

const categories: CategoryItem[] = [
  {
    key: "king",
    title: "King",
    description: "Vote your King candidate",
    icon: "man-outline",
  },
  {
    key: "queen",
    title: "Queen",
    description: "Vote your Queen candidate",
    icon: "woman-outline",
  },
  {
    key: "prince",
    title: "Prince",
    description: "Vote your Prince nominee",
    icon: "body-outline",
  },
  {
    key: "princess",
    title: "Princess",
    description: "Vote your Princess nominee",
    icon: "rose-outline",
  },
  {
    key: "innocent",
    title: "Innocent",
    description: "Vote the most Innocent student",
    icon: "sparkles-outline",
  },
];

export default function ProfileList({ student }: { student: any }) {
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.key}
      contentContainerStyle={{ padding: 20 }}
      renderItem={({ item }) => {
        const voted = student?.[`voted_${item.key}`] === true;

        return (
          <TouchableOpacity style={styles.card}>
            <View style={styles.iconBox}>
              <Ionicons name={item.icon as any} size={26} color="#fff" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>

            {voted ? (
              <Ionicons name="checkmark-circle" size={28} color="green" />
            ) : (
              <Ionicons name="close-circle" size={28} color="red" />
            )}
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#007bff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },
  description: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
});
