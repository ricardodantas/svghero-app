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
import Loading from '../components/Loading';

const Text = styled.div({
  margin: '20px 0',
  width: 328,
  textAlign: 'center',
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
  storedLicense: string;
};

function RegisteredContainer(props: RegisteredContainerProps) {
  const history = useHistory();
  const { storedLicense } = props;
  return (
    <div className="no-scroll height-size-full align-center-xy flex-direction-column bp3-dark">
      <Container>
        <h1>{translate('license_registered')}</h1>
        <Text>{translate('activate_license_screen_thankyou')}</Text>
        <Text>{storedLicense}</Text>
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
  const [licenseKey, setLicenseKeyField] = useState<string>('');
  const [loading, setLoadingStatus] = useState<boolean>(false);
  const storedLicense = getLicenseKey();

  if (
    storedLicense?.length &&
    storedLicense !== AppConfig.trialPeriodLicenseValue
  ) {
    return <RegisteredContainer storedLicense={storedLicense} />;
  }

  async function saveLicenseSettings() {
    setLoadingStatus(true);
    const validLicenseKey = await isValidLicenseKey(licenseKey);
    if (validLicenseKey) {
      setLicenseKey(licenseKey);
      triggerDialog('info', translate('activate_license_screen_thankyou'));
      history.push(AppConfig.routes.home);
    }
    setLoadingStatus(false);
  }
  return (
    <div className="no-scroll height-size-full align-center-xy flex-direction-column animate__animated animate__fadeIn">
      <Container>
        <h1 className="title">{translate('activate_license_screen_title')}</h1>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Text>{translate('activate_license_screen_paragraph1')}</Text>
            <InputsWrapper>
              <TextArea
                fill
                required
                onChange={(e) => setLicenseKeyField(e.currentTarget.value)}
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
          </>
        )}
      </Container>
    </div>
  );
}
