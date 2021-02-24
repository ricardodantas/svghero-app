import { ALLOWED_FILE_EXTENSIONS } from '../libs/svg';
import onError from './onError';
import startSvgOptimization from './startSvgOptimization';

const electron = window.require('electron');
const { remote } = electron;
const { dialog } = remote;

function openFilesWindow() {
  try {
    return dialog.showOpenDialogSync({
      properties: ['openFile', 'multiSelections'],
      filters: [
        {
          name: 'Images',
          extensions: ALLOWED_FILE_EXTENSIONS.map((extension) =>
            extension.replace('.', '')
          ),
        },
      ],
    });
  } catch (error) {
    return onError(error);
  }
}

export default function onSelectFilesClick() {
  try {
    const selectedFiles = openFilesWindow();
    startSvgOptimization(selectedFiles);
  } catch (error) {
    onError(error);
  }
}
