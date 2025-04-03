import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Music App 🎵</Text>
      <Button title="Go to Player" onPress={() => navigation.navigate("Player")} />

      {/* If you want to add another button, use React Native's Button component */}
      <Button title="Navbar" onPress={() => alert('Button clicked!')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});

export default HomeScreen;
