/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import { Button, Icon } from '@blueprintjs/core';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { IconNames } from '@blueprintjs/icons';
import { ALLOWED_FILE_MIME_TYPES } from '../libs/svg';
import translate from '../localization/translate';

type DropZoneType = {
  onFilesDropped: (acceptedFiles: File[]) => void;
};

const Message = styled.div({
  fontWeight: 'bold',
  fontSize: '25px',
  marginTop: 20,
});

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px 0;
`;

export default function LicenseWindow() {
  function saveLicenseSettings() {}
  return (
    <div className="no-scroll height-size-full align-center-xy flex-direction-column bp3-dark">
      <Container>
        <h1>{translate('license_window_title')}</h1>
        <p>{translate('license_window_paragraph1')}</p>
        <Button
          type="button"
          onClick={saveLicenseSettings}
          intent="primary"
          large
        >
          {translate('activate_license')}
        </Button>
      </Container>
    </div>
  );
}
