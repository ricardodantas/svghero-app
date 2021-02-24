/* eslint-disable no-underscore-dangle */
const path = require('path');
const electron = require('electron');
const fs = require('fs');

let loadedLanguage: { [x: string]: any };
const app = electron.app ? electron.app : electron.remote.app;
const localizationDir = 'localization';
const basePath = __dirname.replace('/libs', '');

export default function i18n(phrase: string) {
  if (
    fs.existsSync(
      path.join(basePath, `${localizationDir}/${app.getLocale()}.json`)
    )
  ) {
    loadedLanguage = JSON.parse(
      fs.readFileSync(
        path.join(basePath, `${localizationDir}/${app.getLocale()}.json`),
        'utf8'
      )
    );
  } else {
    loadedLanguage = JSON.parse(
      fs.readFileSync(path.join(basePath, `${localizationDir}/en.json`), 'utf8')
    );
  }

  let translation = loadedLanguage[phrase];
  if (translation === undefined) {
    translation = phrase;
  }
  return translation;
}
