import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Preferences from './pages/Preferences';
import ActivateLicense from './pages/ActivateLicense';
import AppConfig from './config';
import './App.global.scss';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path={AppConfig.routes.preferences}
          component={Preferences}
        />
        <Route
          exact
          path={AppConfig.routes.activateLicense}
          component={ActivateLicense}
        />
      </Switch>
    </Router>
  );
}
