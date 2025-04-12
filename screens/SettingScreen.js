import React, { useState} from "react";
import { View, Text, Button, StyleSheet, Switch  } from "react-native";

const SettingScreen = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const themeStyles = setIsDarkMode ? isDarkMode : lightTheme;


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings 🎵</Text>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
        value={isDarkMode}
        onValueChange={(value) => setIsDarkMode(value)}
        />
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});

export default SettingScreen;
