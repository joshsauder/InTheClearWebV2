import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import 'jest-enzyme'

import { createStore } from 'redux'

let store = createStore(jest.fn())

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App store={store} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
