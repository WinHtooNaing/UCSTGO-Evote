// import { supabase } from "@/lib/supabase";
// import * as SecureStore from "expo-secure-store";
// import { useEffect, useState } from "react";

// export const useSession = () => {
//   const [student, setStudent] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const load = async () => {
//       const stored = await SecureStore.getItemAsync("student_session");

//       if (stored) {
//         const parsed = JSON.parse(stored);

//         const { data } = await supabase
//           .from("students")
//           .select("*")
//           .eq("id", parsed.id)
//           .single();

//         setStudent(data);
//       }
//       setLoading(false);
//     };
//     load();
//   }, []);

//   return { student, loading };
// };
// import { supabase } from "@/lib/supabase";
// import * as SecureStore from "expo-secure-store";
// import { useEffect, useState } from "react";

// export const useSession = () => {
//   const [student, setStudent] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const load = async () => {
//       const stored = await SecureStore.getItemAsync("student_session");

//       if (!stored) {
//         setLoading(false);
//         return;
//       }

//       const parsed = JSON.parse(stored);

//       // Fetch fresh student data
//       const { data } = await supabase
//         .from("students")
//         .select("*")
//         .eq("id", parsed.id)
//         .single();

//       setStudent(data);
//       setLoading(false);
//     };

//     load();
//   }, []);

//   return { student, loading };
// };
import { supabase } from "@/lib/supabase";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export const useSession = () => {
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const stored = await SecureStore.getItemAsync("student_session");

    if (stored) {
      const parsed = JSON.parse(stored);

      const { data } = await supabase
        .from("students")
        .select("*")
        .eq("id", parsed.id)
        .single();

      setStudent(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return { student, loading, refresh: load };
};
