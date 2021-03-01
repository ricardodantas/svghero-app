/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import { Button, InputGroup, TextArea } from '@blueprintjs/core';
import React from 'react';
import styled from 'styled-components';
import { IconNames } from '@blueprintjs/icons';

import translate from '../localization/translate';

const Text = styled.div({
  margin: '20px 0',
});

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px 0;
  width: 100%;
`;

const ButtonStyled = styled(Button)`
  margin-top: 20px;
`;

const InputsWrapper = styled.div({
  width: '70%',
  margin: '20px 0;',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  minHeight: 145,
});

export default function LicenseWindow() {
  function saveLicenseSettings() {}
  return (
    <div className="no-scroll height-size-full align-center-xy flex-direction-column bp3-dark">
      <Container>
        <h1>{translate('license_window_title')}</h1>
        <Text>{translate('license_window_paragraph1')}</Text>

        <InputsWrapper>
          <InputGroup leftIcon={IconNames.ENVELOPE} placeholder="Email" fill />
          <TextArea fill placeholder={translate('license_key')} />
        </InputsWrapper>

        <ButtonStyled
          type="button"
          onClick={saveLicenseSettings}
          intent="primary"
          large
        >
          {translate('activate_license')}
        </ButtonStyled>
      </Container>
    </div>
  );
}
