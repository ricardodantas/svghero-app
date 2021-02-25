import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from './pages/Home';
import Preferences from './pages/Preferences';
import AppConfig from './config';

const { ipcRenderer } = window.require('electron');

export default function App() {
  const [goTo, setGoTo] = useState('/');
  useEffect(() => {
    ipcRenderer.on('REACT_ROUTE_GO_TO', (event, data) => {
      console.log('===> ', event, data);
      setGoTo(data);
    });
    console.log('==> goTo: ', goTo);
  }, [goTo]);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path={AppConfig.routes.preferences}
          component={Preferences}
        />
        <Route render={() => <Redirect to={goTo} />} />
      </Switch>
    </Router>
  );
}
