import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import GoogleMap from "./components/googleMap";
import Login from "./components/login";
import withAuth from "./services/authService";
import Amplify from 'aws-amplify';
import awsConfig from './aws-exports'
Amplify.configure(awsConfig);


function App() {
  return (
    <div >
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="" component={withAuth(GoogleMap)}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
