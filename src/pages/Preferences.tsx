import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Preferences.scss';

import translate from '../libs/translate';
import AppConfig from '../config';

const Preferences = () => {
  // const history = useHistory();
  return (
    <div className="height-size-full">
      <div className={styles.Header}>
        <h1>{translate('Preferences')}</h1>
      </div>
      <div className={styles.Main}>
        <Link className={styles.BackButton} to={AppConfig.routes.home}>
          Back
        </Link>
      </div>
    </div>
  );
};

export default Preferences;
