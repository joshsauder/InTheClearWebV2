import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import * as firebase from 'firebase';
import "firebase/analytics";
import "firebase/auth";
import { Provider } from 'react-redux'

import GoogleMap from "./components/googleMap";
import Login from "./components/login";
import withAuth from "./services/authService";

import './App.css'

import config from "./firebaseConfig.json";

firebase.initializeApp(config);

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
