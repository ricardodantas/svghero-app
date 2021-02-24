import { SvgOptimizer, ALLOWED_FILE_EXTENSIONS } from '../libs/svg';

const electron = window.require('electron');
const { remote } = electron;
const { dialog } = remote;

type SettingsOptimization = {
  replaceOldFile: boolean;
};
// eslint-disable-next-line import/prefer-default-export
export function startSvgOptimization(settings?: SettingsOptimization) {
  const selectedFiles = dialog.showOpenDialogSync({
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
  return selectedFiles.map((filePath: string) => {
    const resultSVG = SvgOptimizer({
      filePath,
      replaceOldFile: settings?.replaceOldFile === true,
    });
    console.log('===> resultSVG: ', resultSVG);
    return resultSVG;
  });
}
