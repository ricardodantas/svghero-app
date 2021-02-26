import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, InputGroup } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import styles from './Preferences.scss';

import translate from '../libs/translate';
import AppConfig from '../config';
import PreferenceItem from '../components/PreferenceItem';
import { PreferenceInputs, SvgoPlugin } from '../libs/preferences';
import { getPreference, setPreference } from '../actions/preferences';

const { extendDefaultPlugins } = require('svgo');

const defaultSvgPlugins: SvgoPlugin[] = extendDefaultPlugins([]);

const Preferences = () => {
  const savedPreferences = defaultSvgPlugins.map((svgoPlugin) =>
    getPreference(svgoPlugin.name, {
      name: svgoPlugin.name,
      value: svgoPlugin.active,
      type: 'boolean',
      description: svgoPlugin.description,
    })
  );

  const [items, setItems] = useState<PreferenceInputs[]>([...savedPreferences]);
  function keyUpHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setItems(
      savedPreferences.filter(
        (item) =>
          item.description?.includes(event.target.value) ||
          item.name?.includes(event.target.value)
      )
    );
  }

  function onUpdatePreferenceItem(preference: PreferenceInputs) {
    setPreference(preference);
  }

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
              active={item.value as boolean}
              name={item.name}
              key={item.name}
              onUpdate={onUpdatePreferenceItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preferences;
