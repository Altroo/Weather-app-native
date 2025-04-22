import { StyleSheet, View, Image } from 'react-native';
import { useEffect } from 'react';

import { ErrorMessage } from '@/components/ErrorMessage';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { SearchBar } from '@/components/SearchBar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { WeatherCard } from '@/components/WeatherCard';
import { useWeather } from '@/contexts/WeatherContext';

export default function WeatherScreen() {
  const { state, fetchWeatherData } = useWeather();
  const { currentWeather, loading, error, city } = state;

  // Fetch weather data on initial load
  useEffect(() => {
    if (!currentWeather) {
      fetchWeatherData(city);
    }
  }, []);

  // Handle search
  const handleSearch = (searchCity: string) => {
    fetchWeatherData(searchCity);
  };

  // Get a background color based on temperature (if available)
  const getBackgroundColor = () => {
    if (!currentWeather) return { light: '#A1CEDC', dark: '#1D3D47' };

    const temp = currentWeather.temperature;

    if (temp > 30) {
      return { light: '#FF9E80', dark: '#BF360C' }; // Hot
    } else if (temp > 20) {
      return { light: '#FFD180', dark: '#E65100' }; // Warm
    } else if (temp > 10) {
      return { light: '#A1CEDC', dark: '#1D3D47' }; // Mild
    } else {
      return { light: '#80D8FF', dark: '#01579B' }; // Cold
    }
  };

  // Get a header image based on weather condition (if available)
  const getHeaderImage = () => {
    if (!currentWeather) {
      return (
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.headerImage}
        />
      );
    }

    // You could add different images based on weather conditions
    // For now, we'll use a simple cloud icon
    return (
      <View style={styles.headerImageContainer}>
        <Image
          source={{ uri: `https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png` }}
          style={styles.weatherHeaderIcon}
        />
      </View>
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={getBackgroundColor()}
      headerImage={getHeaderImage()}>

      <SearchBar onSearch={handleSearch} initialValue={city} />

      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <ErrorMessage 
          message={`Error loading weather data: ${error}`} 
          onRetry={() => fetchWeatherData(city)} 
        />
      ) : currentWeather ? (
        <WeatherCard weather={currentWeather} />
      ) : (
        <ThemedView style={styles.emptyContainer}>
          <ThemedText>No weather data available. Try searching for a city.</ThemedText>
        </ThemedView>
      )}

      <ThemedView style={styles.infoContainer}>
        <ThemedText type="subtitle">About this app</ThemedText>
        <ThemedText>
          This is a simple weather app that fetches data from the OpenWeatherMap API.
          Search for a city to see the current weather conditions.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  headerImageContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  weatherHeaderIcon: {
    width: 200,
    height: 200,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  infoContainer: {
    padding: 16,
    marginTop: 16,
    gap: 8,
  },
});
