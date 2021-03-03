import { Alignment, Switch } from '@blueprintjs/core';
import React, { useState } from 'react';

import styled from 'styled-components';
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
  const [conversionFormats, setConversionFormats] = useState<
    ConversionFormat[]
  >([]);

  function onToggleConversionFormat(format: ConversionFormat) {
    const foundFormat = conversionFormats.indexOf(format);
    if (foundFormat >= 0) {
      conversionFormats.splice(foundFormat, 1);
      return setConversionFormats([...conversionFormats]);
    }
    return setConversionFormats([...conversionFormats, format]);
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
