import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import icons from expo for the controls
import Ionicons from '@expo/vector-icons/Ionicons';

// display a mini music player with a current track info and playback control

// take in props for the current track data and control handle
const TrackPlayer = ({
  //containing info like tittle and artist 
  currentTrack, 
// bolean to check if music is currently playing
  isPlaying,
  // funcation to handle play/pause toggle 
   onPlayPause, 
   // function to skip next track
   onNext,
   // function to go previous track
    onPrevious, 
    // function to close/hide the player
    onClose
}) => {
  // don't render the player if no tracks is currently selected 
  if (!currentTrack) return null;

  return (
    <View style={styles.container}>
      // section to show the current track's title and artist
      <View style={styles.trackInfo}>
        <Text style={styles.title} numberOfLines={1}>{currentTrack.title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{currentTrack.artist}</Text>
      </View>
        // control butttons
      <View style={styles.controls}>
        <TouchableOpacity onPress={onPrevious}>
          <Ionicons name="play-skip-back" size={24} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onPlayPause}>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={32}
            color="#007AFF"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onNext}>
          <Ionicons name="play-skip-forward" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    // close button to hide the player 
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Ionicons name="close" size={20} color="#666" />
      </TouchableOpacity>
    </View>
  );
};

// styles for the components
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    elevation: 3,
  },
  trackInfo: {
    flex: 1,
    marginRight: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  artist: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  closeButton: {
    marginLeft: 15,
  },
});

export default TrackPlayer;