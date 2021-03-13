/* eslint-disable prefer-destructuring */
import SVGO from 'svgo';
import * as Svgson from 'svgson';
import { svgPathBbox } from 'svg-path-bbox';
import AppError from './errors';

const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

const { extendDefaultPlugins, optimize } = require('svgo');

export const ALLOWED_FILE_EXTENSIONS = ['.svg'];
export const ALLOWED_FILE_MIME_TYPES = ['image/svg+xml'];

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

function SvgTrim(svgContentString) {
  const svg = Svgson.parseSync(svgContentString);
  const paths = svg.children.filter(
    (item) => item.name === 'path' && item.attributes.d
  );

  if (!paths.length) {
    return svgContentString;
  }

  const pathsD = paths.map((item) => item.attributes.d);
  let { width, height } = svg.attributes;
  if (svg.attributes?.viewBox) {
    const originalViewBox = svg.attributes?.viewBox?.split(' ');
    width = originalViewBox[2];
    height = originalViewBox[3];
  }

  const calculatedViewBox = svgPathBbox(pathsD.join(' '));
  const viewBox = [
    calculatedViewBox[0],
    calculatedViewBox[1],
    parseFloat(width),
    parseFloat(height),
  ];

  svg.attributes.viewBox = viewBox.join(' ');

  if (svg.attributes.style) {
    delete svg.attributes.style;
  }
  if (svg.attributes['xml:space']) {
    delete svg.attributes['xml:space'];
  }
  return Svgson.stringify(svg);
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

  const trimmedSVG = SvgTrim(optimizedSvg.data);

  createFile({ filePath: optimizedSvg.path, fileContent: trimmedSVG });

  return optimizedSvg;
}
