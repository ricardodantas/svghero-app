import path from 'path';

const sharp = require('sharp');

export enum ExportFormat {
  PNG = 'png',
  JPG = 'jpg',
  WEBP = 'webp',
  // GIF = 'gif',
  TIFF = 'tiff',
  // TILE = 'tile',
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
    case ExportFormat.WEBP:
      return sharp(filePath).webp().toFile(`${outputFilePath}`);
    // case ExportFormat.GIF:
    //   return sharp(filePath).gif().toFile(`${outputFilePath}`);
    case ExportFormat.TIFF:
      return sharp(filePath).tiff().toFile(`${outputFilePath}`);
    // case ExportFormat.TILE:
    //   return sharp(filePath).tile().toFile(`${outputFilePath}`);
    default:
      // eslint-disable-next-line no-console
      return console.log('Conversion: format not available.');
  }
}
