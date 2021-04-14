import { Alignment, Switch } from '@blueprintjs/core';
import React, { useContext } from 'react';

import styled from 'styled-components';
import ExportOptionsContext from '../contexts/exportOptions';
import { ExportFormat } from '../libs/exporter';
import translate from '../localization/translate';

const ToggleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 20px;
  flex-direction: column;
  padding-top: 30px;
`;

export default function ExportOptions() {
  const { selectedFormats, setSelectedFormats } = useContext(
    ExportOptionsContext
  );

  return (
    <Wrapper className="border-top">
      {Object.keys(ExportFormat).map((format) => {
        return (
          <ToggleWrapper key={format}>
            <Switch
              checked={(selectedFormats || []).includes(ExportFormat[format])}
              alignIndicator={Alignment.LEFT}
              large
              onChange={() => setSelectedFormats(ExportFormat[format])}
              label={translate(`convert_to_${ExportFormat[format]}`)}
            />
          </ToggleWrapper>
        );
      })}
    </Wrapper>
  );
}
