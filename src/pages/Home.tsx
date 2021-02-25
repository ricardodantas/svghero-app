import React, { useEffect, useState } from 'react';
import icon from '../../assets/icon.svg';
import styles from './Home.scss';

import onSelectFilesClick from '../actions/onSelectFilesClick';
import onFilesDropped from '../actions/onFilesDropped';
import DropFilesHere from '../components/DropFilesHere';
import translate from '../libs/translate';
import AppConfig from '../config';
import initMenuTrigger from '../actions/initMenuTrigger';

const Home = () => {
  initMenuTrigger();

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
    <div className="no-scroll height-size-full align-center-xy flex-direction-column">
      <div className={styles.Header}>
        <img width="200px" alt="icon" src={icon} />
        <h1>{AppConfig.appName}</h1>
      </div>
      <div className={styles.Main}>
        {/* <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          some link
        </a> */}
        <button type="button" onClick={onSelectFilesClick}>
          {/* <span role="img" aria-label="download">
            ⬇️
          </span> */}
          {translate('select_svg_files')}
        </button>
        <p>{translate('drop_files_here')}</p>
      </div>
    </div>
  );
};

export default Home;
