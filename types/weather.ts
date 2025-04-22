/**
 * Type definitions for weather data
 */

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  date: number;
}

export interface ForecastData {
  list: WeatherData[];
}