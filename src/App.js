import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';

import Event from './Event';
import NumberOfEvents from './NumberOfEvents';
import "./nprogress.css";

class App extends Component {
  render() {
    return (

      <div className="App">
        <CitySearch />
        <EventList />
      </div>
    );
  }
}

export default App;
