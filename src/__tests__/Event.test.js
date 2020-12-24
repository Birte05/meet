//Test: It must be able to show/hide event details.


import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import { mockData } from "../mock-data";

import EventList from '../EventList';
import Event from '../Event';
import { extractEvents } from "../api";
const events = extractEvents(mockData);

describe('<Event /> component', () => {
  let EventWrapper;

  beforeAll(() => {
    EventWrapper = shallow(<Event event={events[0]} />);
  });

  // test('test that show/hide details button is rendered', () => {
  //   expect(EventWrapper.find('.event__Overview button')).toHaveLength(1);
  // });

  // test('click on button should show details', () => {
  //   EventWrapper.setState({
  //     showDetails: false
  //   });
  //   EventWrapper.find('.event__Overview button').simulate('click');
  //   expect(EventWrapper.state('showDetails')).toBe(true);
  // });

  test('click on button should hide details', () => {
    EventWrapper.setState({
      showDetails: false
    });
    EventWrapper.find('.details-btn').simulate('click');
    expect(EventWrapper.state('showDetails')).toBe(true);
  });


});
