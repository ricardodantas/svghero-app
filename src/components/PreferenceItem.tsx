import React, { useState } from 'react';
import { Alignment, Switch } from '@blueprintjs/core';
import styled from 'styled-components';
import translate from '../localization/translate';
import { PreferenceItemProps } from '../libs/preferences';

const Container = styled.div`
  display: flex;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  align-items: center;
  padding: 20px 0;
  &:last-child {
    border-bottom: 0;
  }
`;

const Description = styled.div`
  width: 100%;
  padding: 0 20% 0 5px;
  font-size: 0.85rem;
`;

const ToggleWrapper = styled.div`
  width: auto;
  display: flex;
  align-items: center;
`;

const PreferenceItem = ({
  name,
  description,
  active,
  onUpdate,
}: PreferenceItemProps) => {
  const [itemStatus, setItemStatus] = useState<boolean>(active);
  const onChangePreference = () => {
    const isActive = !itemStatus;
    onUpdate({
      name,
      description,
      value: isActive,
      type: 'boolean',
    });
    setItemStatus(isActive);
  };

  return (
    <Container className="border-color">
      <Description>{translate(description)}</Description>
      <ToggleWrapper>
        <Switch
          checked={itemStatus}
          alignIndicator={Alignment.RIGHT}
          large
          onChange={onChangePreference}
        />
      </ToggleWrapper>
    </Container>
  );
};

export default PreferenceItem;
