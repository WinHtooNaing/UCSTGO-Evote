import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

interface CountdownTimerProps {
  targetDate: string; // ISO date string
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Vote pay yan kyan chain</Text>
      {/* <Text style={styles.sub}>Berakhir dalam:</Text> */}

      <View style={styles.row}>
        <TimeBox value={timeLeft.days} label="Day" />
        <Text style={styles.colon}>:</Text>
        <TimeBox value={timeLeft.hours} label="Hour" />
        <Text style={styles.colon}>:</Text>
        <TimeBox value={timeLeft.minutes} label="Minute" />
        <Text style={styles.colon}>:</Text>
        <TimeBox value={timeLeft.seconds} label="Second" />
      </View>
    </View>
  );
};

interface TimeBoxProps {
  value: number;
  label: string;
}

const TimeBox: React.FC<TimeBoxProps> = ({ value, label }) => {
  return (
    <View style={styles.box}>
      <Text style={styles.number}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#00b4d8",
    padding: 20,
    borderRadius: 16,
    margin: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  sub: {
    fontSize: 14,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  number: {
    fontSize: 20,
    fontWeight: "bold",
  },
  label: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
  colon: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 6,
  },
});

export default CountdownTimer;
