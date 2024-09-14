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

    // Component did update lifecycle method
    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate');
        if (prevState.selectedCity !== this.state.selectedCity && this.state.loading) {
            this.fetchWeather(this.state.selectedCity);
        }
    }

    // Handle city change
    handleCityChange = (event) => {
    this.setState({
        selectedCity: event.target.value,
        loading: true
    });
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

      render() {
        const { weather, loading, selectedCity } = this.state;
        const cities = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney'];  // Cities to switch between
    
        return (
          <div>
            <h2>Weather Dashboard</h2>
    
            {/* Dropdown to select city */}
            <label htmlFor="city-select">Choose a city: </label>
            <select id="city-select" value={selectedCity} onChange={this.handleCityChange}>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
    
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
