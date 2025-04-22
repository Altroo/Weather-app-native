import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  const tintColor = useThemeColor({ light: '#0a7ea4', dark: '#4ECDC4' }, 'tint');
  const errorColor = useThemeColor({ light: '#E53935', dark: '#FF5252' }, 'text');

  return (
    <View style={styles.container}>
      <IconSymbol name="exclamationmark.triangle.fill" size={50} color={errorColor} style={styles.icon} />
      <ThemedText style={styles.errorText}>{message}</ThemedText>
      
      {onRetry && (
        <TouchableOpacity 
          style={[styles.retryButton, { borderColor: tintColor }]} 
          onPress={onRetry}
        >
          <ThemedText style={[styles.retryText, { color: tintColor }]}>Try Again</ThemedText>
        </TouchableOpacity>
      )}
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
  icon: {
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
  },
  retryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});