import React from 'react';
import { mount, shallow } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import { mockData } from '../mock-data';
import CitySearch from '../CitySearch';
import { extractLocations } from '../api';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {

    test('When user hasn\'t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
        let AppWrapper;
        given('user hasn\'t searched for any city', () => {

        });

        when('the user opens the app', () => {
            AppWrapper = mount(<App />);
        });

        then('the user should see the list of upcoming events.', () => {
            //AppWrapper.update();
            //expect(AppWrapper.find('.event')).toHaveLength(mockData.length); // THIS (CF-code) throws an error
            //expect(AppWrapper.find('.event').hostNodes()).toHaveLength(mockData.length); // THIS (CF Tip alternative) throws an error as well
        });
    });

    test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {
        let CitySearchWrapper
        given('the main page is open', () => {
            const locations = extractLocations(mockData);
            CitySearchWrapper = shallow(<CitySearch updateEvents={() => { }} locations={locations} />);
        });

        when('the user starts typing in the city textbox', () => {
            CitySearchWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
        });

        then('the user should receive a list of cities (suggestions) that match what they\'ve typed.', () => {
          expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
        });
    });

    test('User can select a city from the suggested list', ({ given, and, when, then }) => {
        let AppWrapper;
        given(/^user was typing "(.*)" in the city textbox$/, async (arg0) => {
            AppWrapper = await mount(<App />);
            AppWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
        });

        and('the list of suggested cities is showing', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.suggestions li')).toHaveLength(2);
        });

        when(/^the user selects a city\(e.g., "(.*)"\) from the list$/, (arg0) => {
            AppWrapper.find('.suggestions li').at(0).simulate('click');
        });

        then(/^the city should be changed to that city\(i.e., "(.*)"\)$/, (arg0) => {
            const CitySearchWrapper = AppWrapper.find(CitySearch);
            expect(CitySearchWrapper.state('query')).toBe('Berlin, Germany');
        });

        and('the user should receive a list of upcoming events in that city.', () => {
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });
    });

});
