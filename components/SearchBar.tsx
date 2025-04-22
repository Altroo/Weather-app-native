import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Platform } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

interface SearchBarProps {
  onSearch: (city: string) => void;
  initialValue?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = '' }) => {
  const [city, setCity] = useState(initialValue);
  const textColor = useThemeColor({ light: '#11181C', dark: '#ECEDEE' }, 'text');
  const backgroundColor = useThemeColor({ light: '#F2F2F2', dark: '#2D2D2D' }, 'background');
  const iconColor = useThemeColor({ light: '#687076', dark: '#9BA1A6' }, 'icon');

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.searchContainer, { backgroundColor }]}>
        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholder="Search for a city..."
          placeholderTextColor={iconColor}
          value={city}
          onChangeText={setCity}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <IconSymbol name="magnifyingglass" size={20} color={iconColor} />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  searchButton: {
    padding: 8,
  },
});