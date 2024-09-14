import './App.css';
import WeatherDashboard from './WeatherDashboard'
import React, { Component } from 'react';

class App extends Component {
  state = { showDashboard: true };

  toggleDashboard = () => {
    this.setState(prevState => ({ showDashboard: !prevState.showDashboard }));
  };

  render() {
    return (
      <div>
        <button onClick={this.toggleDashboard}>
          {this.state.showDashboard ? 'Unmount Weather Dashboard' : 'Mount Weather Dashboard'}
        </button>
        
        {this.state.showDashboard && <WeatherDashboard />}
      </div>
    );
  }
}

export default App;