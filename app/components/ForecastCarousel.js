import WeatherIcon from './WeatherIcon';

export default function ForecastCarousel({ forecast }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 dark:bg-gray-800">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">3-Day Forecast</h3>
      <div className="flex overflow-x-auto gap-4 pb-2">
        {forecast.map((day) => (
          <div key={day.date} className="flex-shrink-0 w-32 p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
            <p className="text-center font-medium text-gray-700 dark:text-gray-300">
              {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            <div className="flex justify-center my-2">
              <WeatherIcon condition={day.day.condition.text} small />
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-800 dark:text-white">{Math.round(day.day.maxtemp_c)}°</span>
              <span className="text-gray-500 dark:text-gray-400">{Math.round(day.day.mintemp_c)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}