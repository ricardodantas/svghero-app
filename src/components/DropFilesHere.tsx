import React from 'react';
import styled from 'styled-components';
import translate from '../localization/translate';

const Message = styled.div({
  fontWeight: 'bold',
  fontSize: '25px',
});

const DropFilesHere = () => {
  return (
    <div className="no-scroll height-size-full align-center-xy flex-direction-column">
      <Message>{translate('drop_files_now')}</Message>
    </div>
  );
};

export default DropFilesHere;
