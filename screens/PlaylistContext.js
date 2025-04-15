import React, { createContext, useState, useContext } from 'react';

const PlaylistContext = createContext();

export const usePlaylists = () => useContext(PlaylistContext);

export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([]);

  const addPlaylist = (name) => {
    const newPlaylist = {
      id: Date.now().toString(),
      name,
      songs: [],
    };
    setPlaylists(prev => [...prev, newPlaylist]);
  };

  const addSongToPlaylist = (song, playlistId) => {
    setPlaylists(prev =>
      prev.map(pl =>
        pl.id === playlistId && !pl.songs.some(s => s.id === song.id)
          ? { ...pl, songs: [...pl.songs, song] }
          : pl
      )
    );
  };

  return (
    <PlaylistContext.Provider value={{ playlists, addPlaylist, addSongToPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};
