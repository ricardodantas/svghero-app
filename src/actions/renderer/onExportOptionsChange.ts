import { ExportFormat } from '../../libs/exporter';
import { AVAILABLE_STORE_KEYS, storeExportPreferences } from '../../libs/store';

// eslint-disable-next-line import/prefer-default-export
export function setExportOptionsSelectedFormats(
  selectedFormatsInput: ExportFormat[]
) {
  storeExportPreferences.set(
    AVAILABLE_STORE_KEYS.exportPreferences.SELECTED_FORMATS,
    selectedFormatsInput
  );
}
