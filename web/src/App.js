import React from 'react';
import './styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './routes/Home';
import AddClient from './routes/AddClient';
import AddCar from './routes/AddCar';
import AddService  from './routes/AddService';

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/add-service">
          {/* <AddService /> */}
        </Route>
        <Route path="/add-car">
          <AddCar />
        </Route>
        <Route path="/add-client">
          <AddClient />
        </Route>
        <Route path="/">
          {/* <Home />   */}
          <AddCar />
          {/* <AddService /> */}

        </Route>
        {/* <Route path="/add-service">
            <AddService />
          </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
