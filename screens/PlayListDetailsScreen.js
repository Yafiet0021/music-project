import React from 'react';
import { View, Text, FlatList, Button,} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function PlaylistDetailsScreen({ route, playlists, setPlaylists }) {
  const { playlistId } = route.params;
  const playlist = playlists.find((p) => p.id === playlistId);

  const addSongToPlaylist = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'audio/*',
    });

    if (!result.canceled) {
      const [file] = result.assets;
      const newSong = {
        id: Date.now().toString(),
        name: file.name,
        uri: file.uri,
      };

      const updatedPlaylists = playlists.map((p) =>
        p.id === playlistId ? { ...p, songs: [...p.songs, newSong] } : p
      );
      setPlaylists(updatedPlaylists);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>{playlist.name}</Text>
      <FlatList
        data={playlist.songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={{ marginVertical: 10 }}>{item.name}</Text>}
      />
      <Button title="Add Song" onPress={addSongToPlaylist} />
    </View>
  );
}
