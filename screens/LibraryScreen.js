import React from "react";
import { View, Text, Button, StyleSheet, Alert} from "react-native";

const LibraryScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
    
    
      <View style={styles.content}>
      <Text style={styles.title}>Libary 🎶</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f8f8f8" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },


buttonContainer: {
  marginTop: 20, 
  alignItems: "center",
},

});

export default LibraryScreen;
