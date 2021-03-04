import { Alignment, Switch } from '@blueprintjs/core';
import React, { useContext, useState } from 'react';

import styled from 'styled-components';
import ConversionOptionsContext from '../contexts/conversion';
import { ConversionFormat } from '../libs/converter';
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
`;

export default function ConversionOptions() {
  const { selectedFormats, setSelectedFormats } = useContext(
    ConversionOptionsContext
  );
  const [conversionFormats, setConversionFormats] = useState<
    ConversionFormat[]
  >(
    Object.keys(selectedFormats).filter(
      (format) => selectedFormats[format] === true
    ) as ConversionFormat[]
  );

  function onToggleConversionFormat(format: ConversionFormat) {
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
    <Wrapper>
      {Object.keys(ConversionFormat).map((format) => {
        return (
          <ToggleWrapper key={format}>
            <Switch
              checked={conversionFormats.includes(ConversionFormat[format])}
              alignIndicator={Alignment.LEFT}
              large
              onChange={() =>
                onToggleConversionFormat(ConversionFormat[format])
              }
              label={translate(`convert_to_${ConversionFormat[format]}`)}
            />
          </ToggleWrapper>
        );
      })}
    </Wrapper>
  );
}
