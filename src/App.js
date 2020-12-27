import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { extractEvents, extractLocations, getEvents } from "./api";
import Event from './Event';
import NumberOfEvents from './NumberOfEvents';
import "./nprogress.css";
import { mockData } from "./mock-data";
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

    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events:  locationEvents.slice(0, this.state.eventCount),
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

  render() {
    return (
      <div className="App">
      <h1>List of Coding Events</h1>

      <p>Choose your nearest location</p>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <InfoAlert className="info-text" text={this.state.infoText} />
        <NumberOfEvents numberOfEvents={this.state.result} updateEvents={this.updateEvents} />
        <ErrorAlert text={this.state.errMessage} />

      <div className='data-vis-wrapper'>
        {/* <EventGenre events={events}/> */}

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
