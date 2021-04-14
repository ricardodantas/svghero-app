import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, InputGroup, Tab, Tabs } from '@blueprintjs/core';
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
  padding: 25px 15px 15px;
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

function SvgOptimizationSettings(props: {
  items: PreferenceInputs[];
  onUpdatePreferenceItem: (preference: PreferenceInputs) => void;
}) {
  const { items, onUpdatePreferenceItem } = props;
  return (
    <>
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
    </>
  );
}

export default function Preferences() {
  const mainContainerRef = useRef();
  const savedPreferences = defaultSvgPlugins.map((svgoPlugin) =>
    getPreference(svgoPlugin.name, {
      name: svgoPlugin.name,
      value: svgoPlugin.active,
      type: 'boolean',
      description: svgoPlugin.description,
    })
  );

  const [items, setItems] = useState<PreferenceInputs[]>([...savedPreferences]);

  useEffect(() => {
    if (mainContainerRef?.current) {
      mainContainerRef.current.addEventListener('animationend', () => {
        mainContainerRef.current.classList.remove('animate__fadeInUp');
        mainContainerRef.current.removeEventListener('animationend', () => {});
      });
    }
  }, [mainContainerRef]);

  function keyUpHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    setItems(
      savedPreferences.filter(
        (item) =>
          (item.description || '').includes(event.target.value) ||
          (item.name || '').includes(event.target.value)
      )
    );
  }

  function onUpdatePreferenceItem(preference: PreferenceInputs) {
    setPreference(preference);
  }

  return (
    <div
      ref={mainContainerRef}
      className="height-size-full padding-medium-x animate__animated animate__fadeInUp"
    >
      <FixedBar className="body-background-color">
        <Header>
          <TitleWrapper className="title">
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
            type="search"
            fill
            onKeyUp={keyUpHandler}
          />
        </SearchBar>
      </FixedBar>
      <Container>
        <Tabs animate id="PreferencesTabs" defaultSelectedTabId="svgo">
          <Tab
            id="svgo"
            title="SVG Optimization"
            panel={
              <SvgOptimizationSettings
                items={items}
                onUpdatePreferenceItem={onUpdatePreferenceItem}
              />
            }
          />
          <Tabs.Expander />
        </Tabs>
      </Container>
    </div>
  );
}
