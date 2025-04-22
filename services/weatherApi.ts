/**
 * Weather API service for fetching weather data from OpenWeatherMap
 */

// Import environment variables
import { API_KEY, BASE_URL } from '@env';

// Types for weather data
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

/**
 * Fetch current weather data for a city
 * @param city The city name to fetch weather for
 * @returns Promise with weather data
 */
export const fetchWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Weather data not found');
    }

    const data = await response.json();

    return {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      date: data.dt,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

/**
 * Fetch 5-day forecast data for a city
 * @param city The city name to fetch forecast for
 * @returns Promise with forecast data
 */
export const fetchForecast = async (city: string): Promise<ForecastData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Forecast data not found');
    }

    const data = await response.json();

    // Process the forecast data to match our WeatherData interface
    const forecastList = data.list.map((item: any) => ({
      city: data.city.name,
      country: data.city.country,
      temperature: item.main.temp,
      feelsLike: item.main.feels_like,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
      date: item.dt,
    }));

    return {
      list: forecastList,
    };
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};
