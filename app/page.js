'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/app/components/SearchBar';
import CurrentWeatherCard from '@/app/components/CurrentWeatherCard';
import ForecastCarousel from '@/app/components/ForecastCarousel';
import ErrorDisplay from '@/app/components/ErrorDisplay';
import { fetchWeatherByCity, fetchWeatherByCoords } from '@/app/lib/weatherService';

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeatherByCity(city);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
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
        (err) => {
          setError('Geolocation permission denied');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  useEffect(() => {
    // Load default weather on initial render
    handleGeolocation();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">WeatherNow</h1>
      
      <SearchBar 
        onSearch={handleSearch} 
        onGeolocation={handleGeolocation} 
        loading={loading}
      />
      
      {error && <ErrorDisplay message={error} />}
      
      {weatherData && !loading && (
        <>
          <CurrentWeatherCard data={weatherData} />
          <ForecastCarousel forecast={weatherData.forecast} />
        </>
      )}
      
      {loading && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
}