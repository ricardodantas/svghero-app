import React from 'react';
import translate from '../libs/translate';

import './DropFilesHere.global.css';

const DropFilesHere = () => {
  return (
    <div>
      <div className="DropFilesHere">
        <div className="DropFilesHere-Message">
          {translate('drop_files_now')}
        </div>
      </div>
    </div>
  );
};

export default DropFilesHere;
