// import ProfileList from "@/components/ProfileList";
// import { useSession } from "@/hooks/useSession";
// import { supabase } from "@/lib/supabase";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import * as SecureStore from "expo-secure-store";
// import React from "react";
// import {
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const Profile = () => {
//   const router = useRouter();
//   const { student } = useSession();
//   const handleLogout = async () => {
//     // 1. Clear Supabase session
//     await supabase.auth.signOut();

//     // 2. Clear SecureStore session
//     await SecureStore.deleteItemAsync("student_session");

//     // 3. Redirect to login
//     router.replace("/");
//   };

//   return (
//     <SafeAreaView>
//       <View style={styles.container}>
//         <View style={styles.headerRow}>
//           <Text style={styles.header}>Hello {student?.password}</Text>

//           <TouchableOpacity style={styles.refreshBtn}>
//             <Ionicons name="refresh" size={26} color="#333" />
//           </TouchableOpacity>
//         </View>

//         {/* Categories */}
//         <ProfileList />

//         {/* LOGOUT BUTTON */}
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
//     // paddingTop: 10,
//     paddingBottom: 40,
//     backgroundColor: "#fff",
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     // margin: 20,
//     marginTop: 20,
//   },
//   headerRow: {
//     // marginTop: 50,
//     marginHorizontal: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   refreshBtn: {
//     padding: 6,
//     backgroundColor: "#f2f2f2",
//     borderRadius: 10,
//     elevation: 3,
//   },

//   logoutBtn: {
//     flexDirection: "row",
//     backgroundColor: "#ff3b30",
//     paddingVertical: 14,
//     marginHorizontal: 20,
//     marginTop: 20,
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
  const { student, loading, refresh } = useSession(); // ⬅ added refresh()

  // const handleLogout = async () => {
  //   await supabase.auth.signOut();
  //   await SecureStore.deleteItemAsync("student_session");
  //   router.replace("/");
  // };
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

  if (loading || !student) return <Loading />;
  // if (!student) {
  //   return handleLogout(); // If no student data, logout
  // }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.header}>Hello {student?.password}</Text>

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
    backgroundColor: COLORS.seconary,
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
