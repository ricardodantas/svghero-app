import React from 'react';
import { Icon } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { IconNames } from '@blueprintjs/icons';
import styled from 'styled-components';
import icon from '../../assets/icon.svg';

import onFilesDropped from '../actions/renderer/onFilesDropped';
import translate from '../localization/translate';
import AppConfig from '../config';
import initMenuTrigger from '../actions/renderer/initMenuTrigger';
import DropZone from '../components/DropZone';

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

  return (
    <DropZone onFilesDropped={onFilesDropped}>
      <Header>
        <img width="200px" alt="icon" src={icon} />
      </Header>
      <Container>
        {/* <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          some link
        </a> */}
        <button type="button">
          <Icon icon={IconNames.DOCUMENT_OPEN} iconSize={Icon.SIZE_LARGE} />{' '}
          {translate('select_svg_files')}
        </button>
        <p>{translate('drop_files_here')}</p>
      </Container>
      <ButtonPreferences
        to={AppConfig.routes.preferences}
        title={`${translate('Preferences')}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Icon icon={IconNames.COG} iconSize={Icon.SIZE_LARGE} />
      </ButtonPreferences>
    </DropZone>
  );
};

export default Home;
