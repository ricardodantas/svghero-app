import AppError from '../../libs/errors';
import { showSuccessNotification } from '../../libs/renderer/notifications';
import { ALLOWED_FILE_MIME_TYPES } from '../../libs/svg';
import onError from './onError';
import startSvgOptimization from './startSvgOptimization';

export default function onFilesDropped(selectedFiles: File[]) {
  try {
    if (selectedFiles?.length) {
      const acceptedFiles = selectedFiles
        .filter((file) => ALLOWED_FILE_MIME_TYPES.includes(file.type))
        .map((file) => file.path);
      const optimizedFiles = startSvgOptimization(acceptedFiles);
      showSuccessNotification(
        optimizedFiles.map((optimizedFile) => optimizedFile.path)
      );
    }
  } catch (error) {
    onError(error);
  }
}
