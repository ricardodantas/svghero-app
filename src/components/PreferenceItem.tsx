import React, { useState } from 'react';
import { Alignment, Switch } from '@blueprintjs/core';
import translate from '../libs/translate';
import styles from './PreferenceItem.scss';
import { PreferenceItemProps } from '../libs/preferences';

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
    <div className={styles.PreferenceItem}>
      <div className={styles.Description}>{translate(description)}</div>
      <div className={styles.ToggleWrapper}>
        <Switch
          checked={itemStatus}
          alignIndicator={Alignment.RIGHT}
          large
          onChange={onChangePreference}
        />
      </div>
    </div>
  );
};

export default PreferenceItem;
