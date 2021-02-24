import { showSuccessNotification } from '../libs/notifications';
import onError from './onError';
import startSvgOptimization from './startSvgOptimization';

export default function onFilesDropped(event: DragEvent) {
  try {
    if (!event.dataTransfer?.files) {
      return;
    }
    const selectedFiles: string[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const f of event.dataTransfer.files) {
      selectedFiles.push(f.path);
    }
    if (selectedFiles?.length) {
      const optimizedFiles = startSvgOptimization(selectedFiles);
      showSuccessNotification(
        optimizedFiles.map((optimizedFile) => optimizedFile.path)
      );
    }
  } catch (error) {
    onError(error);
  }
}
