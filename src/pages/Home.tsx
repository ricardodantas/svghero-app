import React, { useContext, useEffect, useState } from 'react';
import { Icon } from '@blueprintjs/core';
import { Link, useHistory } from 'react-router-dom';
import { IconNames } from '@blueprintjs/icons';
import styled from 'styled-components';
import icon from '../../assets/icon.svg';

import onFilesDropped from '../actions/renderer/onFilesDropped';
import translate from '../localization/translate';
import AppConfig from '../config';
import initMenuTrigger from '../actions/renderer/initMenuTrigger';
import DropZone from '../components/DropZone';
import { getLicenseKey, setFirstUseDate } from '../actions/renderer/license';
import ExportOptionsContext from '../contexts/exportOptions';
import { ExportFormat } from '../libs/exporter';
import { AVAILABLE_STORE_KEYS, storeExportPreferences } from '../libs/store';

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
const Logo = styled.img({ width: 200 });

const Home = () => {
  initMenuTrigger();
  setFirstUseDate();
  const { selectedFormats } = useContext(ExportOptionsContext);
  function setSelectedFormats(selectedFormatsInput: ExportFormat[]) {
    storeExportPreferences.set(
      AVAILABLE_STORE_KEYS.exportPreferences.SELECTED_FORMATS,
      selectedFormatsInput
    );
  }

  const history = useHistory();
  if (!getLicenseKey()) {
    history.push(AppConfig.routes.activateLicense);
    return null;
  }

  return (
    <ExportOptionsContext.Provider
      value={{ selectedFormats, setSelectedFormats }}
    >
      <DropZone onFilesDropped={onFilesDropped}>
        <Header className="animate__animated animate__fadeIn">
          <Logo src={icon} />
        </Header>
      </DropZone>
      <ButtonPreferences
        to={AppConfig.routes.preferences}
        title={`${translate('Preferences')}`}
      >
        <Icon icon={IconNames.COG} iconSize={Icon.SIZE_LARGE} />
      </ButtonPreferences>
    </ExportOptionsContext.Provider>
  );
};

export default Home;
