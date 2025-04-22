import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

interface LoadingIndicatorProps {
  message?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message = 'Loading weather data...',
}) => {
  const tintColor = useThemeColor({ light: '#0a7ea4', dark: '#4ECDC4' }, 'tint');

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={tintColor} style={styles.spinner} />
      <ThemedText style={styles.message}>{message}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  spinner: {
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
});