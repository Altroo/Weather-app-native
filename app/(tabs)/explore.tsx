import { StyleSheet, View } from 'react-native';
import { useEffect } from 'react';

import { ErrorMessage } from '@/components/ErrorMessage';
import { ForecastList } from '@/components/ForecastList';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { SearchBar } from '@/components/SearchBar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useWeather } from '@/contexts/WeatherContext';

export default function ForecastScreen() {
  const { state, fetchWeatherData } = useWeather();
  const { forecast, loading, error, city } = state;

  // Fetch weather data on initial load
  useEffect(() => {
    if (!forecast) {
      fetchWeatherData(city);
    }
  }, []);

  // Handle search
  const handleSearch = (searchCity: string) => {
    fetchWeatherData(searchCity);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="calendar"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">5-Day Forecast</ThemedText>
      </ThemedView>

      <SearchBar onSearch={handleSearch} initialValue={city} />

      {loading ? (
        <LoadingIndicator message="Loading forecast data..." />
      ) : error ? (
        <ErrorMessage 
          message={`Error loading forecast data: ${error}`} 
          onRetry={() => fetchWeatherData(city)} 
        />
      ) : forecast && forecast.list.length > 0 ? (
        <ForecastList forecastItems={forecast.list} />
      ) : (
        <ThemedView style={styles.emptyContainer}>
          <ThemedText>No forecast data available. Try searching for a city.</ThemedText>
        </ThemedView>
      )}

      <ThemedView style={styles.infoContainer}>
        <ThemedText type="subtitle">About the forecast</ThemedText>
        <ThemedText>
          The forecast shows weather predictions for the next 5 days, grouped by day.
          Each entry shows the temperature, weather conditions, humidity, and wind speed.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
    paddingHorizontal: 16,
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
