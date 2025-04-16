import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TrackPlayer = ({
  currentTrack, isPlaying, onPlayPause, onNext, onPrevious, onClose
}) => {
  if (!currentTrack) return null;

  return (
    <View style={styles.container}>
      <View style={styles.trackInfo}>
        <Text style={styles.title} numberOfLines={1}>{currentTrack.title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{currentTrack.artist}</Text>
      </View>

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

      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Ionicons name="close" size={20} color="#666" />
      </TouchableOpacity>
    </View>
  );
};

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