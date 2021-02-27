import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, InputGroup } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import styled from 'styled-components';

import translate from '../localization/translate';
import AppConfig from '../config';
import PreferenceItem from '../components/PreferenceItem';
import { PreferenceInputs, SvgoPlugin } from '../libs/preferences';
import { getPreference, setPreference } from '../actions/renderer/preferences';

const { extendDefaultPlugins } = require('svgo');

const defaultSvgPlugins: SvgoPlugin[] = extendDefaultPlugins([]);

const SearchBar = styled.div({ marginTop: '30px' });

const FixedBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px;
  background-color: var(--body-background-color);
  z-index: 1;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 0;
    margin-right: auto;
    margin-left: 10px;
  }
`;

const Header = styled.div`
  margin: 0;
  display: flex;
  align-content: space-between;
  a {
    margin-left: auto;
  }
`;

const Container = styled.div`
  margin: 126px 0 0 0;
`;

const Rows = styled.div({
  margin: 0,
});

export default function Preferences() {
  const savedPreferences = defaultSvgPlugins.map((svgoPlugin) =>
    getPreference(svgoPlugin.name, {
      name: svgoPlugin.name,
      value: svgoPlugin.active,
      type: 'boolean',
      description: svgoPlugin.description,
    })
  );

  const [items, setItems] = useState<PreferenceInputs[]>([...savedPreferences]);
  function keyUpHandler(event: React.KeyboardEvent<HTMLInputElement>) {
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
      <FixedBar>
        <Header>
          <TitleWrapper>
            <Icon icon={IconNames.COG} iconSize={Icon.SIZE_LARGE} />
            <h1>{translate('Preferences')}</h1>
          </TitleWrapper>
          <Link to={AppConfig.routes.home}>
            <Icon icon={IconNames.CROSS} iconSize={Icon.SIZE_LARGE} />
          </Link>
        </Header>
        <SearchBar>
          <InputGroup
            leftIcon={IconNames.SEARCH}
            placeholder="Search"
            fill
            onKeyUp={keyUpHandler}
          />
        </SearchBar>
      </FixedBar>
      <Container>
        <Rows>
          {items.map((item) => (
            <PreferenceItem
              description={item.description}
              active={item.value as boolean}
              name={item.name}
              key={item.name}
              onUpdate={onUpdatePreferenceItem}
            />
          ))}
        </Rows>
      </Container>
    </div>
  );
}
