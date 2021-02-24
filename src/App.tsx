import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../assets/icon.svg';
import './App.global.css';

import onSelectFilesClick from './actions/onSelectFilesClick';
import onFilesDropped from './actions/onFilesDropped';
import DropFilesHere from './components/DropFilesHere';

const Hello = () => {
  const [draggingStatus, setDraggingStatus] = useState('stopped');

  document.addEventListener('drop', (event) => {
    setDraggingStatus('stopped');
    event.preventDefault();
    event.stopPropagation();
    onFilesDropped(event);
  });

  document.addEventListener('dragover', (e) => {
    // setDraggingStatus('stopped');
    e.preventDefault();
    e.stopPropagation();
  });

  document.addEventListener('dragenter', (event) => {
    console.log('File is in the Drop Space');
    setDraggingStatus('started');
  });

  document.addEventListener('dragleave', (event) => {
    console.log('File has left the Drop Space');
    setDraggingStatus('stopped');
  });

  if (draggingStatus === 'started') {
    return <DropFilesHere />;
  }

  return (
    <div>
      <div className="Header">
        <img width="200px" alt="icon" src={icon} />
        <h1>SvgHero</h1>
      </div>
      <div className="Main">
        {/* <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          some link
        </a> */}
        <button type="button" onClick={onSelectFilesClick}>
          <span role="img" aria-label="download">
            ⬇️
          </span>
          Select SVG files
        </button>
        <p>or drag them to this window</p>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
