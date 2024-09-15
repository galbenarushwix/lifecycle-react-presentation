import React, { PureComponent } from 'react';

class ChildComponent extends PureComponent {

  componentDidMount() {
    console.log('child component mounted')
  }  
  componentDidUpdate(prevProps) {
    if (prevProps.city !== this.props.city) {
      console.log('ChildComponent re-rendered due to city change!');
    }
  }

  render() {
    const { city } = this.props;

    return (
      <div>
        <h3>Weather Info for: {city}</h3>
      </div>
    );
  }
}

export default ChildComponent;