import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//  import sceen compoentents 
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import LibraryScreen from "../screens/LibraryScreen";
import PlayListScreen from "../screens/PlayListScreen";
import PlaylistSongsScreen from "../screens/PlaylistSongsScreen";

// create a the bottom navigator
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  // state to manage  playists, s 
  const [playlists, setPlaylists] = useState([]);

  return (
    <NavigationContainer>
     {/*custimze the bottom tabs */}
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
          // custimze tab bar colors
          
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        {/* home tab to direct screen component */}
        <Tab.Screen name="Home" component={HomeScreen} />
         {/* // library tab with playlists state passed as props */}
        <Tab.Screen name="Library">
          {props => <LibraryScreen {...props} playlists={playlists} setPlaylists={setPlaylists} />}
        </Tab.Screen>
      {/* PlayList tab with same playlists props passed down */}
        <Tab.Screen name="PlayList">
          {props => <PlayListScreen {...props} playlists={playlists} setPlaylists={setPlaylists} />}
        </Tab.Screen>
        {/* settings tab with direct screen component */}
        <Tab.Screen name="Settings" component={SettingScreen} />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
