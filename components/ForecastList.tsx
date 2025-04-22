import React from 'react';
import { StyleSheet, View, FlatList, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { WeatherData } from '@/types/weather';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ForecastListProps {
  forecastItems: WeatherData[];
}

export const ForecastList: React.FC<ForecastListProps> = ({ forecastItems }) => {
  const cardBackground = useThemeColor({ light: '#FFFFFF', dark: '#1E1E1E' }, 'background');
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#333333' }, 'background');

  // Group forecast by day
  const groupedForecast = React.useMemo(() => {
    const grouped: { [key: string]: WeatherData[] } = {};

    forecastItems.forEach(item => {
      const date = new Date(item.date * 1000);
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });

      if (!grouped[day]) {
        grouped[day] = [];
      }

      grouped[day].push(item);
    });

    // Convert to array format for FlatList
    return Object.entries(grouped).map(([day, items]) => ({
      day,
      items,
      // Use the middle of the day for display
      mainItem: items[Math.floor(items.length / 2)],
    }));
  }, [forecastItems]);

  // Format time
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get weather icon URL
  const getWeatherIconUrl = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  const renderForecastItem = ({ item }: { item: { day: string; mainItem: WeatherData } }) => (
    <ThemedView style={[styles.forecastItem, { backgroundColor: cardBackground, borderColor }]}>
      <View style={styles.dayContainer}>
        <ThemedText style={styles.day}>{item.day}</ThemedText>
        <ThemedText style={styles.date}>
          {new Date(item.mainItem.date * 1000).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </ThemedText>
      </View>

      <View style={styles.weatherContainer}>
        <Image
          source={{ uri: getWeatherIconUrl(item.mainItem.icon) }}
          style={styles.weatherIcon}
        />
        <ThemedText style={styles.temperature}>
          {Math.round(item.mainItem.temperature)}°C
        </ThemedText>
      </View>

      <View style={styles.detailsContainer}>
        <ThemedText style={styles.description}>
          {item.mainItem.description.charAt(0).toUpperCase() + item.mainItem.description.slice(1)}
        </ThemedText>
        <ThemedText style={styles.details}>
          Humidity: {item.mainItem.humidity}% | Wind: {item.mainItem.windSpeed} m/s
        </ThemedText>
      </View>
    </ThemedView>
  );

  return (
    <FlatList
      data={groupedForecast}
      renderItem={renderForecastItem}
      keyExtractor={(item) => item.day}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  forecastItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  dayContainer: {
    flex: 1,
  },
  day: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    opacity: 0.7,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  weatherIcon: {
    width: 40,
    height: 40,
  },
  temperature: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  detailsContainer: {
    flex: 2,
  },
  description: {
    fontSize: 14,
  },
  details: {
    fontSize: 12,
    opacity: 0.7,
  },
});
