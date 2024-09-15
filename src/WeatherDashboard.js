import React, { useState, useEffect } from 'react';

const WeatherDashboard = () => {
  const [selectedCity, setSelectedCity] = useState('London'); // Default city
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch weather data function
  const fetchWeather = (city) => {
    const apiKey = '7d21c2719baf4e80938181701241409';  // Replace with your actual API key
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      });
  };

  // useEffect to handle mounting and city change
  useEffect(() => {
    console.log('useEffect')
    setLoading(true);
    fetchWeather(selectedCity);
  }, [selectedCity]);  // Runs when selectedCity changes

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div>
      <h2>Weather Dashboard</h2>

      {/* Dropdown to select city */}
      <label htmlFor="city-select">Choose a city: </label>
      <select id="city-select" value={selectedCity} onChange={handleCityChange}>
        {['London', 'New York', 'Tokyo', 'Paris', 'Sydney'].map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {/* Display loading state or weather data */}
      {loading ? (
        <p>Loading weather data...</p>
      ) : (
        weather && (
          <div>
            <h3>Weather in {weather.location.name}</h3>
            <p>Temperature: {weather.current.temp_c}°C</p>
            <p>Condition: {weather.current.condition.text}</p>
          </div>
        )
      )}
    </div>
  );
};

export default WeatherDashboard;
