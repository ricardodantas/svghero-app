/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { ALLOWED_FILE_MIME_TYPES } from '../libs/svg';
import translate from '../localization/translate';

type DropZoneType = {
  onFilesDropped: (acceptedFiles: File[]) => void;
  children: JSX.Element | JSX.Element[];
};

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

export default function DropZone({ children, onFilesDropped }: DropZoneType) {
  const onDrop = useCallback((acceptedFiles) => {
    onFilesDropped(acceptedFiles);
  }, []);
  const { getRootProps, isDragActive, getInputProps } = useDropzone({
    onDrop,
    accept: ALLOWED_FILE_MIME_TYPES.join(','),
  });

  return (
    <div
      className="no-scroll height-size-full align-center-xy flex-direction-column"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? <DropFilesHere /> : children}
    </div>
  );
}
