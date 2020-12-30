// screen of meet app

import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { extractLocations, getEvents } from "./api";
import NumberOfEvents from './NumberOfEvents';
import "./nprogress.css";
import { InfoAlert, ErrorAlert, OfflineAlert } from './Alert';
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import EventGenre from './EventGenre';

class App extends Component {
  state = {
    locations: [],
    events: [],
    numberOfEvents: 32,
    infoText: '',
    errMessage: '',
    offlineText: ''
  }

  componentDidMount() {
    this.mounted = true;

    if (!navigator.onLine) {
      this.setState({
        offlineAlertText: 'No internet connenction found. Tha data shown is loaded from the cash.'
      });
    }

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
  updateEvents = (location, numberOfEvents = this.state.numberOfEvents) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all' || !location) ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events:  locationEvents.slice(0, numberOfEvents),
        numberOfEvents
      });
    });
  }

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(' ').shift()
      return {city, number};
    })
    return data;
  };

  // handleEventCount = (event) => {
  //   const value = event.target.value;
  //   this.setState({ numberOfEvents: value });
  // };


  render() {
    return (
      <div className="App">
      <h1>List of Coding Events</h1>

      <p>Choose your nearest location</p>
        <OfflineAlert text={this.state.offlineAlertText} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <InfoAlert className="info-text" text={this.state.infoText} />
        <NumberOfEvents numberOfEvents={this.state.result} updateEvents={this.updateEvents} />
        <ErrorAlert text={this.state.errMessage} />

      <div className='data-vis-wrapper'>
        <EventGenre events={this.state.events}/>

        <ResponsiveContainer height={400} >
        <ScatterChart margin={{top: 20, right: 20, bottom: 20, left: 20,}}>
          <CartesianGrid />
          <XAxis type="category" dataKey="city" name="city"/>
          <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false}/>
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={this.getData()} fill="#8884d8" />
        </ScatterChart>
        </ResponsiveContainer>
      </div>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
