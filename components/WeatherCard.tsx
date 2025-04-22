import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { WeatherData } from '@/types/weather';
import { useThemeColor } from '@/hooks/useThemeColor';

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const cardBackground = useThemeColor({ light: '#FFFFFF', dark: '#1E1E1E' }, 'background');
  const accentColor = useThemeColor({ light: '#0a7ea4', dark: '#4ECDC4' }, 'tint');

  // Format date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get weather icon URL
  const getWeatherIconUrl = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <ThemedView style={[styles.card, { backgroundColor: cardBackground }]}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.city}>
          {weather.city}, {weather.country}
        </ThemedText>
        <ThemedText style={styles.date}>{formatDate(weather.date)}</ThemedText>
      </View>

      <View style={styles.weatherInfo}>
        <View style={styles.temperatureContainer}>
          <ThemedText style={styles.temperature}>
            {Math.round(weather.temperature)}°C
          </ThemedText>
          <ThemedText style={styles.feelsLike}>
            Feels like {Math.round(weather.feelsLike)}°C
          </ThemedText>
        </View>

        <View style={styles.conditionContainer}>
          <Image
            source={{ uri: getWeatherIconUrl(weather.icon) }}
            style={styles.weatherIcon}
          />
          <ThemedText style={styles.weatherDescription}>
            {weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}
          </ThemedText>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <ThemedText style={styles.detailLabel}>Humidity</ThemedText>
          <ThemedText style={[styles.detailValue, { color: accentColor }]}>
            {weather.humidity}%
          </ThemedText>
        </View>

        <View style={styles.detailItem}>
          <ThemedText style={styles.detailLabel}>Wind Speed</ThemedText>
          <ThemedText style={[styles.detailValue, { color: accentColor }]}>
            {weather.windSpeed} m/s
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    marginBottom: 16,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    opacity: 0.7,
  },
  weatherInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  temperatureContainer: {
    flex: 1,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  feelsLike: {
    fontSize: 14,
    opacity: 0.7,
  },
  conditionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherIcon: {
    width: 80,
    height: 80,
  },
  weatherDescription: {
    fontSize: 16,
    textAlign: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 16,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
