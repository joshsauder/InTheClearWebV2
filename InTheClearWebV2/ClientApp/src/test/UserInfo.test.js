import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import 'jest-enzyme'
import Adapter from 'enzyme-adapter-react-16';
import UserInfo from '../components/UserInfo'

Enzyme.configure({ adapter: new Adapter() });

describe('Test User Info', () => {
    test('Test Render', () => {
       const props =  {
            logout: jest.fn(),
            name: ""
        }
        const render = shallow(<UserInfo {...props} />)

        expect(render.exists()).toBe(true)
    })

    test("Test Show Correct Name", () => {
        const props =  {
            logout: jest.fn(),
            name: "Josh Sauder"
        }
        const render = shallow(<UserInfo {...props} />)

        expect(render.find('.text-white')).toHaveText('Hello! Josh Sauder')
    })

    test("Test No Name Given", () => {
        const props =  {
            logout: jest.fn(),
            name: undefined
        }
        const render = shallow(<UserInfo {...props} />)

        expect(render.find('.text-white')).toHaveText('Hello! ')
    })
})

