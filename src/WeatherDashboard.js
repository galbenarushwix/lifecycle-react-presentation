import React, { Component } from 'react';

class WeatherDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      loading: true,
      selectedCity: 'London',  // Default city
    };
  }

// Fetch weather data method
  fetchWeather(city) {
    const apiKey = '7d21c2719baf4e80938181701241409';  // Replace with your WeatherAPI key

    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
      .then(response => response.json())
      .then(data => this.setState({ weather: data, loading: false }))
      .catch(error => {
        console.error('Error fetching weather data:', error);
        this.setState({ loading: false });
      });
  }

  // Component did mount lifecycle method
  componentDidMount() {
    console.log('componentDidMount');
    this.fetchWeather(this.state.selectedCity);
  }


  render() {
    const { weather, loading } = this.state;

    return (
      <div>
        <h2>Weather Dashboard</h2>

        {/* Show loading state or weather data */}
        {loading ? (
          <p>Loading weather data...</p>
        ) : (
          weather ? (
            <div>
              <h3>Weather in {weather.location.name}</h3>
              <p>Temperature: {weather.current.temp_c}°C</p>
              <p>Condition: {weather.current.condition.text}</p>
            </div>
          ) : (
            <p>No weather data available.</p>
          )
        )}
      </div>
    );
  }
}

export default WeatherDashboard;
