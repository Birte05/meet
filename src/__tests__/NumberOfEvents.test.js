//Test: It must specify the number of events (similar to the CitySearch component).


import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import { mockData } from "../mock-data";

import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => { }} />);
  });


  test('render number of events', () => {
    // const NumberOfEventsWrapper = shallow(<App />);
    console.log("NumberOfEventsWrapper======", NumberOfEventsWrapper.props())
    expect(NumberOfEventsWrapper.find('.numberOfEvents label')).toHaveLength(1);
  });
});