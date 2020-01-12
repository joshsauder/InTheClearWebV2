import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import CityData from '../components/CityData';
import {TripsModel} from '../models/trips'
import 'jest-enzyme'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Test City Data', () => {

    test("Renders", () => {
        var tripData = new TripsModel()
        const cityDataComponent = shallow(<CityData cityData={tripData} />)

        expect(cityDataComponent.exists()).toBe(true);

    })

    test("City Data Given", () => {

        var tripData = new TripsModel()
        tripData.endLocation = {lat: 37.3230, lng: -122.0322, name: "Apple HQ"}
        tripData.startLocation = {lat: 39.9644, lng: -82.9959, name: "Columbus, OH"}
        tripData.tripData = [
            {city: "Apple HQ", weather: {Condition: "rain", Description: "rain", Temperature: 70}},
            {city: "Columbus, OH", weather: {Condition: "rain", Description: "rain", Temperature: 70}}
        ]
        tripData.duration = 100
        tripData.distance = 100

        const cityDataComponent = mount(<CityData cityData={tripData} />)

        //card for trip overview and for each location
        expect(cityDataComponent.find(".card-body").length).toEqual(3)
    })

    test("No City Data", () => {

        var tripData = new TripsModel()

        const cityDataComponent = mount(<CityData cityData={tripData} />)

        //no bootstrap cards, should be a spinner showing
        expect(cityDataComponent.find(".card-body").length).toEqual(0)
        expect(cityDataComponent.find(".spinner-border").length).toEqual(1)
    })

})