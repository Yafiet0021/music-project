import React from "react";
import { View, Text, Button, StyleSheet, TextInput,FlatList,Image, } from "react-native";


const recentTracks = [ 
  { id: "1", title: "Track 1", artist: "Artist A", Cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/5a/db/d6/5adbd6c4-0f85-1c2e-5e31-dd11cc462610/194690582486_cover.jpg/600x600bb.jpg"},
  { id: "2", title: "Track 2", artist: "Artist B", Cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/5a/db/d6/5adbd6c4-0f85-1c2e-5e31-dd11cc462610/194690582486_cover.jpg/600x600bb.jpg" },
  { id: "3", title: "Track 3", artist: "Artist C", Cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/5a/db/d6/5adbd6c4-0f85-1c2e-5e31-dd11cc462610/194690582486_cover.jpg/600x600bb.jpg" },
]
const HomeScreen = ({ navigation }) => {
  return (
<View style={styles.container}>
  <TextInput
        style={styles.searchBar}
        placeholder="Search tracks..."
      />

        {/* Recent Tracks */}
        <Text style={styles.title}>Recent Tracks:</Text>
      
      <FlatList
        data={recentTracks}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.trackContainer}>
            {/* Cover Image */}
            <Image source={{ uri: item.Cover }} style={styles.cover} />
            {/* Track Title and Artist */}
            <View style={styles.trackInfo}>
              <Text style={styles.trackTitle}>{item.title}</Text>
              <Text style={styles.trackArtist}>{item.artist}</Text>
            </View>
          </View>
        )}
      />
    
    </View>
  );//
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },

searchBar: {
  width: "90%", 
  height: 30,
  marginTop: 10,
  borderWidth: 1,
  borderRadius: 15,
  backgroundColor: "#f0f0f0",
  paddingLeft: 15,
  fontSize: 18, 
},
trackContainer: {
 flexDirection: 'row',
 alignItems: 'center', // Align items vertically within the row
 padding: 10, // Add some spacing
 marginBottom: 10, // Space between rows
 backgroundColor: '#f9f9f9', // Optional: Add a background for styling
 borderRadius: 10, // Optional: Add rounded corners
 width: "500",
 flexDirection: 'row',
},
Track: { 
  fontSize: 16,
  color: "dark",
   flex: 1, // Allow text container to take remaining space
  flexDirection: 'column'
}, 

cover: {
  width: 50,  
  height: 50, 
  borderRadius: 10, 
  marginRight: 15,

},


});

export default HomeScreen;
