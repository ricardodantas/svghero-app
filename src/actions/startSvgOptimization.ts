import { storePreferences } from '../libs/store';
import { setSvgoSettings, SvgOptimizer, SvgoSettings } from '../libs/svg';

export type SettingsOptimization = {
  svgo: SvgoSettings;
  replaceOldFile: boolean;
};

function buildSvgoSettings() {
  const svgoPlugins = storePreferences.get();
  return setSvgoSettings(svgoPlugins);
}

export default function startSvgOptimization(selectedFiles: string[]) {
  const settings = {
    svgo: buildSvgoSettings(),
    replaceOldFile: false,
  };
  return (selectedFiles || []).map((filePath: string) => {
    const resultSVG = SvgOptimizer({
      filePath,
      ...settings,
    });
    return resultSVG;
  });
}
