import { SvgOptimizer } from '../libs/svg';

type SettingsOptimization = {
  replaceOldFile: boolean;
};

export default function startSvgOptimization(
  selectedFiles: any[],
  settings?: SettingsOptimization
) {
  return (selectedFiles || []).map((filePath: string) => {
    const resultSVG = SvgOptimizer({
      filePath,
      replaceOldFile: settings?.replaceOldFile === true,
    });
    return resultSVG;
  });
}
