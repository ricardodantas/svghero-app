import React, { useEffect, useState } from 'react';
import icon from '../../assets/icon.svg';
import './Home.global.css';

import translate from '../libs/translate';
import AppConfig from '../config';

const Preferences = () => {
  return (
    <div>
      <div className="Header">
        <img width="200px" alt="icon" src={icon} />
        <h1>{translate('Preferences')}</h1>
      </div>
      <div className="Main" />
    </div>
  );
};

export default Preferences;
