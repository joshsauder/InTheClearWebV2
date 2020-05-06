import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import './index.css';
import App from './App';
import rootReducer from "./reducers"
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const store = createStore(rootReducer)

const rootEl = document.getElementById('root')

ReactDOM.render(<App store={store}/>, rootEl);

if (module.hot) {
    module.hot.accept('./App', () => {
      const NextApp = require('./App').default
      ReactDOM.render(
        <NextApp store={store}/>,
        rootEl
      )
    })
}

