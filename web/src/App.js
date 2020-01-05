import React from 'react';
import './styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CookiesProvider } from 'react-cookie';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import StartService from './routes/StartService';
import Login from './routes/Login';
import AddClient from './routes/AddClient';
import AddCar from './routes/AddCar';
import AddService from './routes/AddService';

function App() {

  return (
    <CookiesProvider>
      <Router>
        <Switch>
          <Route path="/add-service">
            <AddService />
          </Route>
          <Route path="/add-car">
            <AddCar />
          </Route>
          <Route path="/add-client">
            <AddClient />
          </Route>
          <Route path="/start-service">
            <StartService />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </CookiesProvider>
  );
}

export default App;
