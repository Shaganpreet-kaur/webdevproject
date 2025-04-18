import WeatherIcon from './WeatherIcon';

export default function CurrentWeatherCard({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 dark:bg-gray-800">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{data.location.name}</h2>
          <p className="text-gray-600 dark:text-gray-300">
            {data.location.region && `${data.location.region}, `}{data.location.country}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {new Date(data.location.localtime).toLocaleString()}
          </p>
        </div>
        <WeatherIcon condition={data.current.condition.text} 
        time={data.location.localtime} />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-5xl font-bold text-gray-800 dark:text-white">
          {Math.round(data.current.temp_c)}°C
        </div>
        
        <div className="text-gray-600 dark:text-gray-300">
          <p className="capitalize">{data.current.condition.text}</p>
          <p>Humidity: {data.current.humidity}%</p>
          <p>Wind: {data.current.wind_kph} km/h</p>
          <p>UV: {data.current.uv}</p>
        </div>
      </div>
    </div>
  );
}