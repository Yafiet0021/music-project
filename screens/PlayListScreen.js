import React, { useState } from 'react';
import { View, Text, FlatList, Button, TextInput, Modal, TouchableOpacity } from 'react-native';

export default function PlaylistScreen({ navigation, playlists, setPlaylists }) {
  const [showModal, setShowModal] = useState(false);
  const [playlistName, setPlaylistName] = useState('');

  const createPlaylist = () => {
    const newPlaylist = {
      id: Date.now().toString(),
      name: playlistName,
      songs: [],
    };
    setPlaylists(prev => [...prev, newPlaylist]);
    setPlaylistName('');
    setShowModal(false);
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Create Playlist" onPress={() => setShowModal(true)} />
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('PlaylistDetails', { playlistId: item.id })}>
            <Text style={{ fontSize: 18, marginVertical: 10 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={showModal} transparent animationType="slide">
        <View style={{ padding: 20, marginTop: 100, backgroundColor: 'white' }}>
          <Text>Create a new playlist:</Text>
          <TextInput value={playlistName} onChangeText={setPlaylistName} placeholder="Playlist Name" />
          <Button title="Save" onPress={createPlaylist} />
        </View>
      </Modal>
    </View>
  );
}
