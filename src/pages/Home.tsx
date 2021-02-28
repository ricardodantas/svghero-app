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
  margin: 20px 0 40px;
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
    <>
      <DropZone onFilesDropped={onFilesDropped}>
        <Header className="animate__animated animate__fadeIn">
          <img width="200px" alt="icon" src={icon} />
        </Header>
      </DropZone>
      <ButtonPreferences
        to={AppConfig.routes.preferences}
        title={`${translate('Preferences')}`}
      >
        <Icon icon={IconNames.COG} iconSize={Icon.SIZE_LARGE} />
      </ButtonPreferences>
    </>
  );
};

export default Home;
