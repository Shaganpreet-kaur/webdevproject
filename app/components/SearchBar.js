// Import React's useState hook for managing component state
import { useState } from 'react';

// SearchBar component provides a form for city search and geolocation button
// Props:
// - onSearch: function called when submitting search form
// - onGeolocation: function called when clicking geolocation button
// - loading: boolean to disable inputs during API requests
export default function SearchBar({ onSearch, onGeolocation, loading }) {
  // State for managing the input field value
  const [city, setCity] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Only trigger search if city input isn't empty
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    // Search form with flex layout and spacing
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      {/* City input field */}
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}  // Update city state on change
        placeholder="Enter city name"
        // Styling classes including focus states and dark mode support
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        disabled={loading}  // Disable during API loading
      />
      
      {/* Search submit button */}
      <button
        type="submit"
        // Blue button styling with hover/focus states
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        // Disable if loading or empty input
        disabled={loading || !city.trim()}
      >
        Search
      </button>
      
      {/* Geolocation button */}
      <button
        type="button"
        onClick={onGeolocation}  // Trigger geolocation callback
        // Gray button styling with hover/focus states
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-600 dark:text-white disabled:opacity-50"
        disabled={loading}  // Disable during API loading
        title="Use my current location"  // Tooltip text
      >
        {/* Location pin icon from Heroicons */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      </button>
    </form>
  );
}