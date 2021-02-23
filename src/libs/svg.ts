import SVGO from 'svgo';

const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

const { extendDefaultPlugins, optimize } = require('svgo');

const defaultSettings: SVGO.Options = {
  multipass: true,
  plugins: extendDefaultPlugins([
    { name: 'removeDimensions', active: true, type: 'perItem' },
    { name: 'removeViewBox', active: false, type: 'perItem' },
  ]),
};

type SvgOptimizerParams = {
  filePath: string;
  replaceOldFile?: boolean;
};

function getFile(params: SvgOptimizerParams) {
  const fileName: string = path.basename(params.filePath);
  const fileExtension = path.extname(fileName);
  if (fileExtension !== '.svg') {
    throw new Error('This is not a SVG file, please select a SVG file.');
  }

  const outputDir = path.dirname(params.filePath);
  const outputFileName: string = params.replaceOldFile
    ? fileName
    : fileName.replace('.svg', '.min.svg');
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

// eslint-disable-next-line import/prefer-default-export
export function SvgOptimizer(params: SvgOptimizerParams) {
  const {
    outputFilePath,
    svgString,
  }: { outputFilePath: any; svgString: string } = getFile(params);

  const optimizedSvg = optimize(svgString, {
    path: `${outputFilePath}`,
    ...defaultSettings,
  });
  createFile({ filePath: optimizedSvg.path, fileContent: optimizedSvg.data });
  return optimizedSvg;
}
