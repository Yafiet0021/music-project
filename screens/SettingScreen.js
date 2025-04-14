import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, Button, Alert, ScrollView } from "react-native";

const SettingScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const themeStyles = isDarkMode ? darkTheme : lightTheme;

  const handleClearLibrary = () => {
    Alert.alert("Library cleared", "Your song library has been cleared.");
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, themeStyles.container]}>
      <Text style={[styles.title, themeStyles.text]}>Settings 🎵</Text>

      
      <View style={styles.settingItem}>
        <Text style={[styles.settingText, themeStyles.text]}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={(value) => setIsDarkMode(value)}
        />
      </View>

      
      <View style={styles.settingItem}>
        <Button
          title="Clear Library"
          onPress={handleClearLibrary}
          color={isDarkMode ? "#FFA07A" : "#FF4500"}
        />
      </View>

      
      <View style={styles.aboutContainer}>
        <Text style={[styles.aboutTitle, themeStyles.text]}>About This App</Text>
        <Text style={[styles.aboutText, themeStyles.text]}>
          🎶 MusicApp v1.0.0{"\n"}
          Built with React Native.{"\n"}
          Manage your music, switch themes, and more!
        </Text>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },
  settingText: {
    fontSize: 18,
  },
  aboutContainer: {
    marginTop: 40,
    width: "100%",
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 22,
  },
});


const lightTheme = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
  text: {
    color: "#000000",
  },
});

const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
  },
  text: {
    color: "#ffffff",
  },
});

export default SettingScreen;

