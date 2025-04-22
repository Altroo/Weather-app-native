import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { WeatherData, ForecastData } from '@/types/weather';
import { fetchWeather, fetchForecast } from '@/services/weatherApi';

// Define the state shape
interface WeatherState {
  currentWeather: WeatherData | null;
  forecast: ForecastData | null;
  loading: boolean;
  error: string | null;
  city: string;
}

// Define action types
type WeatherAction =
  | { type: 'FETCH_WEATHER_START'; payload: string }
  | { type: 'FETCH_WEATHER_SUCCESS'; payload: { currentWeather: WeatherData; forecast: ForecastData } }
  | { type: 'FETCH_WEATHER_ERROR'; payload: string }
  | { type: 'SET_CITY'; payload: string };

// Initial state
const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  loading: false,
  error: null,
  city: 'London', // Default city
};

// Create the reducer
const weatherReducer = (state: WeatherState, action: WeatherAction): WeatherState => {
  switch (action.type) {
    case 'FETCH_WEATHER_START':
      return {
        ...state,
        loading: true,
        error: null,
        city: action.payload,
      };
    case 'FETCH_WEATHER_SUCCESS':
      return {
        ...state,
        loading: false,
        currentWeather: action.payload.currentWeather,
        forecast: action.payload.forecast,
        error: null,
      };
    case 'FETCH_WEATHER_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'SET_CITY':
      return {
        ...state,
        city: action.payload,
      };
    default:
      return state;
  }
};

// Create the context
interface WeatherContextType {
  state: WeatherState;
  fetchWeatherData: (city: string) => Promise<void>;
  setCity: (city: string) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

// Create the provider component
interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  // Fetch weather data for a city
  const fetchWeatherData = async (city: string) => {
    try {
      dispatch({ type: 'FETCH_WEATHER_START', payload: city });

      // Fetch both current weather and forecast in parallel
      const [currentWeatherData, forecastData] = await Promise.all([
        fetchWeather(city),
        fetchForecast(city),
      ]);

      dispatch({
        type: 'FETCH_WEATHER_SUCCESS',
        payload: {
          currentWeather: currentWeatherData,
          forecast: forecastData,
        },
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_WEATHER_ERROR',
        payload: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  };

  // Set the city without fetching data
  const setCity = (city: string) => {
    dispatch({ type: 'SET_CITY', payload: city });
  };

  // Provide the context value
  const value = {
    state,
    fetchWeatherData,
    setCity,
  };

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};

// Create a hook for using the context
export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
