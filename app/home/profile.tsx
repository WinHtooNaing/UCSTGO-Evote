import Loading from "@/components/Loading";
import ProfileList from "@/components/ProfileList";
import { COLORS } from "@/data/color";
import { useSession } from "@/hooks/useSession";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const router = useRouter();
  const { student, loading, refresh } = useSession();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }, []);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
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
    ]);
  };

  if (loading && !student) return <Loading />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={[student]}
        keyExtractor={() => "profile"}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 140 }}
        renderItem={() => (
          <>
            {/* HEADER */}
            <View style={styles.headerRow}>
              <Text style={styles.header}>Hello {student?.name}</Text>

              <TouchableOpacity style={styles.refreshBtn} onPress={onRefresh}>
                <Ionicons name="refresh" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {/* PROFILE LIST (NO FlatList inside) */}
            <ProfileList student={student} />

            {/* LOGOUT */}
            <View style={styles.logoutWrapper}>
              <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={22} color="#fff" />
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      />

      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  refreshBtn: {
    padding: 6,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  logoutWrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  logoutBtn: {
    flexDirection: "row",
    backgroundColor: COLORS.secondary,
    paddingVertical: 14,
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
