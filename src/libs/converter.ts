import path from 'path';

const sharp = require('sharp');

export enum ConversionFormat {
  PNG = 'png',
  JPG = 'jpg',
}

export function convertTo(format: ConversionFormat, filePath: string) {
  const fileName: string = path.basename(filePath);
  const fileExtension = path.extname(fileName);
  const outputDir = path.dirname(filePath);
  const outputFilePath = path.format({
    dir: outputDir,
    base: fileName.replace(fileExtension, `.${format}`),
  });
  switch (format) {
    case ConversionFormat.PNG:
      return sharp(filePath).png().toFile(`${outputFilePath}`);
    case ConversionFormat.JPG:
      return sharp(filePath).jpeg().toFile(`${outputFilePath}`);
    default:
      // eslint-disable-next-line no-console
      return console.log('Conversion: format not available.');
  }
}
