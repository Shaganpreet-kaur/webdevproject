export default function WeatherIcon({ condition, small = false, time }) {
  const getIcon = () => {
    const conditionLower = condition.toLowerCase();
    const isNight = time ? isCurrentlyNight(time) : false;

    if (conditionLower.includes('clear')) {
      return isNight ? '🌕' : '☀️';
    } else if (conditionLower.includes('sunny')) {
      return '☀️';
    } else if (conditionLower.includes('cloud')) {
      return '☁️';
    } else if (conditionLower.includes('rain')) {
      return '🌧️';
    } else if (conditionLower.includes('snow')) {
      return '❄️';
    } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
      return '⛈️';
    } else if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
      return '🌫️';
    } else {
      return '🌈';
    }
  };

  return (
    <span className={small ? 'text-2xl' : 'text-4xl'}>
      {getIcon()}
    </span>
  );
}

function isCurrentlyNight(timeString) {
  const date = new Date(timeString);
  const hours = date.getHours();
  return hours < 6 || hours >= 18; 
}