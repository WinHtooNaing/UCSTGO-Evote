import Loading from "@/components/Loading";
import ProfileList from "@/components/ProfileList";
import { COLORS } from "@/data/color";
import { useSession } from "@/hooks/useSession";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React from "react";
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const router = useRouter();
  const { student, loading, refresh } = useSession();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          style: "destructive",
          onPress: async () => {
            await supabase.auth.signOut();
            await SecureStore.deleteItemAsync("student_session");
            router.replace("/");
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleRefresh = async () => {
    await refresh(); // ⬅ reload student record
  };
  // if (!student) {
  //   return router.replace("/");
  // }
  if (loading) return <Loading />;
  if (!student) {
    return router.replace("/");
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.header}>Hello {student?.name}</Text>

          <TouchableOpacity style={styles.refreshBtn} onPress={handleRefresh}>
            <Ionicons name="refresh" size={26} color="#333" />
          </TouchableOpacity>
        </View>

        <ProfileList student={student} />

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  headerRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  refreshBtn: {
    padding: 6,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    elevation: 3,
  },
  logoutBtn: {
    flexDirection: "row",
    backgroundColor: COLORS.secondary,
    paddingVertical: 14,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 6,
  },
});
// import Loading from "@/components/Loading";
// import ProfileList from "@/components/ProfileList";
// import { COLORS } from "@/data/color";
// import { useSession } from "@/hooks/useSession";
// import { supabase } from "@/lib/supabase";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import * as SecureStore from "expo-secure-store";
// import React, { useEffect } from "react";
// import {
//   Alert,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const Profile = () => {
//   const router = useRouter();
//   const { student, loading, refresh } = useSession();

//   // ✅ AUTO LOGOUT if student missing
//   useEffect(() => {
//     if (!loading && !student) {
//       handleForceLogout();
//     }
//   }, [loading, student]);

//   const handleForceLogout = async () => {
//     await supabase.auth.signOut();
//     await SecureStore.deleteItemAsync("student_session");
//     router.replace("/");
//   };

//   const handleLogout = () => {
//     Alert.alert(
//       "Logout",
//       "Are you sure you want to logout?",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "OK",
//           style: "destructive",
//           onPress: handleForceLogout,
//         },
//       ],
//       { cancelable: true }
//     );
//   };

//   const handleRefresh = async () => {
//     await refresh();
//   };

//   if (loading) return <Loading />;

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <View style={styles.headerRow}>
//           <Text style={styles.header}>Hello {student?.name}</Text>

//           <TouchableOpacity style={styles.refreshBtn} onPress={handleRefresh}>
//             <Ionicons name="refresh" size={26} color="#333" />
//           </TouchableOpacity>
//         </View>

//         <ProfileList student={student} />

//         <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
//           <Ionicons name="log-out-outline" size={22} color="#fff" />
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>
//       </View>

//       <StatusBar barStyle="dark-content" />
//     </SafeAreaView>
//   );
// };

// export default Profile;

// const styles = StyleSheet.create({
//   container: {
//     paddingBottom: 120,
//     backgroundColor: "#fff",
//     flex: 1,
//   },
//   headerRow: {
//     marginHorizontal: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   refreshBtn: {
//     padding: 6,
//     backgroundColor: "#f2f2f2",
//     borderRadius: 10,
//     elevation: 3,
//   },
//   logoutBtn: {
//     flexDirection: "row",
//     backgroundColor: COLORS.secondary,
//     paddingVertical: 14,
//     marginHorizontal: 20,
//     // marginTop: 20,
//     borderRadius: 14,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   logoutText: {
//     color: "#fff",
//     fontSize: 17,
//     fontWeight: "600",
//     marginLeft: 6,
//   },
// });
