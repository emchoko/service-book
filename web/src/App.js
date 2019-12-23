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
import About from './routes/About';


function App() {

  return (
    <Router>
      <Layout>

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>


        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
        
      </Layout>
    </Router>
  );
}

export default App;
