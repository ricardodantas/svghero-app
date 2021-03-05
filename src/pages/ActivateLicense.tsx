import { Button, InputGroup, TextArea } from '@blueprintjs/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import { IconNames } from '@blueprintjs/icons';
import { useHistory } from 'react-router-dom';
import translate from '../localization/translate';
import {
  getLicenseKey,
  isValidLicenseKey,
  setLicenseKey,
} from '../actions/renderer/license';
import triggerDialog from '../libs/renderer/dialog';
import AppConfig from '../config';
import { LicenseKeyAPiResponse } from '../libs/license';

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

type RegisteredContainerProps = {
  storedLicense: LicenseKeyAPiResponse;
};

function RegisteredContainer(props: RegisteredContainerProps) {
  const history = useHistory();
  const { storedLicense } = props;
  return (
    <div className="no-scroll height-size-full align-center-xy flex-direction-column bp3-dark">
      <Container>
        <h1>{translate('activate_license_screen_title')}</h1>
        <Text>
          {translate('license_key_registered_to')} {storedLicense.buyer_email}
        </Text>
        <ButtonStyled
          type="button"
          onClick={() => {
            history.push(AppConfig.routes.home);
          }}
          intent="success"
          large
        >
          {translate('Ok')}
        </ButtonStyled>
      </Container>
    </div>
  );
}

export default function LicenseWindow() {
  const history = useHistory();
  const [email, setEmail] = useState<string>('');
  const [licenseKey, setLicenseKeyField] = useState('');
  const storedLicense = getLicenseKey();

  if (
    storedLicense?.buyer_email?.length &&
    storedLicense?.buyer_email !== AppConfig.trialPeriodLicenseValue
  ) {
    return <RegisteredContainer storedLicense={storedLicense} />;
  }

  async function saveLicenseSettings() {
    const validLicenseKey = await isValidLicenseKey(email, licenseKey);
    if (validLicenseKey) {
      setLicenseKey(validLicenseKey);
      triggerDialog('info', translate('activate_license_screen_thankyou'));
      history.push(AppConfig.routes.home);
    }
  }
  return (
    <div className="no-scroll height-size-full align-center-xy flex-direction-column animate__animated animate__fadeIn">
      <Container>
        <h1 className="title">{translate('activate_license_screen_title')}</h1>
        <Text>{translate('activate_license_screen_paragraph1')}</Text>
        <InputsWrapper>
          <InputGroup
            onKeyUp={(e) => setEmail(e.currentTarget.value)}
            leftIcon={IconNames.ENVELOPE}
            placeholder="Email"
            fill
            required
          />
          <TextArea
            fill
            required
            onKeyUp={(e) => setLicenseKeyField(e.currentTarget.value)}
            placeholder={translate('activate_license_screen_instructions')}
          />
        </InputsWrapper>
        <ButtonStyled
          type="button"
          onClick={saveLicenseSettings}
          intent="primary"
          large
        >
          {translate('activate')}
        </ButtonStyled>
      </Container>
    </div>
  );
}
