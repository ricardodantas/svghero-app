import SVGO from 'svgo';
import AppError from './errors';

const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

const { extendDefaultPlugins, optimize } = require('svgo');

export const ALLOWED_FILE_EXTENSIONS = ['.svg'];
export const DEFAULT_FILE_SUFFIX = '.min';
export const DEFAULT_SVGO_SETTINGS: SVGO.Options = {
  multipass: true,
  plugins: extendDefaultPlugins([
    { name: 'removeDimensions', active: true, type: 'perItem' },
    { name: 'removeViewBox', active: false, type: 'perItem' },
  ]),
};

export type SvgoPlugin = {
  description: string;
  active: boolean;
  name: string;
};

export type SvgoSettings = {
  plugins: SvgoPlugin[];
  multipass?: boolean;
};

export type SvgOptimizerParams = {
  filePath: string;
  replaceOldFile?: boolean;
  svgo: SvgoSettings;
};

function getFile(params: SvgOptimizerParams) {
  const fileName: string = path.basename(params.filePath);
  const fileExtension = path.extname(fileName);
  if (!ALLOWED_FILE_EXTENSIONS.includes(fileExtension)) {
    throw new AppError(
      'warning',
      'This is not a SVG file, please select a SVG file.'
    );
  }

  const outputDir = path.dirname(params.filePath);
  const outputFileName: string = params.replaceOldFile
    ? fileName
    : fileName.replace('.svg', `${DEFAULT_FILE_SUFFIX}${fileExtension}`);
  const svgString: string = readFileSync(params.filePath);
  const outputFilePath = path.format({
    dir: outputDir,
    base: outputFileName,
  });
  return { outputFilePath, svgString };
}

type CreateFileParams = {
  filePath: string;
  fileContent: string;
};

function createFile(params: CreateFileParams) {
  return writeFileSync(params.filePath, params.fileContent);
}

export function setSvgoSettings(plugins: SvgoPlugin[]) {
  return {
    multipass: true,
    plugins,
  };
}

// eslint-disable-next-line import/prefer-default-export
export function SvgOptimizer(params: SvgOptimizerParams) {
  const {
    outputFilePath,
    svgString,
  }: { outputFilePath: string; svgString: string } = getFile(params);

  const optimizedSvg = optimize(svgString, {
    path: `${outputFilePath}`,
    ...DEFAULT_SVGO_SETTINGS,
  });
  createFile({ filePath: optimizedSvg.path, fileContent: optimizedSvg.data });
  return optimizedSvg;
}
