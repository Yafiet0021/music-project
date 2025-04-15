import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screens import 
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import LibraryScreen from "../screens/LibraryScreen";
import PlayListScreen from "../screens/PlayListScreen";
import PlaylistSongsScreen from "../screens/PlaylistSongsScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [playlists, setPlaylists] = useState([]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Library") {
              iconName = focused ? "musical-notes" : "musical-notes-outline";
            } else if (route.name === "PlayList") {
              iconName = focused ? "list" : "list-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Library">
          {props => <LibraryScreen {...props} playlists={playlists} setPlaylists={setPlaylists} />}
        </Tab.Screen>
        <Tab.Screen name="PlayList">
          {props => <PlayListScreen {...props} playlists={playlists} setPlaylists={setPlaylists} />}
        </Tab.Screen>
        <Tab.Screen name="Settings" component={SettingScreen} />
        <Tab.Screen 
          name="PlaylistSongs" 
          component={PlaylistSongsScreen}
          options={{ tabBarButton: () => null }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
