# Weather App

A simple mobile weather application built with React Native and Expo that fetches and displays weather data from the OpenWeatherMap API.

## Features

- Current weather display (temperature, conditions, icon)
- 5-day forecast display
- Search for weather by city name
- Loading indicators while fetching data
- User-friendly error messages on API failure
- Light and dark mode support

## Screenshots

(Add screenshots of your app here)

## Setup Instructions

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/WeatherApp.git
   cd WeatherApp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Get an API key from OpenWeatherMap:
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Generate an API key from your account dashboard
   - Create a `.env` file in the root directory with the following content:
     ```
     API_KEY=your_actual_api_key
     BASE_URL=https://api.openweathermap.org/data/2.5
     ```
   - Replace `your_actual_api_key` with your actual API key

4. Start the app:

   ```bash
   npx expo start
   ```

5. Open the app:
   - Use the Expo Go app on your phone (scan the QR code)
   - Press 'a' to open in an Android emulator
   - Press 'i' to open in an iOS simulator
   - Press 'w' to open in a web browser

## Project Structure

- `app/`: Main application code with file-based routing
- `components/`: Reusable UI components
- `contexts/`: React context for state management
- `services/`: API services for data fetching
- `assets/`: Images, fonts, and other static assets

## Technologies Used

- React Native
- Expo
- TypeScript
- OpenWeatherMap API

## Implementation Notes

The app uses:
- React Context API for state management
- Custom hooks for theme handling
- Async/await for API calls
- Error boundaries for graceful error handling
- Responsive design for various screen sizes

## Future Improvements

- Add geolocation support to get weather for current location
- Add more detailed weather information
- Add weather alerts
- Add unit tests
- Add animations for weather transitions

## License

MIT
