import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker, Button, Switch } from 'react-native';
import LibraryScreen from '../screens/LibraryScreen';

const FiltersOption = ({ onFilterApply }) => {
    const [selectedArtist, setSelectedArtist] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [recentOnly, setRecentOnly] = useState(false);

    const handleApplyFilters = () => {
        onFilterApply({
            artist: selectedArtist,
            year: selectedYear,
            recent: recentOnly,
        });
    };

    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Songs</Text>

      <Text style={styles.label}>Artist</Text>
      <Picker
        selectedValue={selectedArtist}
        onValueChange={(value) => setSelectedArtist(value)}
        style={styles.picker}
      >
        <Picker.Item label="All" value="" />
        <Picker.Item label="Artist 1" value="artist1" />
        <Picker.Item label="Artist 2" value="artist2" />
        <Picker.Item label="Artist 3" value="artist3" />
      </Picker>

      <Text style={styles.label}>Year</Text>
      <Picker
        selectedValue={selectedYear}
        onValueChange={(value) => setSelectedYear(value)}
        style={styles.picker}
      >
        <Picker.Item label="All" value="" />
        <Picker.Item label="2024" value="2024" />
        <Picker.Item label="2023" value="2023" />
        <Picker.Item label="2022" value="2022" />
      </Picker>

      <View style={styles.recentContainer}>
        <Text style={styles.label}>Recently Added Only</Text>
        <Switch value={recentOnly} onValueChange={setRecentOnly} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Send In" onPress={handleApplyFilters} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  label: { marginTop: 10, fontWeight: '600' },
  picker: { height: 40, width: '100%' },
  recentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  buttonContainer: { marginTop: 20 },
});

export default FiltersOption;

