import { Button, TextArea } from '@blueprintjs/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { shell } from 'electron';

import translate from '../localization/translate';
import {
  getLicenseKey,
  isValidLicenseKey,
  setLicenseKey,
  verifyLicense,
} from '../actions/renderer/license';
import triggerDialog from '../libs/renderer/dialog';
import AppConfig from '../config';

import Loading from '../components/Loading';

const Text = styled.div({
  margin: '20px 0',
  width: 328,
  textAlign: 'center',
  maxWidth: '100%',
});

const ErrorText = styled(Text)`
  color: red;
  margin: 0 0 20px;
`;

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
  min-width: 250px !important;
`;

const InputsWrapper = styled.div({
  width: '70%',
  margin: '20px 0;',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  minHeight: 145,
});

const BuyLicenseWrapper = styled.div({
  borderTop: '2px solid #202B33',
  marginTop: '50px',
  paddingTop: '20px',
  textAlign: 'center',
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
        {storedLicense && storedLicense.length > 40 ? (
          <Text>BETA PROGRAM</Text>
        ) : (
          <>
            <Text>{translate('activate_license_screen_thankyou')}</Text>
            <Text>{storedLicense}</Text>
          </>
        )}
        <ButtonStyled
          type="button"
          onClick={() => {
            history.push(AppConfig.routes.home);
          }}
          intent="primary"
          large
        >
          {translate('Ok')}
        </ButtonStyled>
      </Container>
    </div>
  );
}

function BuyLicense() {
  const onClickBuyLicense = () => {
    const buyLicenseUrl = `${AppConfig.website}/buy`;
    shell.openExternal(buyLicenseUrl);
  };
  return (
    <BuyLicenseWrapper>
      <Text>{translate('activate_license_screen_paragraph2')}</Text>
      <ButtonStyled
        type="button"
        onClick={onClickBuyLicense}
        intent="primary"
        large
      >
        {translate('buy_license')}
      </ButtonStyled>
    </BuyLicenseWrapper>
  );
}

function RegisterLicense() {
  const history = useHistory();
  const [licenseKey, setLicenseKeyField] = useState<string>('');
  const [loading, setLoadingStatus] = useState<boolean>(false);
  const [licenseStatus, setLicenseStatus] = useState<boolean>(true);

  async function saveLicenseSettings() {
    setLoadingStatus(true);
    const validLicenseKey = await isValidLicenseKey(licenseKey);
    if (validLicenseKey) {
      setLicenseKey(licenseKey);
      triggerDialog('info', translate('activate_license_screen_thankyou'));
      history.push(AppConfig.routes.home);
      setLicenseStatus(true);
    }
    setLicenseStatus(false);
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
              {!licenseStatus ? (
                <ErrorText>{translate('invalid_license')}</ErrorText>
              ) : null}
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
            <BuyLicense />
          </>
        )}
      </Container>
    </div>
  );
}

export default function LicenseWindow() {
  const storedLicense = getLicenseKey();
  const [loading, setLoadingStatus] = useState<boolean>(true);
  const [isInvalidLicense, setIsInvalidLicense] = useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    verifyLicense()
      .catch(() => {
        setIsInvalidLicense(true);
      })
      .finally(() => {
        setLoadingStatus(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="no-scroll height-size-full align-center-xy flex-direction-column animate__animated animate__fadeIn">
        <Container>
          <Loading />
        </Container>
      </div>
    );
  }

  if (
    !isInvalidLicense &&
    storedLicense?.length &&
    storedLicense !== AppConfig.trialPeriodLicenseValue
  ) {
    return <RegisteredContainer storedLicense={storedLicense} />;
  }

  return <RegisterLicense />;
}
