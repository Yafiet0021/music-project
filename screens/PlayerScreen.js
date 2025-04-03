import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const PlayerScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Now Playing 🎶</Text>
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f8f8f8" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});

export default PlayerScreen;
