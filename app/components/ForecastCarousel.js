// Import the WeatherIcon component for displaying weather condition icons
import WeatherIcon from './WeatherIcon';

// ForecastCarousel component displays a horizontal scrollable 3-day weather forecast
// Receives forecast data as a prop containing array of daily forecast objects
export default function ForecastCarousel({ forecast }) {
  return (
    // Main container card with white background (dark mode: gray-800)
    <div className="bg-white rounded-xl shadow-md p-6 dark:bg-gray-800">
      {/* Section heading */}
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">3-Day Forecast</h3>
      
      {/* Horizontal scrollable container for forecast days */}
      <div className="flex overflow-x-auto gap-4 pb-2">
        {/* Map through each day in the forecast data */}
        {forecast.map((day) => (
          // Individual forecast day card (non-shrinkable, fixed width)
          <div key={day.date} className="flex-shrink-0 w-32 p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
            {/* Weekday name (short format) */}
            <p className="text-center font-medium text-gray-700 dark:text-gray-300">
              {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            
            {/* Weather icon centered in the card */}
            <div className="flex justify-center my-2">
              <WeatherIcon 
                condition={day.day.condition.text} 
                small // Prop to render smaller icon version
              />
            </div>
            
            {/* Temperature range (max and min) */}
            <div className="flex justify-between text-sm">
              {/* Maximum temperature (highlighted) */}
              <span className="font-medium text-gray-800 dark:text-white">
                {Math.round(day.day.maxtemp_c)}°
              </span>
              {/* Minimum temperature (subtle) */}
              <span className="text-gray-500 dark:text-gray-400">
                {Math.round(day.day.mintemp_c)}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}