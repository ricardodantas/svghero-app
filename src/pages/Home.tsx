/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Icon } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { IconNames } from '@blueprintjs/icons';
import styled from 'styled-components';
import icon from '../../assets/icon.svg';

import onSelectFilesClick from '../actions/onSelectFilesClick';
import onFilesDropped from '../actions/onFilesDropped';
import DropFilesHere from '../components/DropFilesHere';
import translate from '../localization/translate';
import AppConfig from '../config';
import initMenuTrigger from '../actions/initMenuTrigger';

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px 0;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px 0;
`;

const ButtonPreferences = styled(Link)`
  position: fixed;
  top: 0;
  left: 0;
  padding: 15px;
`;

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

  document.addEventListener('dragenter', (_event) => {
    // console.log('File is in the Drop Space');
    setDraggingStatus('started');
  });

  document.addEventListener('dragleave', (_event) => {
    // console.log('File has left the Drop Space');
    setDraggingStatus('stopped');
  });

  if (draggingStatus === 'started') {
    return <DropFilesHere />;
  }

  return (
    <div className="no-scroll height-size-full align-center-xy flex-direction-column">
      <Header>
        <img width="200px" alt="icon" src={icon} />
        <h1>{AppConfig.appName}</h1>
      </Header>
      <Container>
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
          <Icon icon={IconNames.DOCUMENT_OPEN} iconSize={Icon.SIZE_LARGE} />{' '}
          {translate('select_svg_files')}
        </button>
        <p>{translate('drop_files_here')}</p>
      </Container>
      <ButtonPreferences
        to={AppConfig.routes.preferences}
        title={`${translate('Preferences')}`}
      >
        <Icon icon={IconNames.COG} iconSize={Icon.SIZE_LARGE} />
      </ButtonPreferences>
    </div>
  );
};

export default Home;
