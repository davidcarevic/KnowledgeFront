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
import Teams from './containers/Teams'
import PrivateRoute from "./HOC/PrivateRoute";
import CreateTeam from "./containers/CreateTeam";

const App=()=> (
  
    <Router>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register}/>
      <PrivateRoute exact path="/teams" Component={Teams}/>
      <PrivateRoute exact path="/teams/create" Component={CreateTeam}/>
      <PrivateRoute exact path="/teams/{name}"/>
      <Route exact path="/testnav" component={TestNav}/>
      </Switch>
    </Router>
  )


export default App;
