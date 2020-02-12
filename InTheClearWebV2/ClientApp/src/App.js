import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import GoogleMap from "./components/googleMap";
import Login from "./components/login";
import withAuth from "./services/authService";
import * as firebase from 'firebase';
import config from "./firebaseConfig.json";


firebase.initializeApp(config);

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
