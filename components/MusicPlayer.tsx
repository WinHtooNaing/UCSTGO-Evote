import { COLORS } from "@/data/color";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MusicPlayer = () => {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const loadMusic = async () => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      });

      const { sound } = await Audio.Sound.createAsync(
        require("@/assets/music/vote.mp3"),
        {
          shouldPlay: true, // ▶ auto play
          isLooping: true, // 🔁 loop
        }
      );

      soundRef.current = sound;
      setIsPlaying(true);
    };

    loadMusic();

    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  const togglePlay = async () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.playAsync();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      {/* Left - Song Name */}
      <Text style={styles.songName}>🎶 UCSTGO Theme Song</Text>

      {/* Right - Play / Pause */}
      <TouchableOpacity onPress={togglePlay}>
        <Ionicons
          name={isPlaying ? "pause-circle" : "play-circle"}
          size={40}
          color={COLORS.primary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginHorizontal: 20,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#fff",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  songName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1f2937",
  },
});
