import path from 'path';

const sharp = require('sharp');

export enum ExportFormat {
  PNG = 'png',
  JPG = 'jpg',
}

export function exportSvgTo(format: ExportFormat, filePath: string) {
  const fileName: string = path.basename(filePath);
  const fileExtension = path.extname(fileName);
  const outputDir = path.dirname(filePath);
  const outputFilePath = path.format({
    dir: outputDir,
    base: fileName.replace(fileExtension, `.${format}`),
  });
  switch (format) {
    case ExportFormat.PNG:
      return sharp(filePath).png().toFile(`${outputFilePath}`);
    case ExportFormat.JPG:
      return sharp(filePath).jpeg().toFile(`${outputFilePath}`);
    default:
      // eslint-disable-next-line no-console
      return console.log('Conversion: format not available.');
  }
}
