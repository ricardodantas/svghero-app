import { showSuccessNotification } from '../../libs/renderer/notifications';
import { ALLOWED_FILE_MIME_TYPES } from '../../libs/svg';
import onError from './onError';
import startSvgOptimization from './startSvgOptimization';
import { AVAILABLE_STORE_KEYS, storeExportPreferences } from '../../libs/store';
import { ExportFormat, exportSvgTo } from '../../libs/exporter';

export default function onFilesDropped(selectedFiles: File[]) {
  try {
    if (selectedFiles?.length) {
      const acceptedFiles = selectedFiles
        .filter((file) => ALLOWED_FILE_MIME_TYPES.includes(file.type))
        .map((file) => file.path);
      const optimizedFiles = startSvgOptimization(acceptedFiles);

      const selectedFormatsForExport = storeExportPreferences.get(
        AVAILABLE_STORE_KEYS.exportPreferences.SELECTED_FORMATS
      );
      console.log('===> selectedFormatsForExport: ', selectedFormatsForExport);
      acceptedFiles.map((filePath: string) => {
        return selectedFormatsForExport.map((selectedFormat: ExportFormat) =>
          exportSvgTo(selectedFormat, filePath)
        );
      });

      showSuccessNotification(
        optimizedFiles.map((optimizedFile) => optimizedFile.path)
      );
    }
  } catch (error) {
    onError(error);
  }
}
