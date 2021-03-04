import { Alignment, Switch } from '@blueprintjs/core';
import React, { useContext, useState } from 'react';

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
  const [conversionFormats, setConversionFormats] = useState<ExportFormat[]>(
    selectedFormats as ExportFormat[]
  );

  function onToggleConversionFormat(format: ExportFormat) {
    const foundFormat = conversionFormats.indexOf(format);
    let conversionFormatValue = [];
    if (foundFormat >= 0) {
      conversionFormats.splice(foundFormat, 1);
      conversionFormatValue = [...conversionFormats];
    } else {
      conversionFormatValue = [...conversionFormats, format];
    }
    setConversionFormats(conversionFormatValue);
    setSelectedFormats(conversionFormatValue);
  }

  return (
    <Wrapper className="border-top">
      {Object.keys(ExportFormat).map((format) => {
        return (
          <ToggleWrapper key={format}>
            <Switch
              checked={conversionFormats.includes(ExportFormat[format])}
              alignIndicator={Alignment.LEFT}
              large
              onChange={() => onToggleConversionFormat(ExportFormat[format])}
              label={translate(`convert_to_${ExportFormat[format]}`)}
            />
          </ToggleWrapper>
        );
      })}
    </Wrapper>
  );
}
