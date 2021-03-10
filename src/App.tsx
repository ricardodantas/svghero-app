import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { FocusStyleManager } from '@blueprintjs/core';

import Home from './pages/Home';
import Preferences from './pages/Preferences';
import ActivateLicense from './pages/ActivateLicense';
import AppConfig from './config';
import './App.global.scss';
import ProtectedRoute from './components/ProtectedRoute';
import { setFirstUseDate } from './actions/renderer/license';

export default function App() {
  setFirstUseDate();
  FocusStyleManager.onlyShowFocusOnTabs();
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" component={Home} /> */}
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute
          exact
          path={AppConfig.routes.preferences}
          component={Preferences}
        />
        {/* <Route
          exact
          path={AppConfig.routes.preferences}
          component={Preferences}
        /> */}
        <Route
          exact
          path={AppConfig.routes.activateLicense}
          component={ActivateLicense}
        />
      </Switch>
    </Router>
  );
}
