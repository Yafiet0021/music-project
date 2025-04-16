import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View,Text,StyleSheet,FlatList,TouchableOpacity, Alert, Image, Modal } from 'react-native';
// 
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import TrackPlayer from '../components/TrackPlayer';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc } from 'firebase/firestore';
const addSongToLibrary = async (song) => {
  await addDoc(collection(db, 'songs'), song); 
};

const addPlaylistToLibrary = async (playlist) => {
  await addDoc(collection(db, 'playlists'), playlist); // { id, name, tracks: [] }
};

const LibraryScreen = ({ navigation, playlists, setPlaylists }) => {
  const [songs, setSongs] = useState([]);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  // Clean up sound on unmount
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled) return;
      const [file] = result.assets;

      if (!file.name.toLowerCase().endsWith('.mp3')) {
        Alert.alert('Invalid File', 'Please select an MP3 file');
        return;
      }

      const title = file.name.replace('.mp3', '');
      const isDuplicate = songs.some(song => song.uri === file.uri);
      if (isDuplicate) {
        Alert.alert('Duplicate', 'This song already exists in your library');
        return;
      }

      const imageResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      const coverUri = imageResult?.assets?.[0]?.uri ?? null;

      setSongs(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          uri: file.uri,
          title,
          artist: "Unknown Artist",
          cover: coverUri,
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to open file picker: ' + error.message);
    }
  };

  const handlePlayPause = async (song = currentTrack) => {
    if (!song) return;

    try {
      if (currentTrack?.id === song.id) {
        const status = await sound.getStatusAsync();
        if (status.isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
        return;
      }

      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: song.uri },
        { shouldPlay: true }
      );

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          handleNext();
        }
      });

      setSound(newSound);
      setCurrentTrack(song);
      setIsPlaying(true);

    } catch (error) {
      Alert.alert('Error', 'Playback failed: ' + error.message);
    }
  };

  const handleNext = () => {
    if (!currentTrack || songs.length === 0) return;

    const currentIndex = songs.findIndex(song => song.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    handlePlayPause(songs[nextIndex]);
  };

  const handlePrevious = () => {
    if (!currentTrack || songs.length === 0) return;

    const currentIndex = songs.findIndex(song => song.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    handlePlayPause(songs[prevIndex]);
  };

  const handleClosePlayer = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
    setCurrentTrack(null);
    setIsPlaying(false);
  };

  const openAddToPlaylist = (song) => {
    setSelectedSong(song);
    setShowPlaylistModal(true);
  };

  const addToPlaylist = (playlistId) => {
    setPlaylists(prev => 
      prev.map(p => 
        p.id === playlistId && !p.songs.some(s => s.id === selectedSong.id)
          ? { ...p, songs: [...p.songs, selectedSong] }
          : p
      )
    );
    setShowPlaylistModal(false);
    Alert.alert('Success', 'Song added to playlist');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="add"
          size={24}
          color="#007AFF"
          style={{ marginRight: 15 }}
          onPress={pickDocument}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Library</Text>

      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.trackItem} onPress={() => handlePlayPause(item)}>
            <View style={styles.trackContent}>
              <Image
                source={
                  item.cover
                    ? { uri: item.cover }
                    : require('../assets/image.png')
                }
                style={styles.coverImage}
              />
              <View style={styles.trackInfo}>
                <Text style={styles.trackTitle}>{item.title}</Text>
                <Text style={styles.trackArtist}>{item.artist}</Text>
              </View>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity 
                onPress={(e) => {
                  e.stopPropagation();
                  openAddToPlaylist(item);
                }}
                style={styles.addButton}
              >
                <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
              </TouchableOpacity>
              <Ionicons
                name={currentTrack?.id === item.id && isPlaying ? "pause" : "play"}
                size={24}
                color="#007AFF"
              />
            </View>
          </TouchableOpacity>
        )}
      />

      <TrackPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onClose={handleClosePlayer}
      />

      <Modal
        visible={showPlaylistModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPlaylistModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add to Playlist</Text>
            <Text style={styles.modalSubtitle}>Select a playlist for "{selectedSong?.title}"</Text>
            
            {playlists.length > 0 ? (
              <FlatList
                data={playlists}
                keyExtractor={(item) => item.id}
                
                contentContainerStyle={styles.playlistList}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={styles.playlistOption}
                    onPress={() => addToPlaylist(item.id)}
                    disabled={item.songs.some(s => s.id === selectedSong?.id)}
                  >
                    <Text style={styles.playlistName}>{item.name}</Text>
                    {item.songs.some(s => s.id === selectedSong?.id) && (
                      <Ionicons name="checkmark" size={20} color="#4CAF50" />
                    )}
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="musical-notes-outline" size={40} color="#ccc" />
                <Text style={styles.emptyText}>No playlists available</Text>
                <TouchableOpacity 
                  style={styles.createPlaylistButton}
                  onPress={() => {
                    setShowPlaylistModal(false);
                    navigation.navigate('PlayList');
                  }}
                >
                  <Text style={styles.createPlaylistText}>Create Playlist</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowPlaylistModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 10,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  trackItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  trackContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  coverImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: '#ddd',
  },
  trackInfo: {
    flex: 1,
    marginRight: 10,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  trackArtist: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    marginRight: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '85%',
    maxHeight: '70%',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  playlistList: {
    flexGrow: 1,
  },
  playlistOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  playlistName: {
    fontSize: 16,
  },
  emptyState: {
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#666',
    marginTop: 10,
    marginBottom: 20,
  },
  createPlaylistButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
  },
  createPlaylistText: {
    color: 'white',
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 6,
    marginTop: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#333',
    fontWeight: '600',
  },
});

export default LibraryScreen;