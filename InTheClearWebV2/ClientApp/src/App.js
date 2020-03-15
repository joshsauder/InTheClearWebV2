import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import firebase from 'firebase/app';
import "firebase/analytics";
import "firebase/auth";
import { Provider } from 'react-redux'

import GoogleMap from "./components/googleMap";
import Login from "./components/login";
import withAuth from "./services/authService";

import './App.css'

import config from "./firebaseConfig.json";

firebase.initializeApp(config);
firebase.analytics();

const App = ({store}) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="" component={withAuth(GoogleMap)}/>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
