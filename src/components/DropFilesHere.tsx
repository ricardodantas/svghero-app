import React from 'react';
import translate from '../libs/translate';

import styles from './DropFilesHere.scss';

const DropFilesHere = () => {
  return (
    <div className="no-scroll height-size-full align-center-xy flex-direction-column">
      <div className={styles.Message}>{translate('drop_files_now')}</div>
    </div>
  );
};

export default DropFilesHere;
