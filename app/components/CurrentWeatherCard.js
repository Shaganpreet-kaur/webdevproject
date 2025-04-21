// Import the WeatherIcon component that will display weather condition icons
import WeatherIcon from './WeatherIcon';

// CurrentWeatherCard component displays current weather information in a card format
// It receives weather data as a prop and renders it in a user-friendly way
export default function CurrentWeatherCard({ data }) {
  return (
    // Main card container with white background in light mode and gray-800 in dark mode
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 dark:bg-gray-800">
      {/* Top section containing location info and weather icon */}
      <div className="flex justify-between items-center mb-4">
        {/* Left side - Location details */}
        <div>
          {/* City name */}
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {data.location.name}
          </h2>
          {/* Region and country (region is optional) */}
          <p className="text-gray-600 dark:text-gray-300">
            {data.location.region && `${data.location.region}, `}
            {data.location.country}
          </p>
          {/* Local time formatted nicely */}
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {new Date(data.location.localtime).toLocaleString()}
          </p>
        </div>
        
        {/* Right side - Weather icon that changes based on condition and time */}
        <WeatherIcon 
          condition={data.current.condition.text} 
          time={data.location.localtime} 
        />
      </div>
      
      {/* Bottom section with temperature and weather details */}
      <div className="flex items-center justify-between">
        {/* Large temperature display */}
        <div className="text-5xl font-bold text-gray-800 dark:text-white">
          {Math.round(data.current.temp_c)}°C
        </div>
        
        {/* Secondary weather information */}
        <div className="text-gray-600 dark:text-gray-300">
          {/* Weather condition (capitalized first letter) */}
          <p className="capitalize">{data.current.condition.text}</p>
          {/* Humidity percentage */}
          <p>Humidity: {data.current.humidity}%</p>
          {/* Wind speed in km/h */}
          <p>Wind: {data.current.wind_kph} km/h</p>
          {/* UV index */}
          <p>UV: {data.current.uv}</p>
        </div>
      </div>
    </div>
  );
}