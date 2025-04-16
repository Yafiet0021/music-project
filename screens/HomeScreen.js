import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, Image, StyleSheet } from "react-native";
import { db } from "../config/FireBase"; 
const HomeScreen = () => {
  const [recentTracks, setRecentTracks] = useState([]);
  const [recentPlaylists, setRecentPlaylists] = useState([]);

  useEffect(() => {
    const fetchRecentTracks = async () => {
      try {
        const q = query(collection(db, "songs"), orderBy("createdAt", "desc"), limit(5));
        const snapshot = await getDocs(q);
        const tracks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRecentTracks(tracks);
      } catch (error) {c
        console.error("Error fetching tracks:", error);
      }
    };

    const fetchRecentPlaylists = async () => {
      try {
        const q = query(collection(db, "playlists"), orderBy("createdAt", "desc"), limit(5));
        const snapshot = await getDocs(q);
        const playlists = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRecentPlaylists(playlists);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchRecentTracks();
    fetchRecentPlaylists();
  }, []);

  const renderTrack = ({ item }) => (
    <View style={styles.trackContainer}>
      <Image source={{ uri: item.cover }} style={styles.cover} />
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle}>{item.title}</Text>
        <Text style={styles.trackArtist}>{item.artist}</Text>
      </View>
    </View>
  );

  const renderPlaylist = ({ item }) => (
    <View style={styles.playlistContainer}>
      <Text style={styles.playlistTitle}>{item.name}</Text>
      <Text style={styles.playlistDesc}>Tracks: {item.tracks?.length || 0}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput style={styles.searchBar} placeholder="Search tracks..." />

      <Text style={styles.sectionTitle}>Recent Tracks</Text>
      <FlatList
        data={recentTracks}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={renderTrack}
      />

      <Text style={styles.sectionTitle}>Recent Playlists</Text>
      <FlatList
        data={recentPlaylists}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={renderPlaylist}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  searchBar: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    backgroundColor: "#f0f0f0",
    paddingLeft: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  trackContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  cover: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  trackArtist: {
    fontSize: 14,
    color: "#666",
  },
  playlistContainer: {
    backgroundColor: "#f0f8ff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  playlistTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  playlistDesc: {
    fontSize: 14,
    color: "#444",
  },
});

export default HomeScreen;
