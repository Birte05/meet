import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { extractEvents, extractLocations } from "./api";
import Event from './Event';
import NumberOfEvents from './NumberOfEvents';
import "./nprogress.css";
import { mockData } from "./mock-data";

// let locations = extractLocations(mockData)

class App extends Component {
  state = {
    locations: extractLocations(mockData),
    events: extractEvents(mockData)
  }
  render() {
    return (

      <div className="App">
        <CitySearch locations={this.state.locations}/>
        <NumberOfEvents />
        <EventList events={this.state.events}/>
      </div>
    );
  }
}

export default App;
