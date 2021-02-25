/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, InputGroup } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import styles from './Preferences.scss';

import translate from '../libs/translate';
import AppConfig from '../config';
import PreferenceItem, {
  PreferenceItemProps,
} from '../components/PreferenceItem';

const { extendDefaultPlugins } = require('svgo');

const Preferences = () => {
  const defaultItems: PreferenceItemProps[] = extendDefaultPlugins([]);
  const [items, setItems] = useState<PreferenceItemProps[]>([...defaultItems]);
  const keyUpHandler = (event) => {
    setItems(
      defaultItems.filter(
        (item) =>
          item.description.includes(event.target.value) ||
          item.name.includes(event.target.value)
      )
    );
  };

  return (
    <div className="height-size-full padding-medium-xy">
      <div className={styles.FixedBar}>
        <div className={styles.Header}>
          <div className={styles.Title}>
            <Icon icon={IconNames.COG} iconSize={Icon.SIZE_LARGE} />
            <h1>{translate('Preferences')}</h1>
          </div>
          <Link to={AppConfig.routes.home}>
            <Icon icon={IconNames.CROSS} iconSize={Icon.SIZE_LARGE} />
          </Link>
        </div>
        <div className={styles.SearchBar}>
          <InputGroup
            leftIcon={IconNames.SEARCH}
            placeholder="Search"
            fill
            onKeyUp={keyUpHandler}
          />
        </div>
      </div>
      <div className={styles.Main}>
        <div className={styles.Rows}>
          {items.map((item) => (
            <PreferenceItem
              description={item.description}
              active={item.active}
              name={item.name}
              key={item.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preferences;
