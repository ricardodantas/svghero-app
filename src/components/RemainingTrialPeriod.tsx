import React from 'react';

import styled from 'styled-components';
import translate from '../localization/translate';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #ea77d1;
  z-index: 1;
  padding-bottom: 15px;
  font-weight: 100;
  font-size: 12px;
`;
type RemainingTrialPeriodType = { remainingTrialPeriod: number };

const RemainingTrialPeriod = (props: RemainingTrialPeriodType) => {
  const { remainingTrialPeriod } = props;
  return (
    <Container>
      {translate('remaining_trial_period_text', { remainingTrialPeriod })}
    </Container>
  );
};

export default RemainingTrialPeriod;
