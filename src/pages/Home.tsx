import React, { useState } from 'react';
import { Icon } from '@blueprintjs/core';
import { Link, useHistory } from 'react-router-dom';
import { IconNames } from '@blueprintjs/icons';
import styled from 'styled-components';
import is from 'electron-is';
import icon from '../../assets/icon.svg';

import onFilesDropped from '../actions/renderer/onFilesDropped';
import translate from '../localization/translate';
import AppConfig from '../config';
import initMenuTrigger from '../actions/renderer/initMenuTrigger';
import DropZone from '../components/DropZone';

import ExportOptionsContext from '../contexts/exportOptions';
import { ExportFormat } from '../libs/exporter';
import {
  defaultExportPreferences,
  AVAILABLE_STORE_KEYS,
  storeExportPreferences,
} from '../libs/store';
import { verifyLicense } from '../actions/renderer/license';
import onError from '../actions/renderer/onError';
import AppError from '../libs/errors';

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
  const history = useHistory();
  initMenuTrigger();

  if (!is.mas()) {
    const onLicenseCheckFail = (error) => {
      let handledError = {
        ...error,
        message: error.message,
        type: 'error',
      };
      if (error instanceof AppError) {
        handledError = { ...error, message: error.message };
      }
      onError(handledError);
      history.push(AppConfig.routes.activateLicense);
    };
    window.addEventListener('online', () => {
      verifyLicense().catch(onLicenseCheckFail);
    });
    verifyLicense().catch(onLicenseCheckFail);
  }

  const [selectedFormats, setExportOptions] = useState(
    storeExportPreferences.get(
      AVAILABLE_STORE_KEYS.exportPreferences.SELECTED_FORMATS,
      defaultExportPreferences[
        AVAILABLE_STORE_KEYS.exportPreferences.SELECTED_FORMATS
      ]
    )
  );

  function setSelectedFormats(format: ExportFormat) {
    const foundFormat = selectedFormats.indexOf(format);
    let conversionFormatValue: ExportFormat[] = [];
    if (foundFormat >= 0) {
      selectedFormats.splice(foundFormat, 1);
      conversionFormatValue = [...selectedFormats] as ExportFormat[];
    } else {
      conversionFormatValue = [...selectedFormats, format] as ExportFormat[];
    }
    storeExportPreferences.set(
      AVAILABLE_STORE_KEYS.exportPreferences.SELECTED_FORMATS,
      conversionFormatValue
    );
    setExportOptions(conversionFormatValue);
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
