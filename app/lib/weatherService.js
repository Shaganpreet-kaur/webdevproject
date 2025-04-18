export async function fetchWeatherByCity(city) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}&days=5&aqi=no&alerts=yes`);
    
    if (!response.ok) {
      throw new Error('City not found');
    }
  
    const data = await response.json();
    return formatWeatherData(data);
  }
  
  export async function fetchWeatherByCoords(lat, lon) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${lat},${lon}&days=5&aqi=no&alerts=yes`);
    
    if (!response.ok) {
      throw new Error('Location not found');
    }
  
    const data = await response.json();
    return formatWeatherData(data);
  }
  
  function formatWeatherData(data) {
    const current = data.current;
    const location = data.location;
    const forecast = data.forecast.forecastday;
    
    return {
      location: {
        name: location.name,
        region: location.region,
        country: location.country,
        localtime: location.localtime
      },
      current: {
        temp_c: current.temp_c,
        condition: {
          text: current.condition.text
        },
        humidity: current.humidity,
        wind_kph: current.wind_kph,
        uv: current.uv
      },
      forecast: forecast.map(day => ({
        date: day.date,
        day: {
          maxtemp_c: day.day.maxtemp_c,
          mintemp_c: day.day.mintemp_c,
          condition: {
            text: day.day.condition.text
          }
        }
      }))
    };
  }