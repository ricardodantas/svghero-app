/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { ConversionFormat } from '../libs/converter';
import { storeExportPreferences } from '../libs/store';

const storedExportPreferences = storeExportPreferences.get();

const ConversionOptionsContext = React.createContext({
  selectedFormats: storedExportPreferences || Object.values(ConversionFormat),
  setSelectedFormats: (_selectedFormats: ConversionFormat[]) => {},
});

export default ConversionOptionsContext;
