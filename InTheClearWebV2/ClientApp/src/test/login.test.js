import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import {Login} from '../components/login';
import 'jest-enzyme'
import Adapter from 'enzyme-adapter-react-16';
import * as firebase from 'firebase';
import "firebase/analytics";
import "firebase/auth";

Enzyme.configure({ adapter: new Adapter() });

import config from "../firebaseConfig.json";
firebase.initializeApp(config);


describe("Login Component", () => {

    test("Test Render", () => {
        const loginComponent = mount(<Login />)

        expect(loginComponent.exists()).toBe(true);

    })
    
    test('Render on init', () => {

        const loginComponent = mount(<Login />)
        
        expect(loginComponent.find('#firebaseui_container')).toExist();
    })
})