import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './containers/Home'
import Register from './containers/Register'
import TestNav from './containers/TestNav'

const App=()=> (
  
    <Router>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register}/>
      <Route exact path="/testnav" component={TestNav}/>
      </Switch>
    </Router>
  )


export default App;
