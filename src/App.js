import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { extractEvents, extractLocations, getEvents } from "./api";
import Event from './Event';
import NumberOfEvents from './NumberOfEvents';
import "./nprogress.css";
import { mockData } from "./mock-data";


class App extends Component {
  state = {
    locations: [],
    events: [],
    numberOfEvents: 32
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events: events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  // Task 4.4
  updateEvents = (location) => {

    // this.setState({numberOfEvents: eventCount})
    console.log(this.state)
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events:  locationEvents.slice(0, this.state.eventCount),

      });
    });

  }

  render() {
    return (

      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
