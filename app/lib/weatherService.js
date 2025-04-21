/**
 * Fetches weather data by city name from WeatherAPI.com
 * @param {string} city - Name of the city to search for
 * @returns {Promise<FormattedWeatherData>} Formatted weather data
 * @throws {Error} When city is not found or API request fails
 */
export async function fetchWeatherByCity(city) {
  // Make API request to WeatherAPI with city parameter
  const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}&days=5&aqi=no&alerts=yes`
  );
  
  // Handle API errors (404 for invalid city, etc.)
  if (!response.ok) {
      throw new Error('City not found');
  }

  // Parse response and format the data
  const data = await response.json();
  return formatWeatherData(data);
}

/**
* Fetches weather data by geographic coordinates (latitude/longitude)
* @param {number} lat - Latitude coordinate
* @param {number} lon - Longitude coordinate
* @returns {Promise<FormattedWeatherData>} Formatted weather data
* @throws {Error} When location is not found or API request fails
*/
export async function fetchWeatherByCoords(lat, lon) {
  // Make API request to WeatherAPI with coordinates
  const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${lat},${lon}&days=5&aqi=no&alerts=yes`
  );
  
  // Handle API errors
  if (!response.ok) {
      throw new Error('Location not found');
  }

  // Parse response and format the data
  const data = await response.json();
  return formatWeatherData(data);
}

/**
* Formats raw API weather data into a more structured format
* @param {object} data - Raw weather data from API response
* @returns {FormattedWeatherData} Organized weather data structure
*/
function formatWeatherData(data) {
  // Extract relevant data sections from API response
  const current = data.current;
  const location = data.location;
  const forecast = data.forecast.forecastday;
  
  // Return formatted object with only the data we need
  return {
      // Location information
      location: {
          name: location.name,
          region: location.region,
          country: location.country,
          localtime: location.localtime
      },
      // Current weather conditions
      current: {
          temp_c: current.temp_c,  // Temperature in Celsius
          condition: {
              text: current.condition.text  // Weather description
          },
          humidity: current.humidity,  // Humidity percentage
          wind_kph: current.wind_kph,   // Wind speed in km/h
          uv: current.uv                // UV index
      },
      // 5-day forecast data (mapped to simplified format)
      forecast: forecast.map(day => ({
          date: day.date,  // Forecast date
          day: {
              maxtemp_c: day.day.maxtemp_c,  // Maximum temperature
              mintemp_c: day.day.mintemp_c,  // Minimum temperature
              condition: {
                  text: day.day.condition.text  // Weather description
              }
          }
      }))
  };
}