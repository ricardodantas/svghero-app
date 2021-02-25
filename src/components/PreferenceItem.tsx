import React, { useState } from 'react';
import { Alignment, Switch } from '@blueprintjs/core';
import translate from '../libs/translate';
import styles from './PreferenceItem.scss';

export type PreferenceItemProps = {
  description: string;
  active: boolean;
  name: string;
};

const PreferenceItem = ({ description, active }: PreferenceItemProps) => {
  const [itemStatus, setItemStatus] = useState<boolean>(active);
  return (
    <div className={styles.PreferenceItem}>
      <div className={styles.Description}>{translate(description)}</div>
      <div className={styles.ToggleWrapper}>
        <Switch
          checked={itemStatus}
          alignIndicator={Alignment.RIGHT}
          large
          onChange={() => setItemStatus(!itemStatus)}
        />
      </div>
    </div>
  );
};

export default PreferenceItem;
