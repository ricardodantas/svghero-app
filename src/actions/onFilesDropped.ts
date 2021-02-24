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
      startSvgOptimization(selectedFiles);
    }
  } catch (error) {
    onError(error);
  }
}
