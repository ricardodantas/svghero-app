/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { ExportFormat } from '../libs/exporter';
import { storeExportPreferences, AVAILABLE_STORE_KEYS } from '../libs/store';

const storedExportPreferences = storeExportPreferences.get(
  AVAILABLE_STORE_KEYS.exportPreferences.SELECTED_FORMATS
);

const ExportOptionsContext = React.createContext({
  selectedFormats: Object.values(storedExportPreferences || ExportFormat),
  setSelectedFormats: (_selectedFormat: ExportFormat) => {},
});

export default ExportOptionsContext;
