/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import { Button, Icon } from '@blueprintjs/core';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { IconNames } from '@blueprintjs/icons';
import { ALLOWED_FILE_MIME_TYPES } from '../libs/svg';
import translate from '../localization/translate';
import ExportOptions from './ExportOptions';

type DropZoneType = {
  onFilesDropped: (acceptedFiles: File[]) => void;
  children: JSX.Element | JSX.Element[];
};

const Message = styled.div({
  fontWeight: 'bold',
  fontSize: '25px',
  marginTop: 20,
  width: '100%',
  textAlign: 'center',
});

const DropFilesHere = () => {
  return (
    <div className="no-scroll height-size-full align-center-xy flex-direction-column">
      <Icon
        icon={IconNames.DOWNLOAD}
        iconSize={Icon.SIZE_LARGE}
        className="animate__infinite animate__animated animate__fadeInDown"
      />
      <Message className="title">{translate('drop_files_now')}</Message>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px 0;
`;

export default function DropZone({ children, onFilesDropped }: DropZoneType) {
  const onDrop = useCallback((acceptedFiles) => {
    onFilesDropped(acceptedFiles);
  }, []);
  const { getRootProps, isDragActive, getInputProps, open } = useDropzone({
    onDrop,
    accept: ALLOWED_FILE_MIME_TYPES.join(','),
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div
      className="no-scroll height-size-full align-center-xy flex-direction-column bp3-dark"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <DropFilesHere />
      ) : (
        <Container>
          {children}
          <Button
            icon="document-open"
            type="button"
            onClick={open}
            intent="primary"
            large
          >
            {translate('select_svg_files')}
          </Button>
          <p>{translate('drop_files_here')}</p>
          <ExportOptions />
        </Container>
      )}
    </div>
  );
}
