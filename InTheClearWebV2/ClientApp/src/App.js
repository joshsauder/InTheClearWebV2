import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import GoogleMap from "./components/googleMap";
import Login from "./components/login"
import withAuth from "./services/authService"

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
       <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="" component={withAuth(GoogleMap)} />
          </Switch>
       </BrowserRouter>
    );
  }
}
