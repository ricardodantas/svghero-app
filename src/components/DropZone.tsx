/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
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
  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className="no-scroll height-size-full align-center-xy flex-direction-column"
      {...getRootProps()}
    >
      {isDragActive ? <DropFilesHere /> : children}
    </div>
  );
}
