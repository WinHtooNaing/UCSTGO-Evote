// import { supabase } from "@/lib/supabase";
// import { Feather, Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import * as SecureStore from "expo-secure-store";
// import { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// export default function LoginScreen() {
//   const [studentId, setStudentId] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const [focusedInput, setFocusedInput] = useState<
//     "" | "studentId" | "password"
//   >("");

//   const router = useRouter();

//   // Auto redirect if logged in
//   useEffect(() => {
//     const checkLogin = async () => {
//       const stored = await SecureStore.getItemAsync("student_session");
//       if (stored) router.replace("/home");
//     };
//     checkLogin();
//   }, []);

//   const onLogin = async () => {
//     if (!studentId || !password) {
//       return Alert.alert("Error", "Please enter Student ID & Password");
//     }

//     setLoading(true);

//     const { data, error } = await supabase
//       .from("students")
//       .select("*")
//       .eq("student_id", studentId)
//       .single();

//     setLoading(false);

//     if (error || !data) {
//       return Alert.alert("Login Failed", "Student ID not found");
//     }

//     if (data.password !== password) {
//       return Alert.alert("Login Failed", "Incorrect password");
//     }

//     await SecureStore.setItemAsync(
//       "student_session",
//       JSON.stringify({ id: data.id })
//     );

//     Alert.alert("Success", "Logged in successfully");
//     router.replace("/home");
//   };

//   return (
//     <View style={styles.container}>
//       {/* FULL WIDTH TOP BANNER IMAGE */}
//       <Image
//         source={require("@/assets/logo.jpg")}
//         style={styles.topImage}
//         resizeMode="cover"
//       />

//       <Text style={styles.title}>User Login</Text>

//       <View style={{ width: "100%", paddingHorizontal: 25, marginTop: 50 }}>
//         {/* STUDENT ID */}
//         <View
//           onTouchStart={() => setFocusedInput("studentId")}
//           style={[
//             styles.inputContainer,
//             focusedInput === "studentId" && styles.inputFocused,
//           ]}
//         >
//           <Ionicons
//             name="person-outline"
//             size={22}
//             color="#555"
//             style={styles.icon}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Student ID"
//             placeholderTextColor="#999"
//             value={studentId}
//             onChangeText={setStudentId}
//             onFocus={() => setFocusedInput("studentId")}
//           />
//         </View>

//         {/* PASSWORD */}
//         <View
//           onTouchStart={() => setFocusedInput("password")}
//           style={[
//             styles.inputContainer,
//             focusedInput === "password" && styles.inputFocused,
//           ]}
//         >
//           <Feather name="lock" size={22} color="#555" style={styles.icon} />

//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             placeholderTextColor="#999"
//             secureTextEntry={!showPassword}
//             value={password}
//             onChangeText={setPassword}
//             onFocus={() => setFocusedInput("password")}
//           />

//           <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//             <Feather
//               name={showPassword ? "eye-off" : "eye"}
//               size={18}
//               color="#555"
//             />
//           </TouchableOpacity>
//         </View>

//         {/* LOGIN BUTTON */}
//         <TouchableOpacity
//           style={[styles.button, loading && { opacity: 0.7 }]}
//           onPress={onLogin}
//           disabled={loading}
//         >
//           <Text style={styles.buttonText}>
//             {loading ? (
//               <ActivityIndicator size="small" color="#fff" />
//             ) : (
//               <Text style={styles.buttonText}>Login</Text>
//             )}
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.footer}>© UCSTGO Voting App 2025</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f9fd",
//     alignItems: "center",
//     // paddingHorizontal: 25,
//   },

//   topImage: {
//     width: "100%",
//     height: 170, // adjust for your design
//     marginBottom: 20,
//   },

//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: 20,
//     color: "#222",
//   },

//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     borderWidth: 1.5,
//     borderColor: "#ddd",
//     backgroundColor: "#fff",
//     paddingHorizontal: 12,
//     borderRadius: 12,
//     height: 55,
//     marginBottom: 18,
//   },

//   inputFocused: {
//     borderColor: "#007bff",
//     shadowColor: "#007bff",
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 3,
//   },

//   icon: {
//     marginRight: 10,
//   },

//   input: {
//     flex: 1,
//     fontSize: 16,
//     color: "#222",
//   },

//   button: {
//     width: "100%",
//     backgroundColor: "#007bff",
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 10,
//   },

//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "700",
//   },

//   footer: {
//     marginTop: 35,
//     fontSize: 12,
//     color: "#777",
//   },
// });
import { COLORS } from "@/data/color";
import { supabase } from "@/lib/supabase";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
// export const COLORS = {
//   primary: "#3c7a89",
//   seconary: "#2e4756",
// };

export default function LoginScreen() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [focusedInput, setFocusedInput] = useState<
    "" | "studentId" | "password"
  >("");

  const router = useRouter();

  // Auto redirect if logged in
  useEffect(() => {
    const checkLogin = async () => {
      const stored = await SecureStore.getItemAsync("student_session");
      if (stored) router.replace("/home");
    };
    checkLogin();
  }, []);

  const onLogin = async () => {
    if (!studentId || !password) {
      return showMessage({
        message: "Enter Full",
        backgroundColor: COLORS.alertColor,
      });
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("student_id", studentId)
      .single();

    setLoading(false);

    if (error || !data) {
      return showMessage({
        message: "Student ID not found",
        backgroundColor: COLORS.alertColor,
      });
    }

    if (data.password !== password) {
      return showMessage({
        message: "Incorrect password",
        backgroundColor: COLORS.alertColor,
      });
    }

    await SecureStore.setItemAsync(
      "student_session",
      JSON.stringify({ id: data.id })
    );

    showMessage({
      message: "Logged in successfully",
      backgroundColor: COLORS.alertColor,
    });

    router.replace("/home");
  };

  return (
    <View style={styles.container}>
      {/* FULL WIDTH TOP BANNER IMAGE */}
      <Image
        source={require("@/assets/logo.jpg")}
        style={styles.topImage}
        resizeMode="cover"
      />

      <Text style={styles.title}>User Login</Text>

      <View style={{ width: "100%", paddingHorizontal: 25, marginTop: 50 }}>
        {/* STUDENT ID */}
        <View
          onTouchStart={() => setFocusedInput("studentId")}
          style={[
            styles.inputContainer,
            focusedInput === "studentId" && styles.inputFocused,
          ]}
        >
          <Ionicons
            name="person-outline"
            size={22}
            color="#555"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Student ID"
            placeholderTextColor="#999"
            value={studentId}
            onChangeText={setStudentId}
            onFocus={() => setFocusedInput("studentId")}
          />
        </View>

        {/* PASSWORD */}
        <View
          onTouchStart={() => setFocusedInput("password")}
          style={[
            styles.inputContainer,
            focusedInput === "password" && styles.inputFocused,
          ]}
        >
          <Feather name="lock" size={22} color="#555" style={styles.icon} />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setFocusedInput("password")}
          />

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather
              name={showPassword ? "eye-off" : "eye"}
              size={18}
              color="#555"
            />
          </TouchableOpacity>
        </View>

        {/* LOGIN BUTTON */}
        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={onLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>© UCSTGO Voting App 2025</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fd",
    alignItems: "center",
  },

  topImage: {
    width: "100%",
    height: 170,
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: "#222",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 55,
    marginBottom: 18,
  },

  inputFocused: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#222",
  },

  button: {
    width: "100%",
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  footer: {
    marginTop: 35,
    fontSize: 12,
    color: "#777",
  },
});
