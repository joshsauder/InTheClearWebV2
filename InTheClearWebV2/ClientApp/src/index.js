import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import './index.css';
import App from './App';
import rootReducer from "./redux/reducers"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//persist state to user info to localstorage
const persistedState = localStorage.getItem('userState') ? JSON.parse(localStorage.getItem('userState')) : {}
const store = createStore(rootReducer, persistedState)

//subscribe and update localstore if change in redux state
store.subscribe(() => {
  localStorage.setItem('userState', JSON.stringify(store.getState()))
}) 

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

