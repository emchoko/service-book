import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './routes/Home';
import AddClient from './routes/AddClient';
// import AddService from './router/AddService';


function App() {

  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/add-client">
            <AddClient />
          </Route>
          {/* <Route path="/add-service">
            <AddService />
          </Route> */}

        </Switch>

      </Layout>
    </Router>
  );
}

export default App;
