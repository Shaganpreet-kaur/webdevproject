'use client'; // Marks this as a Client Component in Next.js

// Import React hooks and components
import { useState, useEffect } from 'react';
import SearchBar from '@/app/components/SearchBar';
import CurrentWeatherCard from '@/app/components/CurrentWeatherCard';
import ForecastCarousel from '@/app/components/ForecastCarousel';
import ErrorDisplay from '@/app/components/ErrorDisplay';
import { fetchWeatherByCity, fetchWeatherByCoords } from '@/app/lib/weatherService';

/**
 * Main Weather Application Component
 * Handles weather data fetching and display logic
 */
export default function Home() {
  // State management for weather data, loading status, and errors
  const [weatherData, setWeatherData] = useState(null); // Stores fetched weather data
  const [loading, setLoading] = useState(false); // Tracks loading state
  const [error, setError] = useState(null); // Stores error messages

  /**
   * Handles city-based weather search
   * @param {string} city - City name to search for
   */
  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError(null); // Reset any previous errors
      const data = await fetchWeatherByCity(city);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  /**
   * Handles geolocation-based weather search
   * Uses browser's geolocation API to get user position
   */
  const handleGeolocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        // Success callback
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const data = await fetchWeatherByCoords(latitude, longitude);
            setWeatherData(data);
            setError(null);
          } catch (err) {
            setError(err.message || 'Failed to fetch weather data');
          } finally {
            setLoading(false);
          }
        },
        // Error callback
        (err) => {
          setError('Geolocation permission denied');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  // Effect hook to load default weather on component mount
  useEffect(() => {
    handleGeolocation(); // Attempt to get user's location on first render
  }, []); // Empty dependency array means this runs only once on mount

  return (
    <div className="max-w-4xl mx-auto"> {/* Main container with max width */}
      {/* Application title */}
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        WeatherNow
      </h1>
      
      {/* Search bar component */}
      <SearchBar 
        onSearch={handleSearch} 
        onGeolocation={handleGeolocation} 
        loading={loading}
      />
      
      {/* Error display (conditionally rendered) */}
      {error && <ErrorDisplay message={error} />}
      
      {/* Main weather display (only shown when data exists and not loading) */}
      {weatherData && !loading && (
        <>
          {/* Current weather card with detailed info */}
          <CurrentWeatherCard data={weatherData} />
          
          {/* 3-day forecast carousel */}
          <ForecastCarousel forecast={weatherData.forecast} />
        </>
      )}
      
      {/* Loading spinner (shown during data fetching) */}
      {loading && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
}